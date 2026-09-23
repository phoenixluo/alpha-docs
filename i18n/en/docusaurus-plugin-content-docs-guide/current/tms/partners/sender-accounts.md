---
id: sender-accounts
title: Sender accounts
sidebar_position: 4
---

# Sender accounts

**Partners → Sender Accounts** lists the entities that ship through you. Waybills hang
off them and billing is charged to them — **without a sender account, goods can't come
in**. The "Sender Account Code" that [importing waybills](../waybills/import) requires is
this.

## The list

Three figures across the top: **Total Accounts**, **Active Accounts**,
**Inactive Accounts**.

The search box matches **name, company, code, email or phone** — and you have to
**press Enter** for it to run. There's a **Type** filter beside it.

The table shows code, name, company, contact, type, **Billing Cycle**,
**Payment Terms** and status.

## Adding an account

**Add Sender Account** in the top right, or **Import** for a batch.

The fields that matter:

| Field | Note |
|---|---|
| **Code** | This account's unique identifier — the one you put in import files |
| **Type** | Classification, maintained under **Configure Sender Account Types** |
| **Billing Cycle** | Weekly / Biweekly / Monthly / Custom |
| **Payment Terms** | Due on Receipt, Net 7 / 15 / 30 / 45 / 60 / 90, or Custom |

Cycle and terms decide how and when this customer is invoiced — see the billing chapter.

## Inside an account

Opening one gives you the details plus two more things:

- **Code ranges** — a block of waybill numbers reserved for this account.
- **Wallet** — a prepaid balance. Top-ups are drawn down automatically, and it can be
  adjusted by hand (which needs the wallet adjustment permission).

## Where account types live

The **Configure Sender Account Types** button opens the type maintenance page.

:::note
That page **isn't in the Settings menu** — this button is the way in. See
[Finding your way around](../getting-started/navigation).
:::

## Active and inactive

An inactive account takes no new goods, but its history and billing remain. Deactivate a
customer who has paused; don't delete them.
