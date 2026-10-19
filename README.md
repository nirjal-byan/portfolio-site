# Portfolio Site

A responsive portfolio website built with React, TypeScript, Vite, Tailwind CSS, GSAP, and Lucide React.

## Local development

Requires Node.js and npm. Run from the repository root:

```sh
cd client
npm ci
npm run dev
```

## Build and checks

Run from `client/`:

```sh
npm run build    # Create the production build in dist/
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Contact form

The contact form uses Formspree. To use a different form, set `VITE_FORMSPREE_ENDPOINT` in `client/.env.local` or the build environment, then rebuild. Configure and verify the recipient in Formspree.
