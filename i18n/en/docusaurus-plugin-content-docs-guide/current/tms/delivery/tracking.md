---
id: tracking
title: Delivery tracking
sidebar_position: 2
---

# Delivery tracking

**Delivery → Tracking** follows **vehicles** — which is not the same as the tracking
timeline on a single waybill.

## Finding the trip

Narrow with **Select Station** and **Select Service Area** at the top, then search
**by delivery number or driver**. There's a **Filter by status** on the right.

Each row shows the delivery number, the driver, and how many waybills are aboard. Trips
with nobody on them show as **Unassigned**.

## The map

Click a trip and the map draws its route and stops, along with the delivery number,
status, waybill count, driver and phone number. With no vehicle on it, it shows
**No vehicle assigned**.

Two reasons the map comes up empty:

| Message | Meaning |
|---|---|
| No delivery selected | Pick one on the left |
| No location data | The waybills on this trip have no usable coordinates |

The second usually means recipient addresses haven't been resolved — go to
[Address preprocessing](./address).

## No deliveries found

Loosen the search and filters. The wrong station or service area gives you an empty list.
