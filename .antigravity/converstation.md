# Coding Conventions

## Language & Types
- TypeScript strict mode — always on (see tsconfig.app.json)
- No `any` type — use `unknown` or explicit interfaces
- All component props must have explicit TypeScript interfaces defined above the component
- Never use inline type literals for props: always extract to a named interface

## Component Structure
- Functional components only — no class components
- One component per file
- File name must match component name (PascalCase): `ProjectCard.tsx`
- Co-locate component styles: if a component needs a style file, place it in the same folder
  e.g. `components/Home/Home.tsx` + `components/Home/style.css`
- Keep components under 150 lines — extract sub-components if longer

## Folder Conventions
- `src/components/` — shared UI components, each in their own subfolder
- `src/pages/` — one file per route (no sub-components here, import from components/)
- `src/store/slices/` — Redux slices only
- `src/store/index.ts` — store configuration
- `src/assets/` — images, resume PDF, SVGs
- `src/posts/` — MDX blog post files (to be created)
- `src/data/` — static data arrays: projects.ts, skills.ts (to be created)
- `src/hooks/` — custom hooks (to be created)

## Import Order (enforce via ESLint)
1. React
2. Third-party libraries (react-router-dom, react-redux, etc.)
3. Internal components — use `@/` path alias
4. Types and interfaces
5. Styles and assets

## Styling — Tailwind CSS v4
- Use Tailwind utility classes as the primary styling method
- Do not write custom CSS for things Tailwind already handles
- For component-specific overrides that Tailwind cannot handle cleanly, use a co-located style.css
- All design tokens (colors, fonts, spacing) must be defined in the Tailwind config / CSS variables — never hardcode hex values in JSX
- Mobile-first always: write base classes for mobile, use `md:` / `lg:` prefixes to scale up
- Dark mode via Tailwind's `dark:` variant — class-based dark mode (class="dark" on <html>)

## Naming
- Components: PascalCase → `ProjectCard.tsx`
- Hooks: camelCase with `use` prefix → `usePosts.ts`
- Redux slices: camelCase → `themeSlice.ts`
- Utility functions: camelCase → `formatDate.ts`
- Constants: UPPER_SNAKE_CASE → `ROUTES.ts`
- CSS class names (if any): kebab-case
- MDX post filenames: kebab-case slug → `linux-file-permissions.mdx`

## Redux Usage
- Use Redux only for truly global state: theme (dark/light), auth if added later
- Do not use Redux for UI state (open/close modals, hover states) — use local useState
- Each slice lives in `src/store/slices/`
- Import typed hooks (useAppDispatch, useAppSelector) — never raw useSelector/useDispatch

## No-goes
- No default exports from utility or data files — named exports only
- No direct DOM manipulation
- No `console.log` left in committed code
- No inline styles in JSX except for truly dynamic values (e.g. calculated widths)
- Do not install new dependencies without asking first