---
id: scan
title: Driver scanning
sidebar_position: 1
---

# Driver scanning

Drivers don't use the back office. They use the **Package Scanner**, a single page in a
phone browser that does one job: scan packages, record status.

## Signing in

Open the scanner address and you get **Mobile Scanner Login**. Enter **Email** and
**Password**, then **Sign In**.

Admins create the account under **Settings → Sub Accounts** and send the details —
drivers don't sign themselves up.

Once in, the header shows **Package Scanner** and the signed-in account, with logout in
the corner.

## Scanning a package

```mermaid
flowchart LR
    a["1 pick the event type"] --> b["2 scan or type"] --> c["3 Scan Successful"]
```

**The order matters.** Pick the event type first. Scanning without one gives
**Please select an event type**.

1. In **Select event type**, choose the step you're recording: pickup, inbound, sort,
   outbound, delivery.
2. Tap **Scan Package → Start Camera Scanner** and point at the barcode. A read shows
   **Detected: number**.
3. If that won't work, use **Enter waybill number manually** below and submit.
4. Success shows **Scan Successful**.

Carry straight on to the next package — the event type stays put.

## Location is recorded too

The page takes the phone's location and stores it with the scan. The browser asks for
permission the first time — **allow it**. Scanning still works if you decline, but that
record has no position.

## Only one or two options in the dropdown?

**The event type list is filtered by permission.** Someone granted only pickup sees only
pickup.

That's deliberate: a sorter shouldn't be able to mark goods delivered. For more types,
ask an admin to adjust permissions under **Settings → Sub Accounts**.

## The camera won't open

| Message | Cause and fix |
|---|---|
| Your browser doesn't support native barcode detection | Use Chrome or Edge |
| Unable to access camera | Allow camera access for the site in browser settings |
| Failed to initialize barcode scanner | Reload the page |

None of this stops work — **Enter waybill number manually** always works.

## This is not delivery confirmation

The scanner records status only. **No photos, no proof of delivery.** POD happens in
LINE, a separate path — see [Delivery confirmation](./pod).
