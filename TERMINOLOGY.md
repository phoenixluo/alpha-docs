# TERMINOLOGY

The words the product actually puts on screen, in both languages the guide is
written in. **Every menu name, tab, button and status in `guide/` comes from
this file.** It is not published — it is the authors' reference.

Extracted from the product's own translation files, not invented here. When a
label changes in the product, re-extract rather than patching prose by hand.

## Traps

- **Contractors is 客户, not 发包方.** A contractor is the customer whose freight
  you carry; a subcontractor is the carrier you hand freight to. The Chinese UI
  makes them 客户 / 承运商 — do not "improve" on that.
- **Returning and Returned are both 返回** in the Chinese UI. Where the
  distinction matters, say which one in prose; do not coin a new word.
- **The permissions screen is English in every locale.** Those labels are
  rendered straight from the catalogue without going through translation, so a
  Chinese-speaking admin sees `System Settings`, `Wallet Adjustment` and so on
  in English. Write them in English, and say why.
- **Sort appears twice** in the event list (`in_transit_sorted` and `sorted`)
  with one label, 运单已分拣.

## Navigation

The portal's top bar: one link, four dropdowns, then the account menu.

### 顶层

| English | 中文 |
|---|---|
| Waybills | 运单 |
| Delivery | 配送 |
| Partners | 合作伙伴 |
| Billing | 账单 |
| Settings | 设置 |

### Delivery

| English | 中文 |
|---|---|
| Planning | 规划 |
| Tracking | 轨迹 |
| Address Preprocessing | 地址预处理 |

### Partners

| English | 中文 |
|---|---|
| Drivers | 司机 |
| Subcontractors | 承运商 |
| Contractors | 客户 |
| Sender Accounts | 寄件人账户 |

### Billing

| English | 中文 |
|---|---|
| Rate Cards | 价格表 |
| Billing Profiles | 账单配置 |
| Billing | 账单 |
| Invoices | 发票 |
| Payments | 付款 |
| Cycle Runs | 计费周期 |
| Reports | 报告 |
| Reconciliation | 对账 |
| Operating Costs | 运营成本 |
| Suppliers | 供应商 |
| Profit & Loss | 利润与亏损 |

### Settings

| English | 中文 |
|---|---|
| Services | 服务 |
| Service Areas | 服务区域 |
| Product Categories | 货物类别 |
| Routes | 路线 |
| Automation | 自动化 |
| Sub Accounts | 团队成员 |
| Label Templates | 标签模板 |
| Organization | 机构 |
| Integrations | 集成 |

### 账号菜单

| English | 中文 |
|---|---|
| Profile | 账号信息 |
| Logout | 退出 |

## Entities

| English | 中文 |
|---|---|
| Waybill | 运单 |
| Waybill No. | 运单号 |
| Package | 包裹 |
| Delivery | 配送 |
| Driver | 司机 |
| Vehicle | 车辆 |
| Vehicle Type | 车辆类型 |
| Service | 服务 |
| Service Area | 服务区域 |
| Station | 站点 |
| Sender | 寄件人 |
| Recipient | 收件人 |
| Origin | 起点 |
| Route | 路线 |
| Legs | 路段 |
| Weight | 重量 |
| Volume | 体积 |
| Status | 状态 |
| Invoice | 发票 |
| Wallet | 钱包 |
| Automation Rule | 自动化规则 |
| Consolidate | 合并 |
| Assign Subcontractor | 指定承运商 |
| Print Labels | 打印标签 |
| Import Waybills | 导入运单 |
| Add Tracking Event | 添加轨迹事件 |

## Delivery events

The status vocabulary, in the order the type declares it. A dash means the
product ships no Chinese string for that label.

| Event key | English | 中文 |
|---|---|---|
| `draft` | Draft | 草稿 |
| `created` | Waybill Created | 运单已创建 |
| `accepted` | Waybill is confirmed | 运单已确认 |
| `picked_up` | Picked Up | 已接 |
| `in_transit_sorted` | Waybill Sorted | 运单已分拣 |
| `in_transit_hub_inbound` | In Transit, Hub Inbound | 在运输中，包裹进入分拨中心 |
| `in_transit_hub_outbound` | In Transit, Hub Outbound | 在运输中，包裹离开分拨中心 |
| `delivering` | Out for Delivery | 配送中 |
| `delivered` | Delivered | 已送达 |
| `failed` | Failed Delivery | 配送失败 |
| `exception` | Exception | 配送异常 |
| `canceled` | Canceled | 已取消 |
| `rescheduled` | Rescheduled | 重新安排 |
| `returning` | Returning | 返回 |
| `returned` | Returned | 返回 |
| `sorted` | Waybill Sorted | 运单已分拣 |
| `in_transit` | In Transit | 运输中 |

## Permissions

Rendered untranslated — see Traps. `group` / `group$sub` is how a permission is
stored; an organization owner carries `all`.

| Key | Label on screen |
|---|---|
| `scan` | Scan |
| `scan$pickup` | — Pickup |
| `scan$inbound` | — Inbound |
| `scan$sort` | — Sort |
| `scan$outbound` | — Outbound |
| `scan$delivery` | — Delivery |
| `waybills` | Waybills |
| `deliveries` | Deliveries |
| `deliveries$address_preprocessing` | — Address Preprocessing |
| `deliveries$create` | — Create |
| `deliveries$assign` | — Assign |
| `customer_service` | Customer Service |
| `customer_service$customer_channels` | — Customer Channels |
| `customer_service$driver_channels` | — Driver Channels |
| `partner_management` | Partner Management |
| `partner_management$subcontractor_management` | — Subcontractor Management |
| `partner_management$drivers` | — Drivers |
| `system_settings` | System Settings |
| `system_settings$user` | — User |
| `system_settings$organization` | — Organization |
| `system_settings$automation` | — Automation |
| `system_settings$service_area` | — Service Area |
| `system_settings$label_template` | — Label Template |
| `billing` | Billing |
| `billing$rate_cards` | — Rate Cards |
| `billing$payments` | — Payments |
| `billing$wallet_adjustment` | — Wallet Adjustment |
