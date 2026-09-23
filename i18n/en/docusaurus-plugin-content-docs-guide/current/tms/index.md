---
id: index
title: TMS User Guide
sidebar_position: 1
---

# TMS User Guide

Alpha Cargo TMS covers goods from **dispatch** to **delivery**: keying in waybills,
planning trips, drivers scanning status back, and finally getting paid.

This guide is for the people doing that work. If you need to call the API, read the
[Developer Guide](/tms/).

## Who uses what

| Role | Mostly lives in |
|---|---|
| Data entry / support | **Waybills**: creating, importing, looking up, printing labels |
| Dispatch | **Delivery**: planning, assigning drivers, watching tracking |
| Drivers | The mobile scanner; delivery confirmation happens in LINE |
| Finance | **Billing**: rate cards, invoices, payments, reconciliation |
| Admins | **Settings**: organization, services, sub accounts and permissions |
| Recipients | The public tracking page — no account needed |

## Two parallel threads

Once goods enter the system two records run alongside each other: the **waybill** says
what the goods are and where they are going; the **delivery** says which vehicle, which
driver, which trip took them. One delivery usually carries many waybills.

Get those two straight and the menus stop looking confusing.

Two more terms are easy to read backwards. On screen they are:

- **Contractors** — the people who hand you freight to move. Your upstream.
- **Subcontractors** — the people you hand freight to. Your downstream.

## Where to start

| What you want to do | Read |
|---|---|
| Just got an account | [Signing up and signing in](/guide/tms/getting-started/signup) → [Finding your way around](/guide/tms/getting-started/navigation) |
| Learn the vocabulary | [Core concepts](/guide/tms/getting-started/concepts) |
| Enter, find and label goods | The waybill chapter, starting at [the waybill list](/guide/tms/waybills/list) |
| Plan trips and assign drivers | [Delivery planning](/guide/tms/delivery/planning) |
| Get drivers going | [Driver scanning](/guide/tms/driver/scan) and [delivery confirmation](/guide/tms/driver/pod) |
| Look up what a status means | [Waybill status reference](/guide/tms/waybills/statuses) |
| Manage customers and carriers | The [partners](/guide/tms/partners/sender-accounts) chapter |
| Invoice and get paid | [How the money moves](/guide/tms/billing/overview) |
| Configure services, permissions, automation | The [settings](/guide/tms/settings/organization) chapter |
| Stuck | [FAQ](/guide/tms/reference/faq) |
| Look up a term | [Glossary](/guide/tms/reference/glossary) |

## Can't see a menu?

TMS menus sit behind **two gates**:

1. **Plan features** — what your organization has. Anything not included is hidden from
   everyone, admins too.
2. **Account permissions** — what you personally were granted. Also hidden if you
   don't have it.

So two people in the same organization can see different menus. If something is
missing, ask your organization's admin rather than assuming you clicked the wrong thing.
