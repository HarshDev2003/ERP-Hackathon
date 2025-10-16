
Vite conversion - automatic best-effort changes made by assistant:
- package.json scripts replaced to use vite (dev/build/preview/start)
- @vitejs/plugin-react and vite were added to devDependencies (version hints only)
- vite.config.js added with an alias '@' -> src
- index.html placed at project root and adjusted for Vite to load /src/main.jsx
- src/index.* (if found) was moved to src/main.jsx and updated to React 18 createRoot pattern.
- Original entry files (index.*) were backed up with extension .cra-backup
- No npm install was run. Run 'npm install' in the project directory to install dependencies.
- You may need to:
    * rename any environment variables from REACT_APP_* to VITE_*
    * check asset paths referencing %PUBLIC_URL% and update
    * review service worker / PWA setup manually
    * adjust testing config (Jest -> Vitest) if required
- Build output remains default Vite 'dist/'.
