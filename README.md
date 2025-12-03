# Board Game Helpers

A collection of web-based helper tools for board games, built with React, TypeScript, and Vite.

## About

Board Game Helpers provides interactive tools to enhance your tabletop gaming experience. Each helper is designed to streamline gameplay and reduce setup time for various board games.

## Available Helpers

### Dice Roller
Roll a six-sided die for your board games. Perfect for when you've lost the dice or need a quick random number.

### Shackleton Base
Corporation setup randomizer for the board game Shackleton Base. Includes preset corporation combinations for your first three games, plus a random selection generator.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS Variables** - Theming system

## Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd bghelper
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run predeploy` - Run build before deployment
- `npm run deploy` - Deploy to GitHub Pages
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

The project is configured to deploy to GitHub Pages:

```bash
npm run deploy
```

This will:
1. Run the build process
2. Deploy the `dist` folder to the `gh-pages` branch
3. Make the site available at your GitHub Pages URL

## Project Structure

```
bghelper/
├── public/
│   └── images/          # Game images and assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Card.tsx
│   │   ├── CardGrid.tsx
│   │   ├── HelperHeader.tsx
│   │   └── PageContainer.tsx
│   ├── pages/
│   │   ├── helpers/     # Individual helper pages
│   │   │   ├── DiceRoller.tsx
│   │   │   └── ShackletonBase.tsx
│   │   └── Home.tsx     # Homepage with helper cards
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Entry point
├── dist/                # Production build output
└── vite.config.ts       # Vite configuration
```

## Adding New Helpers

To add a new board game helper:

1. Create a new component in `src/pages/helpers/YourHelper.tsx`
2. Use the `HelperHeader` component for consistent styling
3. Add your helper to the route in `src/App.tsx`
4. Add a card entry in `src/pages/Home.tsx` with:
   - Unique ID
   - Helper name
   - Game image (placed in `public/images/`)
   - Description
   - Route path

## Design System

The project uses a custom "Tabletop Haven" theme with:
- **Primary accent**: Teal (#16A085)
- **Secondary accent**: Purple (#9B59B6)
- **Dark background**: Deep navy with card-based layouts
- **Responsive design**: Mobile-first approach

All colors are managed through CSS variables in `src/index.css`.

## TypeScript Configuration

The project uses strict TypeScript settings with:
- `verbatimModuleSyntax` enabled - requires type-only imports for types
- Separate configs for app (`tsconfig.app.json`) and build tooling (`tsconfig.node.json`)

## Contributing

When contributing:
1. Follow the existing code style and component patterns
2. Use the `HelperHeader` component for new helper pages
3. Ensure all TypeScript types are properly defined
4. Test the build process before submitting PRs
5. Update this README if adding new features or helpers


## Acknowledgments

- Game images are property of their respective publishers
- Built with React + TypeScript + Vite template
