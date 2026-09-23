# Alpha Docs

Public developer documentation for the Alpha Cargo suite, published to
<https://docs.alphacargo.io> via GitHub Pages.

Built with [Docusaurus 3](https://docusaurus.io/). Content is written in
Simplified Chinese (`zh-Hans`).

## Layout

```
docs/                 TMS developer guide, served under /tms
src/pages/index.tsx   Landing page listing the suite's products
static/               CNAME, Postman collection + environment
.github/workflows/    Pages deployment
```

WMS and Voice get their own docs instances later; the TMS guide is namespaced
under `/tms` from the start so adding them will not move any published URL.

## Local development

```bash
npm install
npm start          # dev server with hot reload
npm run build      # production build — fails on broken links
npm run serve      # serve the production build
```

Node 20+ is required.

## Publishing

Every push to `main` builds and deploys. The custom domain is set by
`static/CNAME`; do not delete that file.

## Writing rules

This repository is **public**. The product source lives in private
repositories, so anything published here must stay on the outside of that line:

- **No source paths, file names, line numbers, function names, table names or
  migration names.** Describe externally observable behaviour only.
- **No credentials, real API keys, customer data or real organization UUIDs.**
  Use obviously fake placeholders (`ak_example…`).
- **No internal architecture** (queues, row-level security, service layering).
- Document known limitations honestly, but frame them as behaviour and advice
  rather than as defects.

## Keeping the Postman collection in sync

`static/tms-api.postman_collection.json` carries a collection-level
pre-request script that signs every request. Its canonicalisation must stay
byte-identical to the server's, or every request it sends will fail to
authenticate. When the signing scheme changes, re-verify the script against the
server implementation before publishing.
