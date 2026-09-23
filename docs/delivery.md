---
id: delivery
title: 4. 配送规划与跟踪
sidebar_position: 5
---

# 4. 配送规划与跟踪

## 先理清两个概念

- **运单（waybill）= 一票货**。是谁的货、从哪到哪、多重多大。
- **配送（delivery）= 一趟车**。哪台车、走什么路线、装了哪些运单。

一趟车可以装多张运单，这就是整车（FTL）业务的核心。把运单分配到车上的过程叫**装载规划**。

根据你的业务模式，有两条路径：

- **[4A 自营装载规划](#4a-自营装载规划)** —— 货已经是你的，你自己排车
- **[4B 报价 → 支付 → 下单 → 跟踪](#4b-报价--支付--下单--跟踪)** —— 给客户报价收款，系统自动排车

---

## 4A 自营装载规划

需要 `delivery.planning` 套餐功能。

### 前置准备

调用规划接口需要四个 UUID：

| 参数 | 含义 | 怎么获取 |
|---|---|---|
| `origin_unit_id` | 发车网点 | `GET /api/organization-units` |
| `service_id` | 本次跑车用的整车服务 | **后台复制** |
| `service_area_id` | 服务区域 | **后台复制** |
| `vehicle_type_id` | 车型 | **后台复制** |

:::caution 已知限制
目前只有 `origin_unit_id` 有开放的查询接口，另外三个需要从后台管理页面复制。这些值对你的组织来说是**固定配置**，取一次存在你自己的配置里即可，不需要每次调用都查。
:::

### 第 1 步：试算能不能装下（可选）

```http
POST /api/load-planning/fit-check
```

```json
{
  "waybill_ids": ["uuid-1", "uuid-2"],
  "vehicle_type_id": "uuid-vehicle"
}
```

`vehicle_type_id` 和 `delivery_id` 至少给一个。这一步**不创建任何数据**，纯试算，用来回答"这批货一辆这种车装不装得下"。

### 第 2 步：让系统给出分车方案

```http
POST /api/load-planning/split
```

```json
{
  "action": "propose",
  "waybill_ids": ["uuid-1", "uuid-2", "uuid-3"],
  "vehicle_type_ids": ["uuid-small-truck", "uuid-big-truck"],
  "objective": "fewest_vehicles",
  "keep_recipient_together": true
}
```

| 字段 | 说明 |
|---|---|
| `waybill_ids` | 要排的运单 |
| `vehicle_type_ids` | 可用车型，最多 10 种 |
| `objective` | `fewest_vehicles`（默认，车次最少）或 `smallest_vehicles`（车型最小） |
| `max_vehicles` | 最多用几台车 |
| `keep_recipient_together` | 同一收件人的货尽量装同一台车 |

返回按车型分好的组。**这一步仍然什么都不创建**，你可以拿着方案给调度员确认，或者改一改再提交。

### 第 3 步：确认方案，生成配送

```http
POST /api/load-planning/split
```

```json
{
  "action": "accept",
  "origin_unit_id": "uuid-origin",
  "service_area_id": "uuid-area",
  "service_id": "uuid-ftl-service",
  "groups": [
    { "vehicle_type_id": "uuid-big-truck", "waybill_ids": ["uuid-1", "uuid-2"] },
    { "vehicle_type_id": "uuid-small-truck", "waybill_ids": ["uuid-3"] }
  ]
}
```

**每个 group 创建一趟配送**，并自动计算装载方案。返回：

```json
{
  "deliveries": [
    { "id": "uuid", "deliveryNo": "D-000123", "vehicleTypeId": "uuid", "waybillCount": 2, "planned": true }
  ]
}
```

`planned: false` 表示配送已创建但装载方案没算出来，可以稍后重新计算，不影响发车。

:::note 服务端会重新校验
`accept` 不会盲信你提交的分组，会重新检查：同一张运单不能出现在两个组里、运单不能已经被其他配送占用、车型必须仍然存在。中途失败时已创建的配送会被自动回滚，不会留下半截数据。
:::

常见错误：

| `error` | 含义 |
|---|---|
| `invalid_groups` | 分组为空，或同一运单出现在多个组 |
| `waybills_assigned` | 有运单已经被其他配送占用了，刷新后重新排 |
| `no_vehicle_type` | 车型不存在 |
| `create_failed` | 创建失败，已回滚 |

### 第 4 步：查看装载方案

```http
GET /api/load-planning/deliveries/{id}/plan
```

`{id}` 是上一步返回的配送 `id`。

### 派车

:::caution 已知限制
指派司机和指派分包商目前**没有开放接口**，需要在后台操作。
:::

### 配送状态

`pending`、`ready_for_pickup`、`assigned`、`in_transit`、`delivered`、`failed`、`cancelled`

注意这里是英式拼写 `cancelled`（双 l）。

---

## 4B 报价 → 支付 → 下单 → 跟踪

面向"给终端客户报价卖运力"的场景。整条链路 7 个接口，**都不受套餐限制**。

除第 1 步外，所有接口都需要 `X-Sender-Account-Id` 这个 header，见[鉴权章节](./authentication.md#x-sender-account-id模式-b-必读)。

```mermaid
flowchart LR
    r["地址解析<br/>取得经纬度"] --> q["报价"] --> m["查支付方式"] --> p["支付"] --> o["自动生成<br/>运单与配送"] --> t["跟踪"]
```

### 第 1 步：报价

```http
POST /api/quotes
```

`X-Sender-Account-Id` 在这一步**可以不带** —— 用于"先报价、后确认客户是谁"的场景。不带时报出来的是无主报价。

```json
{
  "api_key": "ak_example000000",
  "nonceStr": "1771545600000",
  "sign": "...",
  "request_id": "cart-8821",
  "pickup":   { "address": "123 Sukhumvit Rd, Bangkok", "lat": 13.7398, "lng": 100.5601 },
  "delivery": { "address": "456 Nimman Rd, Chiang Mai", "lat": 18.7953, "lng": 98.9670 },
  "items": [
    { "qty": 2, "length_cm": 100, "width_cm": 80, "height_cm": 60, "weight_kg": 25 }
  ],
  "service_type": "ftl_transport",
  "addons": []
}
```

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `pickup` / `delivery` | object | 是 | 起止地址，见下 |
| `items` | array | 是 | 货物明细，至少 1 项 |
| `request_id` | string | 否 | **你自己的关联 ID**，原样回传。不传会自动生成 |
| `service_type` | string | 否 | `ftl_transport`（默认）或 `ltl_transport` |
| `cargo_notes` | string | 否 | 货物备注 |
| `addons` | array | 否 | 增值服务，每项 `{ "key": "..." }` |

**地址对象**：

| 字段 | 类型 | 必填 |
|---|---|---|
| `address` | string | 是 |
| `lat` / `lng` | number | **是** |
| `country` / `province` / `district` / `postal_code` / `phone` | string | 否 |

:::danger 坐标必填，报价永远不会替你做地理编码
这是刻意设计的。地址解析器总会返回点什么 —— 兜底会给你一个**省中心点**。如果报价接口在后台偷偷地理编码，一个模糊地址就会被静默地按错误的行程定价，而你完全不知道。

所以请先调[地址解析](./address.md)，拿到 `confidence` 和 `source`，**由你决定**这个匹配够不够好再来报价。
:::

**`items` 每一项**：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `qty` | number | 是 | 件数，正整数 |
| `length_cm` / `width_cm` / `height_cm` | number | 是 | 尺寸（cm），必须 > 0 |
| `weight_kg` | number | 是 | 单件重量（kg），必须 > 0 |
| `volume_m3` | number | 否 | 体积 |
| `stackable` | boolean | 否 | 能否堆叠 |
| `fragile` | boolean | 否 | 是否易碎 |
| `flipable` | boolean | 否 | 装车时能否翻面 |
| `name` / `notes` | string | 否 | 名称 / 备注 |
| `image_urls` | array | 否 | 图片 |

:::note 不要自己传总重量、总体积
总量由服务端从 `items` 推导。装载率也不是请求参数 —— 能不能装下是由 3D 装箱算法实际排一遍决定的，比按百分比预留余量更接近真实装车情况。
:::

**响应**：

```json
{
  "quotation_id": "uuid",
  "request_id": "cart-8821",
  "vehicle": { "type": "4_wheel_truck", "max_payload_kg": 1000 },
  "vehicles": null,
  "estimated_total": 4500.00,
  "currency": "THB",
  "expires_at": "2026-09-23T10:30:00Z",
  "breakdown": [
    { "kind": "base", "amount": 4200.00 },
    { "kind": "addon", "key": "tail_lift", "amount": 300.00 }
  ]
}
```

报价**默认有效期 30 分钟**（`expires_at`）。

当货物装不进任何单台车时，会返回**多车组合**报价：`vehicle` 为 `null`，`vehicles` 列出每台车及其价格和分配到的货，`estimated_total` 是各车价格之和：

```json
{
  "vehicle": null,
  "vehicles": [
    { "vehicle_type": "Trailer", "price": 8000.00, "items": [{ "name": "旋转门", "qty": 8 }] },
    { "vehicle_type": "6_wheel_truck", "price": 5000.00, "items": [{ "name": "旋转门", "qty": 4 }] }
  ],
  "estimated_total": 13000.00
}
```

所以**客户端必须同时处理 `vehicle` 和 `vehicles` 两种情况**。

**报价错误**：

| `error` | HTTP | 含义 |
|---|---|---|
| `missing_required_field` | 400 | 参数校验失败，`detail` 里有具体字段 |
| `unsupported_route` | 422 | 这条线路没有配置可用服务 |
| `no_vehicle_fits` | 422 | 没有车（也没有多车组合）装得下，`detail` 说明原因 |
| `unsupported_addon` | 422 | 请求了不支持的增值服务 |
| `load_planning_unavailable` | 503 | 装箱引擎暂时不可用，按 `Retry-After` 响应头指示的秒数重试 |

错误响应形如：

```json
{ "error": "no_vehicle_fits", "detail": "no_vehicle_fits: weight_over, volume_over", "request_id": "cart-8821" }
```

### 第 2 步：查询报价

列出某个客户的全部报价（倒序）：

```http
GET /api/quotes
```

**没有任何查询参数** —— 客户由 `X-Sender-Account-Id` 决定。每条记录带 `delivery` 字段，未支付时为 `null`。

查单条：

```http
GET /api/quotes/{id}
```

```json
{
  "id": "uuid",
  "status": "active",
  "expires_at": "2026-09-23T10:30:00Z",
  "estimated_total": 4500.00,
  "currency": "THB",
  "breakdown": {},
  "snapshot": {},
  "provider": "lalamove",
  "delivery": null,
  "created_at": "2026-09-23T10:00:00Z"
}
```

:::caution 读取无主报价会"认领"它
第 1 步不带 `X-Sender-Account-Id` 报出来的价是无主的。**谁第一个读它，它就归谁**（前提是仍然 `active` 且未过期）。之后只有这个客户账号能查看、支付、取消它。

支付和取消**不会**认领 —— 必须先读一次。

不属于你的报价一律返回 `404 {"error":"not_found_or_forbidden"}`。
:::

`provider` 可能是 `lalamove`、`deliveree`、`internal`（自有车队）、`subcontractor`（分包给下游）或 `null`。

### 第 3 步：查可用支付方式

渲染收银台之前调它，不要硬编码支付方式列表：

```http
GET /api/quotes/{id}/payment-methods
```

```json
{
  "methods": [
    { "name": "flashpay", "modes": ["qr", "deeplink", "wechat_applet"], "available": true },
    { "name": "bank_transfer", "modes": ["manual_transfer"], "available": false,
      "unavailable_reason": "no_bank_account_available" }
  ],
  "default": "flashpay"
}
```

`name` 是 `flashpay`、`bank_transfer` 或 `wallet`。金额取自报价本身，不从 query 传。

不可用的方式会**带原因返回而不是被隐藏**，建议置灰并显示原因。`unavailable_reason` 取值：`not_configured`、`no_bank_account_available`、`insufficient_balance`、`currency_unsupported`、`no_sender_account`、`unavailable`。

可用性只是参考值，最终以支付时的结果为准。

### 第 4 步：支付（这一步才真正下单）

```http
POST /api/quotes/{id}/pay
```

```json
{ "type": "qr" }
```

| 字段 | 说明 |
|---|---|
| `type` | `qr`（默认）、`app`、`bank_transfer` 或 `wallet` |
| `bank_code` | `type` 为 `app` 时指定银行 |

:::tip 这一步会创建订单
调用它会**自动创建运单和配送**，然后才发起收款。这个操作是**幂等**的 —— 重复调用不会重复下单。

这就是 B 模式和 A 模式汇合的地方：从这里开始，货在系统里的形态和你自己建单推进来的完全一样。
:::

**响应字段是 camelCase**，按支付方式不同：

```json
// type: "qr"
{ "type": "qr", "paymentId": "uuid", "tradeNo": "FP123456",
  "qrImage": "data:image/png;base64,...", "qrRawData": "00020101...",
  "qrExpireTime": "...", "deliveryId": "uuid" }

// type: "app"
{ "type": "app", "paymentId": "uuid", "tradeNo": "FP123456",
  "appUrl": "https://...", "deliveryId": "uuid" }

// type: "bank_transfer"
{ "type": "bank_transfer", "paymentId": "uuid", "referenceCode": "REF123",
  "account": { "bank_name": "...", "account_number": "...", "account_name": "..." },
  "amount": 4500, "currency": "THB", "expiresAt": "...", "deliveryId": "uuid" }

// type: "wallet"
{ "type": "wallet", "paymentId": "uuid", "balance": 12000, "deliveryId": "uuid" }
```

**`deliveryId` 就是后面跟踪要用的订单号，请存下来。**

钱包支付是同步扣款并立即派单，其他方式需要等收款回调确认。

**支付错误**：

| `error` | HTTP | 含义 |
|---|---|---|
| `forbidden` | 403 | 这个报价不属于该客户 |
| `not_found` | 404 | 报价或订单不存在 |
| `payment_method_not_allowed` | 409 | 该支付方式不被允许，`allowed` 字段列出可用的 |
| `not_payable` | 409 | 报价/订单当前状态不可支付（已过期、已支付等） |
| `insufficient_balance` | 409 | 钱包余额不足 |
| `flashpay_not_configured` | 503 | 组织未配置支付网关 |
| `exchange_rate_not_configured` | 503 | 报价币种无法换汇 |
| `pay_failed` | 500 | 发起支付失败 |

### 第 5 步：取消

```http
POST /api/quotes/{id}/cancel
```

无请求体（除签名字段）。返回：

- `{"status":"quote_canceled"}` —— 取消的是尚未支付的报价
- `{"status":"order_canceled"}` —— 已生成待付款订单，取消的是订单

已是终态时返回 `409 {"error":"already_terminal","status":"..."}`。

### 第 6 步：跟踪订单

```http
GET /api/orders/{id}/tracking
```

:::caution
`{id}` 是**配送 ID**（支付响应里的 `deliveryId`，或报价详情里的 `delivery.id`），**不是报价 ID**。
:::

订单还没进入可跟踪状态时，返回 **HTTP 200** 加一个简单对象：

```json
{ "state": "awaiting_payment" }
```

可能是 `awaiting_payment`（还没付款）或 `awaiting_3pl`（已付款，正在向承运方下单）。

:::tip
客户端要**先判断有没有 `state` 字段**，有就说明还不能跟踪，不要直接当成完整的跟踪对象解析。
:::

可跟踪时返回：

```json
{
  "provider": "lalamove",
  "external_order_id": "LLM-123",
  "status": "in_transit",
  "driver": { "name": "Somchai", "phone": "0812345678", "photo_url": "https://..." },
  "vehicle": { "plate": "1กข1234", "model": "Toyota", "photo_url": null },
  "current_location": { "lat": 13.7563, "lng": 100.5018 },
  "stops": [
    { "address": "...", "lat": 13.75, "lng": 100.5, "status": "completed", "completed_at": "2026-09-23T09:00:00Z" }
  ],
  "eta_pickup_at": "2026-09-23T08:30:00Z",
  "eta_delivery_at": "2026-09-23T11:00:00Z",
  "pod": { "photo_urls": [], "signature_url": null, "delivered_at": null },
  "fetched_at": "2026-09-23T09:05:00Z"
}
```

- `provider` 是 `lalamove`、`deliveree` 或 `internal`。自有车队时 `external_order_id` 是空字符串，且 `vehicle`、`current_location`、`stops`、ETA 等字段会是空值。
- `stops[].status`：`pending`、`arrived`、`completed`、`failed`。
- **跟踪状态** `status`：`pending`、`assigning_driver`、`driver_assigned`、`picked_up`、`in_transit`、`delivered`、`canceled`、`failed`。注意这里是美式拼写 `canceled`（单 l）。

其他返回：`403 {"error":"forbidden"}`、`404 {"error":"not_found"}`。

:::note 轮询建议
服务端对结果有 5 秒缓存，所以比 5 秒更密的轮询没有意义。建议**每 10 秒轮询一次**，直到状态变成 `delivered`、`canceled` 或 `failed`。
:::

### 报价状态

`active`、`accepted`（已支付下单）、`canceled`、`expired`

---

## 查询运单轨迹

两条路径都可以用运单号查轨迹（A 模式的主要跟踪方式）：

```http
GET /api/waybills/{waybillNo}/events
```

```json
{
  "trackingNo": "TH24020001",
  "state": "delivered",
  "stateText": "已签收",
  "licensePlate": "1กข 1234",
  "courierPhone": "0898765432",
  "podImages": ["https://..."],
  "returnedItems": [],
  "routes": [
    { "state": "created", "stateText": "已建单", "message": "运单已创建", "createdAt": 1706900000 },
    { "state": "delivered", "stateText": "已签收", "message": "已送达收件人", "createdAt": 1707000000 }
  ]
}
```

:::caution
`routes[].createdAt` 是 **Unix 秒**（不是毫秒，也不是 ISO 字符串）。
:::

## 回传轨迹事件

如果履约环节在你那边，可以把轨迹回传给 TMS：

```http
POST /api/delivery-events
```

需要 `delivery.tracking` 套餐功能。

```json
{
  "waybill_id": "uuid",
  "event_type": "picked_up",
  "event_time": "2026-09-23T08:00:00Z",
  "coordinates": "13.7563,100.5018",
  "notes": "已从仓库取件"
}
```

| 字段 | 说明 |
|---|---|
| `waybill_id` / `package_id` | 二选一，`package_id` 优先 |
| `event_type` | 见[运单状态枚举](./waybills.md#运单状态) |
| `event_time` | 可选，默认当前时间 |
| `coordinates` | 可选，`"纬度,经度"` |
| `notes` | 可选，事件描述 |
| `photos` | 可选，`data:image/...;base64,` 格式的图片数组 |

事件冲突（比如已签收又回传取件）返回 `409 {"error":"...","conflict":true,"messages":[...]}`。

## 三套状态枚举别混用

系统里有三套不同的状态，含义和取值都不一样：

| 枚举 | 用在哪 | 取值 |
|---|---|---|
| 运单 / 轨迹事件 | `GET /api/waybills/{no}/events`、`POST /api/delivery-events` | `created`、`picked_up`、`delivering`、`delivered`… |
| 配送状态 | 4A 的配送记录 | `pending`、`ready_for_pickup`、`assigned`、`in_transit`、`delivered`、`failed`、`cancelled` |
| 订单跟踪状态 | `GET /api/orders/{id}/tracking` | `pending`、`assigning_driver`、`driver_assigned`、`picked_up`、`in_transit`、`delivered`、`canceled`、`failed` |

特别注意配送状态用英式 `cancelled`，订单跟踪状态用美式 `canceled`。
