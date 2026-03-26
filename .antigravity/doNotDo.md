# Anti-patterns — never do these

## Architecture
- Do not change the routing structure without confirmation
- Do not add new top-level folders under `src/` without asking
- Do not move or rename existing files (`Home.tsx`, `NotFoundPage.tsx`, `store/`) without confirmation
- Do not create a new Redux slice unless explicitly asked — check if local state is enough first

## Styling
- Do not hardcode hex color values in JSX or Tailwind classes — always use CSS variables
- Do not use Tailwind's `bg-red-500` or similar named colors — only use the custom Coffee palette tokens
- Do not add any gradient utilities (bg-gradient-*, from-*, to-*)
- Do not use arbitrary Tailwind values like `w-[437px]` — stick to the spacing scale
- Do not write a new style.css file for things Tailwind already handles cleanly
- Do not use `style={{}}` inline styles for anything static

## Dependencies
- Do not install new packages without asking first
- Do not replace existing packages with alternatives (e.g. do not swap react-router for tanstack router)
- Do not add animation libraries (Framer Motion, GSAP, etc.) unless explicitly requested

## Code Quality
- Do not leave `console.log` in any committed code
- Do not use `any` type — ever
- Do not write `// TODO` comments — raise it in chat instead
- Do not use raw `useSelector` or `useDispatch` — always use typed wrappers `useAppSelector` / `useAppDispatch`
- Do not fetch data inside `useEffect` for static content that can be imported directly

## Design
- Do not add hero animations, particle effects, or typing animations
- Do not use more than 2 font weights in any single section
- Do not add dark borders or outlines to cards — use the subtle shadow defined in design-tokens.md
- Do not use purple, blue, or any color outside the Coffee palette without explicit approval