# Dead Reckoning Solo Helper - MVP Sprint 1

## Goal
Create a minimal working prototype that allows playing a basic Dead Reckoning solo game with core turn management, resource tracking, and achievement progress.
Ensure that all code added is fully unit tested and functioning.

**Target**: Playable in 1-2 weeks with essential features only.

---

## Sprint 1 Task Checklist

### 1. Project Setup & Routing
- [ ] Create new route `/helpers/dead-reckoning` in `src/App.tsx`
- [ ] Create new page component: `src/pages/helpers/DeadReckoning.tsx`
- [ ] Add Dead Reckoning to home page game list with image
- [ ] Test navigation works

**Acceptance Criteria**: Can navigate to Dead Reckoning page from home

---

### 2. Basic Game State (Phase 1.1)

**File**: `src/types/deadReckoning.ts`

Create TypeScript interfaces:

```typescript
interface CovenantState {
  coins: number
  wood: number
  damage: number
  shipUpgrades: number
  piratePileCount: number
  mercantilePileCount: number
}

interface AchievementProgress {
  legendary: number // 0-4 cubes
  terrorOfTheSea: boolean
  expertSailors: number // 0-3 cubes
  eliteVessel: boolean
  explorer: number // 0-5 boards
  builder: number // building count
  settler: Record<string, number> // island -> cube count
  capitalist: boolean
}

interface GameState {
  turn: number
  difficulty: 'normal' | 'expert'
  covenant: CovenantState
  covenantAchievements: AchievementProgress
  playerAchievementCount: number
  gamePhase: 'setup' | 'active' | 'ended'
}
```

**Tasks**:
- [ ] Create `src/types/deadReckoning.ts` with interfaces
- [ ] Create `src/hooks/useDeadReckoningGame.ts` with state management
- [ ] Implement `initializeGame()` function
  - Covenant starts with 15 coins, 0 wood, 0 damage
  - Turn starts at 0
  - All achievements at 0/false
- [ ] Implement basic state setters:
  - `setCovenantCoins(amount: number)`
  - `addCovenantWood(amount: number)`
  - `setCovenantDamage(damage: number)`
  - `incrementTurn()`

**Acceptance Criteria**: Game state initializes and can be updated

---

### 3. Game Layout & Header

**File**: `src/pages/helpers/DeadReckoning.tsx`

Create basic page structure with:
- Game header (similar to ShackletonBase)
- Turn counter display
- Game phase indicator
- Main game area (placeholder for now)

**Tasks**:
- [ ] Add `HelperHeader` component with Dead Reckoning title
- [ ] Create turn counter display (prominent, large text)
  - Shows current turn number
  - Shows card section (A for turns 1-3, B for 4-6, etc.)
- [ ] Add "End Turn" button
- [ ] Add "New Game" / "Reset" button

**Acceptance Criteria**: Page displays header, turn counter, and basic controls

---

### 4. Covenant Resource Tracker (Phase 4.1 - Simplified)

**Component**: `src/components/deadReckoning/CovenantTracker.tsx`

Display and manage Covenant resources:

**Tasks**:
- [ ] Create card-style component showing:
  - **Coins**: Large number with +/- buttons
  - **Wood**: Number with +/- buttons + "Convert to Coins" button (3:1)
  - **Damage**: Visual indicator (0-5 hearts/icons), +/- buttons
  - **Ship Upgrades**: Counter (0-4) with +/- buttons
- [ ] Implement wood-to-coin conversion:
  - Button disabled if wood < 3
  - Converts 3 wood → 1 coin automatically
  - Shows remaining wood
- [ ] Auto-check Capitalist achievement (30+ coins)
- [ ] Auto-check Elite Vessel achievement (4 upgrades)
- [ ] Visual warning at 30+ coins ("Capitalist Achievement!")

**Acceptance Criteria**: Can track and modify all Covenant resources

---

### 5. Achievement Tracker (Phase 1.3 - Simplified)

**Component**: `src/components/deadReckoning/AchievementTracker.tsx`

Track Covenant achievements with manual inputs:

