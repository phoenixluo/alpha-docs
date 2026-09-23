---
id: billings
title: Billing records
sidebar_position: 4
---

# Billing records

**Billing → Billing** holds individual charge lines. What a consignment owes lands here
first, then gets gathered into an invoice.

## List and filters

Filter by **Status** and **Contractor** at the top.

You can also come at it from the other direction: the **Billings** tab on a waybill's
detail pane shows the charges that consignment produced.

## Creating one

**New Billing** adds a line by hand. Most billing is generated automatically from
[rate cards](./rate-cards); manual entry is for an extra charge.

## Selecting lines to invoice

This is the page's main action:

1. Tick the billing records to invoice.
2. Click **Create Invoice (N)**.

**The selection has hard rules**, enforced immediately:

| Message | Meaning |
|---|---|
| Selected billings must have the same contractor | You've mixed contractors |
| Selected billings must have the same sender account | You've mixed sender accounts |
| Selected billing must have a contractor or sender account | A selected line has no party to bill |
| No billings selected | Nothing ticked |

The reason is simple: **one invoice goes to one party**. Filter by contractor or sender
first, then select all — much faster than picking rows.

With lines selected you can also click **Email (N)** to send them to the party.

## Deleting

Billing records can be deleted. For lines already on an invoice, deal with the invoice
first.
