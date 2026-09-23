---
id: events
title: Adding tracking events
sidebar_position: 4
---

# Adding tracking events

Normally tracking comes from drivers scanning. But sometimes it can't — no signal, a
missed scan, or a subcontractor who just phones in an update. Then you add one by hand.

## How

1. **Tick** the waybills on the list. You can do several at once.
2. Click **Assign → Add Tracking Event**.
3. Fill in:

| Field | Required | Note |
|---|---|---|
| **Event Type** | Yes | The status, from the [status reference](./statuses) |
| **Date & Time** | Yes | When it **actually happened**, not when you're typing |
| **Location** | No | Free text |
| **Notes** | No | Context, e.g. "customer confirmed receipt by phone" |
| **Proof of Delivery Photos** | No | Up to 5 |

4. Click **Add Event**.

Every ticked waybill gets the same event.

## Watch out

- **Use the real time.** The customer's tracking is ordered by it; putting "now" on a
  yesterday event scrambles the timeline.
- **Events are append-only.** A wrong one can only be followed by a correct one — both
  stay on the timeline. So check before you add.
- Driver delivery confirmation is a separate path through LINE, see
  [Delivery confirmation](../driver/pod).
