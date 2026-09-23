---
id: address
title: 3. 地址解析
sidebar_position: 4
---

# 3. 地址解析

把一行自由文本、一个地图链接或一对经纬度，变成结构化地址 + 坐标。

这个接口**不受套餐限制**，两个场景都会用到：

1. **建单前** —— 规范化收件地址，拿到标准的省/市/区/邮编再填进运单
2. **报价前** —— 拿到经纬度。报价接口强制要求坐标且**永不代你做地理编码**，详见[配送规划与跟踪](./delivery.md#4b-报价--支付--下单--跟踪)

## 解析地址

```http
POST /api/address/resolve
```

三种输入模式**三选一**，返回结构完全相同：

| 模式 | 字段 | 说明 |
|---|---|---|
| 自由文本 | `address` (string) | 最常用 |
| 地图链接 | `url` (string) | Google Maps 分享链接或短链 |
| 反查 | `lat` + `lng` (number) | 已有坐标，反查结构化地址 |

可选字段：

| 字段 | 类型 | 说明 |
|---|---|---|
| `country` | string | ISO-2 国家码，如 `TH`、`VN`。**强烈建议传** —— 它会影响地理编码的区域和语言偏好 |
| `logResolution` | boolean | 是否记录本次解析，默认 `true` |

### 请求示例

```json
{
  "api_key": "ak_example000000",
  "nonceStr": "1771545600000",
  "sign": "...",
  "address": "123 Sukhumvit Rd, Bangkok",
  "country": "TH"
}
```

### 响应

```json
{
  "lat": 13.7563,
  "lng": 100.5018,
  "country": "TH",
  "province": "Bangkok",
  "district": "Pathum Wan",
  "subdistrict": "Lumphini",
  "postal_code": "10330",
  "formatted_address": "Rama I Rd, Pathum Wan, Bangkok 10330, Thailand",
  "place_name": "CentralWorld",
  "confidence": 0.92,
  "source": "google_geocoding"
}
```

| 字段 | 说明 |
|---|---|
| `confidence` | 0–1 的匹配可信度 |
| `source` | 命中的数据源：`google_geocoding`、`google_places`、`longdo`、`postal_centroid`、`province_centroid` |

## 务必判断 `confidence`

:::danger 解析器总会返回点什么
这个接口采用逐级兜底策略：精确地理编码 → 地点检索 → 仅按行政区匹配 → 邮编中心点 → **省中心点**。最后一级的 `confidence` 只有 `0.32`，坐标落在省会城市中心，和真实地址可能差上百公里。

所以它**几乎不会返回 404** —— 判断"这个结果能不能用"的责任在你这边。
:::

建议的处理策略：

| `confidence` | 建议 |
|---|---|
| ≥ 0.68 | 可直接使用 |
| < 0.68 | 视为不可靠，转人工确认或要求客户补充地址 |

同时看 `source`：命中 `province_centroid` 或 `postal_centroid` 说明只匹配到了行政区，没匹配到门牌，用于**报价会导致算错行程和价格**。

```javascript
const from = await resolve({ address: userInput, country: 'TH' });
if (from.confidence < 0.68 || from.source === 'province_centroid') {
  throw new Error('地址太模糊，无法定价，请让客户补充详细地址');
}
```

## 错误

| HTTP | 说明 |
|---|---|
| `400` | 三种输入模式一个都没给，或经纬度超出范围（纬度 ±90、经度 ±180） |
| `404` | 确实解析不出任何结果 |

## 行政区查询

需要做省/市/区三级联动下拉，或校验用户填的行政区是否存在：

```http
GET /api/regions?country=TH
GET /api/regions?country=TH&postal_code=10330
```

`country` 必填，否则返回 `400`。返回三级嵌套结构：

```json
{
  "provinces": [
    {
      "name": "Bangkok",
      "cities": [
        { "name": "Bangkok", "districts": [{ "name": "Pathum Wan", "code": "102801" }] }
      ]
    }
  ]
}
```

查询支持的国家列表：

```http
GET /api/regions/countries
```

这两个接口同样不受套餐限制。
