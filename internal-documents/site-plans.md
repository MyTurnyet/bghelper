# Site Plans

## Multi-Page Site with GitHub Pages Deployment

### Project Setup
- [x] Install React Router for client-side routing
  ```bash
  npm install react-router-dom
  ```
- [x] Configure base path in `vite.config.ts` for GitHub Pages
  ```typescript
  base: '/bghelper/', // Replace with your repo name
  ```

### Project Structure
- [x] Create `src/pages/` directory for page components
- [x] Create `src/components/` directory for shared components
- [x] Create `src/layouts/` directory for layout components (header, footer, nav)

### Routing Implementation
- [x] Set up React Router in `src/main.tsx`
  - Import `BrowserRouter` (or `HashRouter` for GitHub Pages compatibility)
  - Wrap `<App />` with router provider
- [x] Create route configuration in `src/App.tsx`
  - Define routes using `Routes` and `Route` components
  - Set up home page route
  - Set up additional page routes
  - Add 404/Not Found route
- [x] Create navigation component with links to all pages

### Page Components
- [x] Create Home page component
- [x] Create About page component
- [x] Create additional page components as needed
- [x] Implement consistent layout across pages

### GitHub Pages Configuration
- [x] Install `gh-pages` package
  ```bash
  npm install -D gh-pages
  ```
- [x] Add deployment scripts to `package.json`
  ```json
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
  ```

### Build Configuration
- [x] Update `vite.config.ts` with correct base path
- [x] Ensure all routes work with GitHub Pages (consider using HashRouter)
- [x] Test build locally
  ```bash
  npm run build
  npm run preview
  ```
- [x] Verify all routes work in production build

### Deployment
- [x] Run deployment script
  ```bash
  npm run deploy
  ```
- [x] Configure GitHub Pages in repository settings
  - Go to Settings > Pages
  - Select `gh-pages` branch as source
  - Save configuration
- [x] Wait for GitHub Pages to build and deploy
- [x] Visit deployed site at `https://myturnyet.github.io/bghelper/`

### Post-Deployment Testing
- [x] Test all page routes on deployed site
- [x] Verify navigation works correctly
- [x] Test direct URL access to individual pages
- [x] Fixed routing issue by switching from BrowserRouter to HashRouter
  - URLs now use hash format: `https://myturnyet.github.io/bghelper/#/` and `https://myturnyet.github.io/bghelper/#/about`
  - All routes work correctly with direct URL access
- [ ] Check for any console errors (manual testing required)
- [ ] Verify responsive design on different devices (manual testing required)
- [ ] Test all links and interactions (manual testing required)