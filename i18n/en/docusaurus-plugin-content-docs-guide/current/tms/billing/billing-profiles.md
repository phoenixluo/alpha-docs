---
id: billing-profiles
title: Billing profiles
sidebar_position: 3
---

# Billing profiles

**Billing → Billing Profiles** decides **how often a party is invoiced and how long they
have to pay**. Rate cards handle price; profiles handle rhythm.

## Who a profile covers

Profiles attach to one of two kinds of party, shown as a badge in the list:

| Party | Used for |
|---|---|
| **Contractor** | An upstream party who gives you work |
| **Sender** | Configured by sender account type |

Filter the list by **Entity Type** and **Billing Type**.

## Creating one

Click **New Profile**, pick the party and billing type, and set the cycle and payment
terms.

Sender accounts also carry their own billing cycle and payment terms (see
[Sender accounts](../partners/sender-accounts)) — profiles are the layer that manages
this by type.

## Deactivating

Profiles aren't deleted, they're **deactivated** — confirmed with "Billing profile has
been deactivated." Existing billing is unaffected.

## Relationship to automatic invoicing

The cycle on a profile is what [cycle runs](./cycle-runs) follow. Once profiles are set,
the system gathers each period's billing automatically.
