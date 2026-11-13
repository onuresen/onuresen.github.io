# Find the door, not the page

I was looking at the same door in a plan, a schedule and an elevation. A basic question started to bother me.

Why am I navigating pages, when what I want is the door?

## The problem

A drawing set is organised by page. A building is not.

One door can appear on a floor plan, an elevation, a schedule, a section and a detail. I can find every page. Finding *the door* across those pages is still slow.

## What I built

[Object-Centric Drawing](https://onuresen.github.io/object-centric-drawing/) is a small side project. It is a PDF reader that remembers the objects inside the drawings.

- Open normal PDF drawings in the browser.
- Mark where an object appears.
- Connect its other appearances on other sheets.
- Select the door once, then jump between the plan, the elevation, the schedule and the detail.

It can also link the door to the things around it: its wall, its rooms, the card reader that controls it.

The PDF stays as it is. The object layer sits next to it in a small JSON file. Nothing leaves your computer.

## One rule that became important

Two things called `D-105` are not automatically the same door.

Maybe they are. Maybe somebody copied the mark. The tool does not pretend to know. A person says which marks are the same object.

This sounds small. It is the difference between a reader that helps and a reader that quietly invents facts.

## What it is not

I am not trying to rebuild Revit inside a PDF reader.

There is a one-way Revit export, so sheets can arrive already linked to their objects. Nothing writes back to the model.

## Try it

- [Open the prototype](https://onuresen.github.io/object-centric-drawing/)
- [Read the code](https://github.com/onuresen/object-centric-drawing)

Use a drawing set you are allowed to open on your own machine. It still feels like a prototype in places.

## A question for people who work with drawing sets

Which object is the most annoying one to trace across drawings?

Tell me on [LinkedIn](https://www.linkedin.com/in/onuresen), or open an [issue on GitHub](https://github.com/onuresen/object-centric-drawing/issues). A real example helps more than a general answer.

## Where this is going

This is the first step of a longer line of work: objects first, then relationships, then evidence, then decisions. The full direction is in [Objects, Evidence, Decisions](post.html?slug=objects-evidence-decisions).
