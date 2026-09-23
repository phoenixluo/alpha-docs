---
id: planning
title: Delivery planning
sidebar_position: 1
---

# Delivery planning

**Delivery → Planning** is the dispatcher's daily screen: turning waiting waybills into
trips and putting drivers on them.

## Pick three things first

Three selectors sit at the top, and **nothing loads until all three are chosen**:

| Selector | What it means |
|---|---|
| **Station** | Where the trip starts. The station's address is the route origin, and **only waybills held at that station can be loaded** |
| **Service Area** | The drop-off zone for this trip. One trip stays inside a single area |
| **Fleet** | Who runs it: **Own fleet**, or one particular subcontractor |

**Fleet** is the one people misread. Waybills and deliveries you hand to a subcontractor
**stay yours** — this picks which board you're looking at: trips your own drivers run, or
trips one subcontractor runs for you. New deliveries start on **Own fleet** and move
when you assign them.

All three go into the URL, so a planned board can be bookmarked or sent to a colleague.

## Loading

The left side lists waybills waiting at that station in that area. Tick them and the
count, weight and volume are totalled below.

From there, two routes:

- **Create New Delivery** — start a new trip with the ticked waybills.
- **Add to #delivery-no** — put them on the delivery currently selected.

There's also **Split across vehicles**, for when the load exceeds one vehicle.

:::tip Will it fit?
Tick the waybills, read the weight and volume totals, and compare against the vehicle
type's capacity. The **Edit handling for load planning** settings on each package
(stackable, any side up) also feed this calculation.
:::

When creating a delivery you can set a **Vehicle Type** and **Add-on Services**.

You can also create an **empty delivery** and add waybills later.

## Assigning a driver

With a delivery selected, choose **Assign Delivery**:

- **Driver** — one of your own. The dropdown **only lists drivers whose vehicle type
  matches this delivery**; if none do, it says so outright. **Unassign driver** reverses
  it.
- **Subcontractor** — hand the whole trip downstream.

## Planning the route

With a delivery chosen, have the system work out an **optimized route**. It reports
**total distance and estimated duration**.

Two things stop it:

| Message | What to do |
|---|---|
| The selected station does not have coordinates set | Complete the station's address — it's the route origin |
| Delivery has no waybills to plan a route | Load it first |

## Deleting a delivery

Deliveries can be deleted. Their waybills return to the waiting pool to be planned again.
