# J8SLAY

A React + Vite site with an interactive celestial wheel, random destination selection, and Music, Dreams, Archive, Lore, Live, and About panels. The interface adapts to mobile and supports keyboard navigation and reduced motion.

## Development

Install dependencies with `npm install`, then use `npm run dev`. The app entry point is `src/main.tsx`, page content lives in `src/App.tsx`, and active styles live in `src/index.css`.

## Deployment

Netlify uses the build command and `dist` publish directory defined in `netlify.toml`. The site runs independently of Figma.

## Content

No audio recordings, photographs, zines, or confirmed event dates were included in the repository. The corresponding panels display empty states. Replace those states in `src/App.tsx` with real content as it becomes available. The wheel currently selects a section to explore; it does not play audio.
