# onuresen.github.io — Personal Portfolio

> Public projects and field notes on construction objects, evidence, relationships, and decision intelligence by Onur Esen.
> Live at **[onuresen.github.io](https://onuresen.github.io)**

---

## What this is

A single-file HTML portfolio page served via GitHub Pages. No framework, no build step, no dependencies — open `index.html` and it works.

The homepage welcomes the **Objects, Evidence, Decisions** roadmap and separates public projects with working links from private R&D described at a product level. Private cards intentionally have no repository link.

The `notes/` section is the durable publication layer. LinkedIn posts can introduce an idea, while the complete explanation and verified public links live here.

**One post, one note.** Each LinkedIn post points to one note here. To add a note: write `notes/<slug>.md`, add one entry to `notes/index.json`, and link the post to `notes/post.html?slug=<slug>`.

**Visitor counter.** The pages load GoatCounter (no cookies, no personal data). It counts page views, and clicks on the Open and GitHub buttons. The site code is set in the `data-goatcounter` attribute at the end of `index.html`, `notes.html` and `notes/post.html`.

---

## Public projects featured

| Project | What it does | Live |
|---|---|---|
| [ONEXUS](https://github.com/onuresen/onexus) | Relationship intelligence graph with grounded provenance and live MCP control | [onuresen.github.io/onexus](https://onuresen.github.io/onexus/) |
| [Thinking Hub](https://github.com/onuresen/Thinking-Hub) | Browser-local productivity suite with connected projects, decisions, risks, and visual Canvas workflows | [onuresen.github.io/Thinking-Hub](https://onuresen.github.io/Thinking-Hub/) |
| [Kotoba Lab](https://github.com/onuresen/kotoba-lab) | Private Japanese reading, kanji-family study, and spaced-repetition workspace | [onuresen.github.io/kotoba-lab](https://onuresen.github.io/kotoba-lab/) |
| [Assembly Lab](https://github.com/onuresen/Assembly-Lab) | 3D modular building configurator with Japanese compliance standards | [onuresen.github.io/Assembly-Lab](https://onuresen.github.io/Assembly-Lab/) |
| [Genba Lab](https://github.com/onuresen/Genba-Lab) | Local-first IFC simulation playground for construction sequence, crane planning, hazards, and model-derived metrics | [onuresen.github.io/Genba-Lab](https://onuresen.github.io/Genba-Lab/) |
| Town Reboot (code private) | What quiet towns around Tokyo are really like, from PLATEAU and other open data: Fuji views, neighbours, rare spots, uses, a 3D view with textured buildings, and drive and train times from your home | [onuresen.github.io/town-reboot](https://onuresen.github.io/town-reboot/) |
| [Object-Centric Drawing](https://github.com/onuresen/object-centric-drawing) | Local-first PDF navigation with explicit object identity, portable evidence, and a one-way Revit export adapter | [onuresen.github.io/object-centric-drawing](https://onuresen.github.io/object-centric-drawing/) |

## Side project

| Project | What it is | Live |
|---|---|---|
| Hollowheart: Heart of the Mountain | A cozy mining-and-alchemy shop game, built by directing AI coding agents. Beta (Act I); source private, the [play repo](https://github.com/onuresen/hollowheart-play) holds only the build | [onuresen.github.io/hollowheart-play](https://onuresen.github.io/hollowheart-play/) |

## Selected private R&D

| Project | Public description |
|---|---|
| One+ | Stable Revit toolkit with a separate OneLab workspace for experimental tools and simulations |
| OneBridge | Reviewable MCP bridge between AI assistants and a running Revit model |
| Joinery Configurator | Governed joinery composition and catalog roundtrips through portable JSON and a separate environment-specific Revit add-in |

Additional work is named without links: Construction Decision Intelligence, OneRoot, Porta Logic, API Drift Radar Core, OneLab, and AI Orchestration.

---

## How it works

GitHub Pages serves `index.html` at the root automatically for a repo named `<username>.github.io`. No configuration needed.

To update the page: edit `index.html` and push to `main`.

---

## Tech

- Pure HTML + CSS + vanilla JS
- Zero dependencies, no build step
- Single file — the entire page is `index.html`
- Font: DM Sans via Google Fonts (only external resource)

---

*Onur Esen · Construction Engineer · BIM, AI & Digital Delivery*
