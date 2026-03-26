# Architecture

## Type
Frontend-only application

## Stack
- React 19 (Vite)
- TypeScript
- Tailwind CSS (v4 via @tailwindcss/vite)
- ESLint + Prettier

## Available Libraries (Use Carefully)
- Redux Toolkit
- React Redux
- React Router DOM

## Core Principle
Just because a library exists does NOT mean it should be used.

---

## Core Flow
User Input (textarea / file)
→ Markdown string
→ Markdown parser (react-markdown - to be added)
→ HTML output
→ Styled UI (Tailwind)

---

## Component Structure
- Editor → handles markdown input
- Viewer → renders parsed markdown
- App → manages layout and state

Optional (only if needed later):
- Layout component (if routing introduced)

---

## State Management Strategy

### Default
- useState (local state)

### When to use Redux (STRICT CONDITION)
Use Redux ONLY if:
- multiple unrelated components need shared state
- state becomes complex and deeply nested

Current verdict:
❌ Redux NOT required

---

## Routing Strategy

### Default
- No routing required

### When to introduce React Router
Only if:
- multiple pages (e.g., /viewer, /docs, /settings)

Current verdict:
❌ Routing NOT required

---

## Styling
- Tailwind CSS v4
- Typography plugin for markdown (to be added)
- Dark mode first

---

## Linting & Formatting
- ESLint (with react hooks plugin)
- Prettier

---

## Constraints

- No backend
- No authentication
- No database
- Avoid Redux unless absolutely necessary
- Avoid routing unless multiple pages exist
- Keep components small and focused

---

## Dependencies to Add (Required for core feature)

- react-markdown
- remark-gfm
- rehype-highlight
- highlight.js

---

## Future Extensions (Only after MVP)

- File upload
- GitHub README fetch
- Copy button for code blocks
- Optional routing (if multiple views added)

---

## Architectural Philosophy

Build the simplest thing that works.

Avoid:
- Premature abstraction
- Unused libraries
- Complex state management

---

## Reality Check

Current setup includes tools for large-scale apps.

This project is:
→ small
→ focused
→ single-purpose

So architecture must stay minimal despite available tools.