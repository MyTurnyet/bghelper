# Shackleton Base Helper - Task Checklist

## Overview
Create a setup randomizer helper page for Shackleton Base board game that helps players select starting corporations.

## Game Information
- **Game:** Shackleton Base
- **Helper Type:** Setup Randomizer
- **Feature:** Starting Corporation Selection

## Corporation List
1. Artemis Tours
2. Moon Mining
3. Selenium Research
4. Evergreen Farms
5. Sky Watch
6. Space Robotics
7. To Mars

## Preset Game Configurations
- **Game 1:** Artemis Tours, Moon Mining, Selenium Research
- **Game 2:** Evergreen Farms, Sky Watch, Space Robotics
- **Game 3:** To Mars, Moon Mining, Space Robotics

## Random Mode
- Select 3 corporations (all different/unique)
- Include re-roll button for new random selection

## Features Required
- [x] Create task checklist document
- [x] Create Shackleton Base page component
- [x] Set up routing for `/shackleton-base` path
- [x] Implement preset game selections (Games 1, 2, 3)
- [x] Implement random corporation selector
  - [x] Ensure all 3 selected corporations are unique
  - [x] Add re-roll button functionality
- [x] Add corporation descriptions for all 7 corporations
- [x] Display all options at once (presets + random on same page)
- [x] Style page to match existing site design
- [x] Update Home page card to link to Shackleton Base helper
- [x] Test all functionality

## UI Layout
- Show all preset games (1, 2, 3) displayed together
- Show random mode section with re-roll button
- Display corporation names with their descriptions
- Maintain consistent styling with existing helper pages

## Technical Notes
- Use React component structure matching existing pages
- Follow TypeScript best practices
- Ensure responsive design for mobile/tablet/desktop
- Use HashRouter routing (already configured)
