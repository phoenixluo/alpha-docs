---
id: postman
title: Postman Collection
sidebar_position: 7
---

# Postman Collection

导入即可测试，签名自动完成。

## 下载

- [下载 Collection](/tms-api.postman_collection.json)
- [下载 Environment](/tms-api.postman_environment.json)

## 使用步骤

1. 在 Postman 里 **Import**，把上面两个文件都导入。
2. 右上角环境切换到 **Alpha Cargo TMS — 开发环境**。
3. 编辑环境变量，填入 `apiKey` 和 `apiSecret`（后台：**设置 → 组织 → API Credentials**）。
4. 先跑 **① 组织鉴权 → 连通性自检**。返回 200 就可以继续。

## 内置了什么

### 自动签名

Collection 级的 Pre-request Script 会为**每一个**请求自动计算签名：

```
sign = HMAC-SHA256(api_secret, canonicalJson(payload 去掉 sign))   大写十六进制
```

- `POST` / `PUT` / `PATCH` / `DELETE` —— 签名字段写入 JSON body
- `GET` —— 签名字段写入 query string，并且**所有参数值都会先转成字符串**

你不需要改这段脚本，也不需要手动填 `api_key`、`nonceStr`、`sign`。

### 变量自动串联

前面请求的结果会自动写进环境变量，供后面的请求使用：

| 变量 | 由哪个请求写入 |
|---|---|
| `senderAccountId` | ① 客户账号列表 |
| `waybillNo` / `waybillId` | ② 建单 |
| `originUnitId` | ④A 网点列表 |
| `deliveryId` | ④A 确认方案 / ④B 支付 |
| `quotationId` | ④B 创建报价 |

所以**建议在每个文件夹内按从上到下的顺序执行**。

## 目录结构

| 文件夹 | 内容 |
|---|---|
| ① 组织鉴权 | 连通性自检、客户账号列表 |
| ② 运单 CRUD | 建单、列表、详情、轨迹、改单、预分配单号、面单、取消 |
| ③ 地址解析 | 三种解析模式、行政区列表 |
| ④A 自营装载规划 | 网点、试算、分车方案、生成配送、装载方案、回传轨迹 |
| ④B 报价下单 | 报价、列表、详情、支付方式、支付、跟踪、取消 |
| ⑤ Webhook | 推送体结构演示 |

## 需要手工准备的变量

④A 的装载规划需要三个 UUID，目前只能从后台管理页面复制后填进环境变量：

- `serviceId` —— 跑车用的整车服务
- `serviceAreaId` —— 服务区域
- `vehicleTypeId` —— 车型

`originUnitId` 可以由「④A → 网点列表」自动填充。

## 注意

:::warning 这些请求会产生真实数据
- **② 建单** 会真的创建运单（默认用 `overwrite=return_existing`，可以重复点）
- **② 取消运单** 会真的取消运单
- **④A 确认方案** 会真的创建配送
- **④B 支付** 会真的创建订单并发起收款
:::

`apiSecret` 在环境里是 secret 类型，不会随 Collection 导出。**不要把填好凭证的环境文件提交到代码仓库或分享出去。**

## 换到正式环境

环境变量里的 `baseUrl` 默认是开发环境 `https://dev.alphacargo.io`。正式接入时改成你拿到的正式域名即可，其余不用动。
