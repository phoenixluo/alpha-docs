---
id: labels-integrations
title: Label templates and integrations
sidebar_position: 6
---

# Label templates and integrations

## Label templates

**Settings → Label Templates** manages label layouts.

**Create Template** opens a visual editor. In the list you can **set a default** — what
[printing labels](../waybills/labels) uses unless something else is specified.

Setting the current default again tells you "This template is already set as default".

:::warning
**The default template cannot be deleted** — you get "Cannot delete the default
template". Make another one the default first.
:::

Deleting a template asks for confirmation.

### Per-subcontractor templates

Different [subcontractors](../partners/subcontractors) want different layouts. When
adding one you can set a template for them, so goods handed over print in their format.

## Third-party integrations

**Settings → Integrations** configures credentials for third-party carriers and payment
channels.

Each channel is a card. **Channels not in your plan appear locked** — you can see they
exist but not configure them. See the plan gate in
[Finding your way around](../getting-started/navigation).

What you enter are the credentials that provider gave you. Once saved, services can
order through that channel.

:::note
Connecting **your own** system to TMS is the other direction — use the keys under
**Settings → Organization → API Credentials**, and see the
[Developer Guide](/tms/authentication).
:::
