# Objects, Evidence, Decisions

Buildings are made of objects and relationships. Their information is still organised mostly as files, pages, and application silos.

That gap has become the common thread behind several things I have been building. They began as separate experiments: a PDF drawing reader, a relationship graph, a joinery configurator, and a decision-intelligence workspace. Looking at them together, they are all asking the same question:

> How can construction information keep its identity, evidence, relationships, and reasoning as it moves between drawings, models, tools, and people?

This note is the roadmap for exploring that question in public.

## 1. Objects before pages

A door may appear in a floor plan, an elevation, a schedule, a section, and a detail. We can find every page, but finding the *door* across those pages is still surprisingly difficult.

[Object-Centric Drawing](https://onuresen.github.io/object-centric-drawing/) is my public experiment in navigating ordinary PDFs by building object. A marked rectangle or polygon is not treated as the object itself. It is one occurrence of an explicitly identified object in one source.

The source PDF remains unchanged. A small JSON sidecar stores the object layer, and matching labels never silently merge physical objects. The project is [open source on GitHub](https://github.com/onuresen/object-centric-drawing).

## 2. Relationships before isolated records

Identity becomes more useful when objects can be connected: a card reader controls a door, a door is hosted by a wall, and a room supplies requirements to the door.

[ONEXUS](https://onuresen.github.io/onexus/) explores this relationship layer as an inspectable knowledge graph. Its emphasis is not the graph visual by itself, but the provenance, confidence, validity, and review state behind each relationship. The [ONEXUS source is public](https://github.com/onuresen/onexus).

The practical principle is simple:

> A knowledge graph becomes useful when its nodes and relationships can take us back to evidence.

## 3. AI after the evidence boundary

I would not ask AI to design a door from one screenshot and quietly trust the result.

The direction I am testing is narrower:

1. Collect the object's known occurrences and context.
2. Package the selected visual evidence and identity.
3. Let AI propose a structured composition.
4. Validate it against an explicit schema and rules.
5. Keep a person responsible for accepting or correcting it.

The Joinery Configurator used in this exploration remains private while company-specific mappings and reusable public logic are separated. I will share the method and results without publishing private repositories, drawings, or project evidence.

## 4. Decisions, not just data

An object property, drawing mark, issue, checklist item, and past decision are individually useful. The harder problem is preserving how they relate and what can legitimately be concluded from them.

My current working model is:

`Evidence + Constraints + Ontology + Relationships = Decision Context`

`Decision Context + AI = Bounded Assistance`

Construction Decision Intelligence is the private R&D layer exploring this question. Its graph and governed relationships are the asset; AI is one consumer, not the authority.

## What I will publish here

This will be a working notebook rather than a stream of product announcements. I plan to publish:

- Small, inspectable demonstrations.
- Architecture decisions and rejected alternatives.
- Failures found on real workflows.
- Public source code where the repository is genuinely public.
- Clear boundaries between demonstrated capability, hypothesis, and future direction.

The ambition is larger than any one application, but the method will stay grounded: start with an object, return to its evidence, preserve its relationships, and make the decision path reviewable.

## Why I am doing this in public

Partly because I want better feedback than I can get by building alone.

I would like to understand which parts are merely interesting and which parts solve a problem that practitioners repeatedly feel. That means the useful signals are not only page views or likes. I am more interested in questions such as:

- Which object is painful to trace across a drawing set?
- Where does information get recreated instead of reused?
- What must remain editable when it moves between BIM, PDF, a catalog, and a supplier?
- What evidence would make an AI proposal worth reviewing?

Object-Centric Drawing is the easiest place to begin because it is public and small enough to try. The larger decision-intelligence direction may eventually lead somewhere else: a better role, a collaboration, an open-source community, a product, perhaps even a company. It is too early to decide that part.

For now the plan is simpler: publish the working pieces, be honest about what failed, and listen carefully when somebody says, “we have this problem too.”

