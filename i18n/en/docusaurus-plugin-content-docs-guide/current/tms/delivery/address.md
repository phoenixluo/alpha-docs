---
id: address
title: Address preprocessing
sidebar_position: 3
---

# Address preprocessing

Customers write messy addresses — no house number, a landmark instead of a street, a
misspelt road. **Delivery → Address Preprocessing** turns them into something that lands
on a map.

**An address with no coordinates can't be routed and won't appear on the tracking map.**
That's the whole point of this page.

## Three tabs

Work is grouped by state, with a count on each tab:

| Tab | Meaning |
|---|---|
| **Pending** | Not dealt with yet — the default view |
| **Processed** | Coordinates resolved |
| **Verified** | Confirmed by a person |

The search box matches address text. Filters go into the URL, which makes it easy to
hand one slice to a colleague.

## Working through one

1. Click a row; **Edit Address** opens on the right.
2. Complete and correct the address.
3. Click **Geocode** to turn the text into coordinates. Success reports
   **Address geocoded**.
4. Save — **Address updated**.

## Nudging it on the map

The map marks pending addresses, and **pending markers can be dragged** to correct their
position — hover and it tells you so. Clicking a marker shows that address's details.

When automatic geocoding lands slightly off, dragging is far quicker than rewording the
address.

## Common cases

| Symptom | What to do |
|---|---|
| Geocoding fails | Not enough address. Add district, city, postcode and retry |
| It resolves but to the wrong place | Drag the marker |
| The same customer needs fixing repeatedly | Keep good addresses on the sender account under **Partners → Sender Accounts** and fix it at source |

:::note Waybills pushed in by API
When creating waybills through the API the system **will not guess coordinates** for
you — quoting and routing require them. See the
[Developer Guide's address chapter](/tms/address).
:::