**Layout**: Grid of achievement cards (2 columns on mobile, 4 on desktop)

**Tasks**:
- [ ] **Legendary** (4 cubes):
  - Display: 4 checkbox circles (filled = earned)
  - Button: "Add Cube" (disabled at 4)
- [ ] **Terror of the Sea**:
  - Display: Single checkbox
  - Toggle: "Covenant Sank Player Ship"
- [ ] **Expert Sailors** (3 cubes):
  - Display: 3 checkbox circles
  - Button: "Add Cube" (disabled at 3)
  - Note: "From card effects only"
- [ ] **Elite Vessel**:
  - Display: Single checkbox
  - Auto-awarded from Covenant tracker (4 upgrades)
  - Show as locked/automatic
- [ ] **Explorer** (5 boards):
  - Display: 5 checkbox circles
  - Button: "Mark Board Explored" (disabled at 5)
- [ ] **Builder**:
  - Display: Number (target 5+) with +/- buttons
  - Auto-awards at 5
- [ ] **Settler**:
  - Display: "Track Manually" placeholder
  - Simple checkbox for now (future: per-island tracking)
- [ ] **Capitalist**:
  - Display: Single checkbox
  - Auto-awarded from coin tracker (30+)
  - Show as locked/automatic
- [ ] **Player Achievements**:
  - Simple counter with +/- buttons
  - Label: "Player Achievement Count"

**End Game Detection**:
- [ ] Count total Covenant achievements
- [ ] Count player achievements
- [ ] Show warning banner when either reaches 4
- [ ] "Game Over" modal when turn ends with 4+ achievements

**Acceptance Criteria**: All 8 achievements display and can be tracked

---

### 6. Turn Management (Phase 8.1 - Minimal)

**Component**: Integrated into main page

**Tasks**:
- [ ] "End Turn" button:
  - Increments turn counter
  - Triggers end-of-turn wood-to-coin conversion (automatic)
  - Shows modal: "Covenant collects resources from controlled islands"
  - Prompts: "Add any wood/coins collected"
  - Checks for game end (4 achievements)
- [ ] "New Game" button:
  - Confirmation dialog
  - Resets all state to initial values
- [ ] Turn history log (simple):
  - Collapsible list showing last 5 turns
  - Each entry: "Turn X completed"

**Acceptance Criteria**: Can advance turns and see history

---

### 7. Simple Battle Calculator (Phase 3.1, 3.2 - Minimal)

**Component**: `src/components/deadReckoning/BattleCalculator.tsx`

**Tasks**:
- [ ] Display Covenant cannon calculation:
  - Base: 1
  - Ship Upgrades: +X (from tracker)
  - Pirate Pile: +1 per 2 advancements
  - Harbor Defense: +4 checkbox (toggle)
  - Buildings on Space: +X (manual input, 0-3)
  - **Total**: Large prominent number
- [ ] Manual inputs:
  - Pirate pile advancement count
  - "Defending in Harbor" checkbox
  - Buildings on space (0-3)
- [ ] Battle outcome section:
  - "Covenant Won" button:
    - Inputs: Wood gained, Coins gained
    - Auto-adds to Covenant supply
  - "Player Won" button:
    - Input: Damage dealt to Covenant
    - Adds to Covenant damage tracker
    - Prompts Legendary cube if Covenant sunk

**Acceptance Criteria**: Can calculate cannons and record battle outcomes

---

### 8. Advancement Pile Tracker (Phase 2.1 - Minimal)

**Component**: `src/components/deadReckoning/AdvancementPiles.tsx`

**Tasks**:
- [ ] Display two piles:
  - **Pirate Pile**: Count with +/- buttons
  - **Mercantile Pile**: Count with +/- buttons
- [ ] Show Mercantile Income calculation:
  - Formula: Floor(Mercantile Pile / 2)
  - Display: "Mercantile Income: X coins/turn"
  - Button: "Collect Mercantile Income" (adds coins)
- [ ] Merchant Ship Coin Flip:
  - Button: "Flip for Merchant Ship"
  - Random Heads/Tails result
  - Heads: "Add to Legendary + Mercantile Pile"
  - Tails: "Add to Mercantile Pile"

