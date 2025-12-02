# Site Plans

## Multi-Page Site with GitHub Pages Deployment

### Project Setup
- [ ] Install React Router for client-side routing
  ```bash
  npm install react-router-dom
  ```
- [ ] Configure base path in `vite.config.ts` for GitHub Pages
  ```typescript
  base: '/bghelper/', // Replace with your repo name
  ```

### Project Structure
- [ ] Create `src/pages/` directory for page components
- [ ] Create `src/components/` directory for shared components
- [ ] Create `src/layouts/` directory for layout components (header, footer, nav)

### Routing Implementation
- [ ] Set up React Router in `src/main.tsx`
  - Import `BrowserRouter` (or `HashRouter` for GitHub Pages compatibility)
  - Wrap `<App />` with router provider
- [ ] Create route configuration in `src/App.tsx`
  - Define routes using `Routes` and `Route` components
  - Set up home page route
  - Set up additional page routes
  - Add 404/Not Found route
- [ ] Create navigation component with links to all pages

### Page Components
- [ ] Create Home page component
- [ ] Create About page component
- [ ] Create additional page components as needed
- [ ] Implement consistent layout across pages

### GitHub Pages Configuration
- [ ] Initialize Git repository (if not already done)
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```
- [ ] Create GitHub repository
- [ ] Add remote origin
  ```bash
  git remote add origin https://github.com/username/bghelper.git
  ```
- [ ] Install `gh-pages` package
  ```bash
  npm install -D gh-pages
  ```
- [ ] Add deployment scripts to `package.json`
  ```json
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
  ```

### Build Configuration
- [ ] Update `vite.config.ts` with correct base path
- [ ] Ensure all routes work with GitHub Pages (consider using HashRouter)
- [ ] Test build locally
  ```bash
  npm run build
  npm run preview
  ```
- [ ] Verify all routes work in production build

### Deployment
- [ ] Run deployment script
  ```bash
  npm run deploy
  ```
- [ ] Configure GitHub Pages in repository settings
  - Go to Settings > Pages
  - Select `gh-pages` branch as source
  - Save configuration
- [ ] Wait for GitHub Pages to build and deploy
- [ ] Visit deployed site at `https://username.github.io/bghelper/`

### Post-Deployment Testing
- [ ] Test all page routes on deployed site
- [ ] Verify navigation works correctly
- [ ] Test direct URL access to individual pages
- [ ] Check for any console errors
- [ ] Verify responsive design on different devices
- [ ] Test all links and interactions

### Optional Enhancements
- [ ] Add custom 404 page
- [ ] Implement lazy loading for page components
- [ ] Add page transitions/animations
- [ ] Set up custom domain (if desired)
- [ ] Add SEO metadata to each page
- [ ] Implement sitemap generation
- [ ] Add analytics tracking
