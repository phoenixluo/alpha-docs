---
id: invoices
title: Invoices
sidebar_position: 5
---

# Invoices

**Billing → Invoices** is the bill you send a customer. One invoice is made of several
[billing](./billings) lines.

## List and filters

Filter by **Sender code**, **Status** and **Issue date range**.

## Creating from billing

The normal path is to tick lines on the [Billing](./billings) page and click
**Create Invoice** — only lines for the same party can go on one invoice. Success reports
the invoice was created with N billing items.

You can also create one directly on the invoices page.

## Invoice details

Open an invoice to see its **line items**, and add or remove them.

## Issuing

A new invoice starts as a draft. **Issuing** it makes it official — "The invoice has been
issued successfully."

Editing line items after issuing isn't appropriate; void and reissue instead.

## Recording payment

When the customer pays, **record a payment** against the invoice — "Payment created."

### Uploading a bank slip

For transfers, **upload the bank slip** as evidence — "Bank slip has been uploaded for
verification." The slip joins the **Pending Verification** queue on the
[Payments](./payments) page for someone with the permission to check.

The bank accounts you collect into are maintained on the **Receiving Bank Accounts**
page, reached from Payments.

## Bulk actions

When selecting several invoices they **must be billed to the same party**, otherwise you
get "Selected invoices must be billed to the same entity."