**Acceptance Criteria**: Can track both piles and calculate income

---

### 9. Difficulty Selector (Phase 5.1 - Minimal)

**Component**: Game setup screen

**Tasks**:
- [ ] Add difficulty selector to setup:
  - Radio buttons: Normal / Expert
  - Description for each
  - Normal: "All blue cards"
  - Expert: "All red cards"
- [ ] Store in game state
- [ ] Display current difficulty on main screen

**Acceptance Criteria**: Can select difficulty at game start

---

### 10. Basic Styling & Polish

**Tasks**:
- [ ] Apply Tabletop Haven theme colors
- [ ] Responsive layout (mobile-first)
- [ ] Card-based component design
- [ ] Clear visual hierarchy:
  - Turn counter: Largest
  - Covenant resources: Prominent
  - Achievements: Grid layout
  - Battle calculator: Collapsible panel
- [ ] Consistent spacing and padding
- [ ] Touch-friendly buttons (min 44px tap target)

**Acceptance Criteria**: App looks cohesive and matches site theme

---

## MVP Feature Scope Summary

### ✅ Included in MVP
- Turn tracking with section indicators
- Covenant resource management (coins, wood, damage, upgrades)
- All 8 achievement trackers with auto-detection
- Player achievement counter
- End game detection (4 achievements)
- Battle cannon calculator
- Battle outcome recording
- Advancement pile tracking
- Mercantile income calculator
- Wood-to-coin conversion
- Difficulty selector (Normal/Expert)
- Basic turn history

### ❌ NOT in MVP (Future Sprints)
- Card deck display (player uses physical cards)
- Card effect automation (player reads cards)
- Grid-based board visualization
- Island control tracking
- Conditional effects automation
- Delayed resource system
- Multiple battle sequencer
- Save/load functionality
- Hard mode (alternating cards)
- Extreme mode (bonus cards)
- Turn history with details
- Undo functionality

---

## Testing Checklist

Before considering Sprint 1 complete:

- [ ] Can start a new game
- [ ] Can increment turn counter
- [ ] Card section updates correctly (A, B, C)
- [ ] Can add/remove Covenant resources
- [ ] Wood converts to coins (3:1)
- [ ] All achievements can be tracked
- [ ] Capitalist auto-awards at 30 coins
- [ ] Elite Vessel auto-awards at 4 upgrades
- [ ] Game end warning appears at 4 achievements
- [ ] Cannon calculator shows correct total
- [ ] Battle outcomes update resources
- [ ] Advancement piles track correctly
- [ ] Mercantile income calculates correctly
- [ ] Can reset game
- [ ] Responsive on mobile
- [ ] Responsive on desktop

---

## File Structure

```
src/
├── pages/
│   └── helpers/
│       └── DeadReckoning.tsx          # Main game page
├── components/
│   └── deadReckoning/
│       ├── CovenantTracker.tsx        # Resource tracker
│       ├── AchievementTracker.tsx     # Achievement grid
│       ├── BattleCalculator.tsx       # Battle helper
│       ├── AdvancementPiles.tsx       # Pile management
│       └── TurnCounter.tsx            # Turn display
├── hooks/
│   └── useDeadReckoningGame.ts        # Game state hook
└── types/
    └── deadReckoning.ts               # TypeScript interfaces
```

---

## Success Criteria

Sprint 1 is complete when:

1. ✅ A player can track a complete solo game using the app
2. ✅ All Covenant resources are tracked accurately
3. ✅ All achievements can be monitored
4. ✅ Battle calculations are accurate
5. ✅ Game detects when 4 achievements are reached 
6. ✅ Code is fully unit tested 
7. ✅ App is usable on mobile and desktop 
8. ✅ Code is clean and maintainable

---

## Next Steps (Sprint 2+)

After MVP is working:
1. Add card deck system with visual display
2. Implement card effect descriptions
3. Add detailed turn history
4. Save/load functionality
5. Hard mode with alternating card sides
6. Reference panel with rules
7. Animation and polish
