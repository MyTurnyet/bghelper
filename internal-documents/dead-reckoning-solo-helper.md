# Dead Reckoning Solo Helper - Implementation Plan

## Overview

Dead Reckoning's solo mode features an AI opponent called the "Wayward Covenant" that uses a deck of 18 specialized
cards to simulate a 2-player game. This helper will manage the AI's actions, track resources, handle battles, and
provide a seamless solo play experience.

### Core Solo System Features

- **18-card AI deck** with Normal (blue) and Hard (red) difficulty sides
- **Turn-based progression** with sectioned card effects (A, B, etc. every 3 turns)
- **Grid-based positioning** system matching game boards
- **Two-phase actions**: Left side (board actions) + Right side (additional effects)
- **4 difficulty tiers**: Normal, Hard, Expert, Extreme
- **Achievement race** to 4 achievements
- **Battle system** with automatic cannon calculation
- **Resource management** with wood-to-coin conversion (3:1)
- **Co-op variant** (2v2 with dual AI opponents)

---

## Implementation Tasks

### Phase 1: Core Infrastructure

#### 1.1 Game State Management

- [ ] Create game state store (setup, active, ended phases)
- [ ] Track turn number
- [ ] Store Covenant resources:
    - Coins (starts with 15 coins)
    - Wood (for conversion)
    - Ship damage level (0-5)
    - Ship upgrades
- [ ] Track current card section (A, B, C, etc. based on turn number)
- [ ] Store game mode: Solo only (Co-op deferred to Phase 7)

#### 1.2 Covenant Card System

- [ ] Create data structure for 18 Wayward Covenant cards
    - Each card has Normal (blue) and Hard (red) sides
    - Grid-based left side (board positions, cube placements)
    - Icon-based right side (sequential effects)
    - Conditional effects (centerline icons)
- [ ] Implement deck initialization with difficulty selection
- [ ] Build card shuffling system (with special logic for Hard mode alternation)
- [ ] Create card drawing mechanism
- [ ] Build card display component showing current revealed card
- [ ] Implement turn section highlighting (turns 1-3 = section A, 4-6 = section B, etc.)
- [ ] Add card history viewer

#### 1.3 Achievement Tracking System

**Note**: Achievement tracking has mixed automatic/manual inputs due to game state complexity.

**Covenant Achievements (8 total - cannot claim Master Merchant)**:

1. **Legendary** (4 cubes)
    - [ ] Track defeats: Player Ship OR Merchant ships
    - [ ] Manual increment button for each defeat
    - [ ] Auto-increment from Merchant ship flip (heads result)

2. **Terror of the Sea** (Binary)
    - [ ] Manual toggle: "Covenant sank player's Ship"
    - [ ] Automatically award when toggled

3. **Expert Sailors** (3 cubes)
    - [ ] Auto-increment from card effects only
    - [ ] Track cube count from right-side card effects

4. **Elite Vessel** (Binary)
    - [ ] Auto-track Ship Upgrades acquired
    - [ ] Auto-award at 4th upgrade

5. **Explorer** (5 boards for solo, 3 for co-op)
    - [ ] Manual input: "Mark board as explored"
    - [ ] List of explorable Ocean boards with checkboxes
    - [ ] Auto-award when threshold reached

6. **Builder** (Binary - 5+ buildings)
    - [ ] Manual counter for buildings controlled
    - [ ] +/- buttons to adjust count (possession changes)
    - [ ] Auto-award at 5 buildings

7. **Settler** (Binary - 6+ permanent cubes on all islands)
    - [ ] Manual per-island permanent cube tracker
    - [ ] Island list with cube counters
    - [ ] Auto-award when all islands have 6+ cubes

8. **Capitalist** (Binary - 30+ coins)
    - [ ] Auto-track from coin total
    - [ ] Auto-award at 30 coins

**Player Achievement Tracking**:

- [ ] Simple counter display (player manages outside app)
- [ ] Optional: Full player achievement tracking (future enhancement)

**General Achievement System**:

- [ ] Visual achievement cards with progress bars/checkboxes
- [ ] 4th achievement detection triggers end game warning
- [ ] Last turn notification system
- [ ] Achievement summary display

---

### Phase 2: Card Resolution System

#### 2.1 Left Side Effects (Board Actions)

##### Grid-based Board Visualization

- [ ] Create board grid layout (Harbor on left, Ocean boards on right)
- [ ] Map card grid positions to actual game boards
- [ ] Visual indicators for:
    - White-bordered spaces (Advancements to claim)
    - Numbered influence cube placements
    - Orange space (Covenant end turn position)
    - Conditional effect icons (top and bottom centerline)

##### Advancement Management

The player will input whether the collected advancements are **Pirate** or **Mercantile**

- [ ] Create two-pile system: **Pirate pile** and **Mercantile pile**
- [ ] Implement automatic sorting logic:
    - Cannons or battle abilities → Pirate pile
    - All other Advancements → Mercantile pile
- [ ] Build Merchant ship coin flip simulator (Heads/Tails)
    - Tails = front side
    - Heads = back side + Legendary Achievement cube (no coins from Win condition)
- [ ] Visual display of both piles with card counts
- [ ] Explorer Achievement tracking (can explore multiple boards per turn)

##### Influence Cube Placement

- [ ] Interactive island/space selection tool
- [ ] Exception handling logic:
    - Islands with player Fort/Garrison/Ship in Pirate mode:
        - 1 cube placement = ignore
        - 2+ cube placements = trigger battle
    - Open sea or fully controlled spaces = ignore
- [ ] Visual feedback for valid/invalid placements
- [ ] Conditional cube placement handler (bottom centerline icon):
    - Scan for islands with wood/coins not controlled by Covenant
    - Exclude islands where player is in Pirate mode
    - Select island with most coins (tiebreaker: coins + wood total)
    - Place 2 cubes (may trigger Fort/Garrison battle)

##### End Position Handler

- [ ] Orange space position indicator
- [ ] Override logic if Ship sunk during turn (place in Harbor instead)

##### Conditional Effects (Centerline Icons)

- [ ] **Top centerline**: Player treasure check (3+ triggers attack even in Harbor)
- [ ] **Bottom centerline**: Island resource check (triggers 2 cube placement)
- [ ] Visual alerts when conditions are met
- [ ] Conditional effect execution before right-side effects

#### 2.2 Right Side Effects (Sequential Resolver)

Build sequential effect resolver that executes **left to right, top to bottom**:

##### Resource Effects

- [ ] **Coin Gain**: Direct coin addition to Covenant supply
- [ ] **Mercantile Income**: Calculate 1 coin per 2 Advancements in Mercantile pile (rounded down)
- [ ] **Production**:
    - Island production calculator
    - Highest production island selector
    - Support for 2 production icons (2 different islands)
    - Outpost bonus calculator
    - Open sea bonus tracker
    - Resources go directly to Covenant supply

##### Ship Upgrade System

- [ ] **Ship Upgrade Selector**: Choose specific upgrade tile
- [ ] Fallback logic: Any same-level tile if specific unavailable
- [ ] Track cannons gained from upgrades
- [ ] Elite Vessel Achievement tracker (4 upgrades)
- [ ] **Damage Repair**: Adjust damage counter by indicated amount

##### Building System

- [ ] **Building Placement Wizard**:
    - Priority: Highest value Covenant-controlled island without that building type
    - Tiebreaker: Highest combined wood/coin production
- [ ] Visual island selector
- [ ] Availability checker

##### Achievement Effects

- [ ] **Expert Sailors**: Place cube on achievement (if not already claimed)
- [ ] **Legendary Achievement**: Auto-increment on Merchant ship defeat (heads result)

##### Battle Triggers

- [ ] **Attack Flag**: Initiate battle with player
    - Support "+X cubes this battle" modifier
    - Support "If not in Harbor" conditional
    - Visual battle prompt
- [ ] **Merchant Ship Defeat**:
    - Merchant ship selector (any on board)
    - Allow player to choose for Covenant (or Covenant choice if specified)
    - Gain Advancement from back of card → Mercantile pile
    - Gain cube on Legendary Achievement (if not claimed)
    - No coins from Win condition

##### Special Effects

- [ ] **Delayed Resource Placement**: Schedule wood/coins for next turn
    - Place on controlled island AFTER turn ends
    - Visual marker for delayed resources
    - Alert player of opportunity to steal island
- [ ] **Conditional Actions**: "If X condition... otherwise..." handler
    - Example: "If 7+ cannons, attack; otherwise gain coins"
    - Condition evaluator with branching logic

---

### Phase 3: Battle System

#### 3.1 Covenant Cannon Calculator

- [ ] Base 1 cannon
- [ ] Add cannons from Ship Upgrade tiles
- [ ] Harbor defense bonus (+4 if defending in Harbor)
- [ ] Building bonuses on the space (+1 per building)
- [ ] Pirate pile calculation: +1 per 2 cannons/battle abilities (rounded down)
- [ ] Display total cannon count prominently
- [ ] Real-time cannon recalculation

#### 3.2 Battle Resolution UI

**Note**: Battles are resolved physically by the player. The app tracks outcomes only.

- [ ] Battle type selector:
    - Ship vs Ship
    - Ship vs Fort
    - Ship vs Garrison
- [ ] **Covenant cannon calculator** (display only):
    - Auto-calculate total Covenant cannons
    - Show breakdown: Base + Upgrades + Harbor + Buildings + Pirate pile
    - Large, prominent display for player reference
- [ ] **Battle outcome input**:
    - "Covenant won" / "Player won" toggle
    - If Covenant won:
        - Manual plunder input (wood + coins gained)
        - Auto-convert wood to coins (3:1 ratio)
        - Auto-add to Covenant supply
    - If Player won:
        - Manual Covenant damage input (how much damage dealt)
        - Auto-track if Covenant sunk (5 damage)
- [ ] **Sinking handler**:
    - If Covenant sunk: Auto-award Terror of the Sea to player, move Ship to Harbor
    - If Player sunk: Prompt to award Terror of the Sea to Covenant

#### 3.3 Multiple Battle Handler

Complex logic for multiple battles per turn:

- [ ] Battle sequencing rules:
    - **Rule 1**: Never battle Fort/Garrison same turn as attacking player
    - **Rule 2**: If player in Pirate mode AND Attack Flag: only resolve Attack Flag battle
    - **Rule 3**: Player in Pirate mode + Fort/Garrison battles: split cannons
- [ ] Cannon splitting calculator:
    - Half (rounded up) for each battle
    - First battle: Ship with half cannons
    - Second battle: Fort/Garrison with other half (only if won first)
    - Loss handling: Skip all future battles, don't place cubes
- [ ] Multiple building battles:
    - Only fight building on island with most coins
    - Tiebreaker: Island end-game coin values
- [ ] Sequential battle execution with victory checks between battles

#### 3.4 Sinking Mechanics

- [ ] **Covenant sinking handler**:
    - Transfer 5 coins to player
    - Override card end position: Place Ship in Harbor
    - Visual notification
- [ ] **Player sinking handler**:
    - Award Terror of the Sea Achievement to Covenant

---

### Phase 4: Resource Management

#### 4.1 Covenant Economy

Player will mark an island as controlled or not controlled by the Covenant. Player will also input any resources gained
from the islands that the Covenant produces on.
- [ ] End-of-turn resource collection:
    - Collect all wood from controlled islands
    - Collect all coins from controlled islands
- [ ] Automatic wood-to-coin converter (3 wood = 1 coin)
- [ ] Dock tile visual representation
- [ ] Public coin total display (always visible to player)
- [ ] Capitalist Achievement checker (30+ coins)

#### 4.2 Resource Production

- [ ] Production value calculator per island
- [ ] Outpost bonus integration
- [ ] Open sea bonus integration
- [ ] Highest production island algorithm
- [ ] Support for multi-island production (2 production icons = 2 islands)

#### 4.3 Delayed Resource System

- [ ] Resource scheduling for next turn
- [ ] Island marker showing delayed resources
- [ ] End-of-turn automatic placement
- [ ] Player alert: "You have 1 turn to steal this island"

---

### Phase 5: Difficulty System

#### 5.1 Difficulty Configuration

- [ ] Difficulty selector with 4 tiers:
    1. **Normal**: All 18 cards on Normal (blue) side
    2. **Hard**: 9 random cards on Hard (red), 9 on Normal (blue)
        - Shuffle separately, alternate in deck (odd turns = normal, even = hard)
    3. **Expert**: All 18 cards on Hard (red) side
    4. **Extreme**: Same as Expert + bonus cards
- [ ] Card-side assignment logic for deck building
- [ ] Visual difficulty indicator

#### 5.2 Extreme Mode Bonus Cards

- [ ] Bonus card trigger: After every 3rd card
- [ ] Same section resolver (bonus card uses same A/B section as prior card)
- [ ] Bonus card does NOT count as extra turn
- [ ] Visual indicator for bonus card execution
- [ ] Turn count adjustment logic

---

### Phase 6: Setup and Configuration

#### 6.1 Game Setup Wizard

- [ ] Welcome screen with game mode selection
- [ ] Player count selector: Solo or 2v2 Co-op
- [ ] Difficulty selector
- [ ] Initial resource assignment:
    - Covenant: 15 coins
    - Player: Based on game rules
- [ ] First turn indicator (Covenant always goes first in solo)
- [ ] Board orientation reminder: "Harbor should be on your left"
- [ ] Setup confirmation screen

#### 6.2 Achievement Reference

- [ ] Achievement requirements popup/panel
- [ ] Visual achievement cards with descriptions
- [ ] Progress indicators for incremental achievements
- [ ] Master Merchant exclusion note for Covenant

---

### Phase 7: 2-Player Co-op Mode (2v2)

**Status**: ⏸️ **Deferred** - Not part of initial MVP. Will be implemented after core solo mode is stable.

<details>
<summary>Click to expand Co-op mode tasks (for future reference)</summary>

#### 7.1 Co-op Setup

- [ ] 4-player game state initialization (2 players + 2 AI Covenants)
- [ ] Create 2 separate 9-card Covenant decks
- [ ] Random start player selector
- [ ] AI assignment to players (Player 1 → AI 1, Player 2 → AI 2)
- [ ] Turn order sequencer: AI 1 → Player 1 → AI 2 → Player 2
- [ ] Player turn flow: Resolve assigned AI, then own turn

#### 7.2 Co-op Player Rules

- [ ] Partner attack immunity (cannot attack partner's Ships/Buildings)
- [ ] Partner Ship Mercantile mode detection (on your turn)
- [ ] Garrison damage exclusion for partner Ships
- [ ] Partner cube replacement permission system
- [ ] Partner island protection override (with permission)
- [ ] Partner island production limit: Max 1 wood/coin added
- [ ] **Resource exchange system**:
    - Free exchange when Ships share Ocean board
    - Visual exchange interface
- [ ] **Shared damage repair**:
    - Available when Ships share Ocean board or Harbor
    - Repair allocation interface
- [ ] **Allied battle assistance**:
    - +2 battle cubes when Ships share Ocean board (NOT Harbor)
    - Plunder distribution choice (either Ship)
- [ ] Partner Sail/Cannon counting on controlled islands

#### 7.3 Co-op Covenant AI Rules

- [ ] Inter-AI cube replacement blocker
- [ ] Ally island control protection (never cause ally to lose control)
- [ ] Allied Fort/Garrison passthrough (don't block ally placement)
- [ ] Inter-AI attack immunity
- [ ] Inter-AI Garrison non-damage
- [ ] Cube replacement prioritization: Island controller's cubes first, then others
- [ ] **Attack targeting algorithm**:
    1. Exclude players in Harbor
    2. Calculate distance from AI start position
    3. Select closest player
    4. Tiebreaker: Most damage
    5. Tiebreaker: Coin flip

#### 7.4 Co-op End Game

- [ ] Deck reshuffling trigger: After turn 9
    - Shuffle all 18 cards
    - Create 2 new 9-card decks
    - Random redistribution
- [ ] Turn 10+ difficulty enforcement:
    - Hard mode: Use Hard (red) side for turn 10+
- [ ] End game trigger: ANY player or AI reaches 4 Achievements
- [ ] Last turn allocation
- [ ] **Team scoring**:
    - Add both players' scores
    - Add both AIs' scores
    - Team vs Team comparison
    - Tiebreaker: Total team cubes
- [ ] Victory screen with team breakdown

#### 7.5 Co-op Difficulty Adjustment

- [ ] Difficulty tier shift: Co-op is ~1 tier easier than solo
    - Normal Co-op = Easy
    - Hard Co-op = Normal
    - Expert Co-op = Hard
    - Extreme Co-op = Expert
- [ ] Difficulty recommendation system
- [ ] Visual indicator showing adjusted difficulty

</details>

---

### Phase 8: Quality of Life Features

#### 8.1 Turn Management

- [ ] Turn counter with visual progress
- [ ] Current player indicator (prominently displayed)
- [ ] End turn button with confirmation
- [ ] Turn history log (collapsible)
- [ ] Undo last action (within current turn only)
- [ ] Quick navigation: Jump to specific turn in history

#### 8.2 Reference System

- [ ] Rulebook quick reference panel (collapsible sidebar)
- [ ] Battle resolution flowchart
- [ ] Achievement requirements popup
- [ ] Card effect glossary with icons
- [ ] Difficulty comparison chart
- [ ] Multiple battles resolution guide
- [ ] FAQ section for common scenarios

#### 8.3 Visual Aids

- [ ] Board grid overlay matching card grids
- [ ] Color-coded action indicators:
    - Blue: Player actions
    - Red: Covenant actions
    - Yellow: Conditional effects
    - Green: Positive effects
- [ ] Card reveal animation
- [ ] Resource token graphics (coins, wood, cubes)
- [ ] Achievement progress bars
- [ ] Battle probability calculator (optional, for planning)

#### 8.4 State Persistence

- [ ] Save game functionality (manual)
- [ ] Load game functionality
- [ ] Auto-save every turn
- [ ] Multiple save slots (3-5 slots)
- [ ] Export game state (JSON)
- [ ] Import game state
- [ ] Save metadata: Date, turn, difficulty, mode

#### 8.5 Analytics and Insights

- [ ] Win/loss tracker by difficulty
- [ ] Average game length statistics
- [ ] Achievement earn rates (player vs Covenant)
- [ ] Battle success rates
- [ ] Covenant behavior patterns (most common actions)
- [ ] Personal best tracker

---

### Phase 9: Saga Expansion Support

**Status**: ⏸️ **Deferred** - Not part of initial MVP. Will be added after base game is complete.

<details>
<summary>Click to expand Saga expansion tasks (for future reference)</summary>

#### 9.1 Saga Content Handler

- [ ] Saga expansion toggle in setup
- [ ] **Fortune Encounter detection**: AI ignores these completely
- [ ] **Non-Merchant ship Encounter processor**:
    - Don't flip card
    - Place into Mercantile pile
- [ ] **Merchant ship Encounter processor** (from Saga):
    - Don't flip card
    - Place into Mercantile pile
- [ ] Visual indicator for Saga content

</details>

---

### Phase 10: Advanced Features (Polish & Enhancement)

#### 10.1 AI Behavior Insights

- [ ] Predicted next actions based on revealed card
- [ ] Threat assessment: Which islands are at risk
- [ ] Optimal player positioning suggestions
- [ ] Battle outcome probability calculator
- [ ] Achievement race tracker (who's closer to 4th achievement)

#### 10.2 Customization

- [ ] Custom difficulty builder (manual card side selection per card)
- [ ] House rule toggles (custom rule variants)
- [ ] Starting resource adjustment
- [ ] Achievement requirement modification
- [ ] Custom card creation/editing (advanced)

#### 10.3 Accessibility

- [ ] High contrast mode
- [ ] Screen reader support (ARIA labels)
- [ ] Keyboard navigation (all features accessible via keyboard)
- [ ] Font size adjustment (3 presets)
- [ ] Color blind friendly mode (patterns + colors)
- [ ] Tooltips and hints

#### 10.4 Mobile Optimization

- [ ] Responsive layout (mobile-first approach)
- [ ] Touch-friendly controls (larger tap targets)
- [ ] Offline mode (PWA)
- [ ] Quick action buttons (bottom navigation)
- [ ] Simplified mobile UI (hide advanced features)
- [ ] Landscape/portrait optimization

---

## Implementation Priority

### MVP (Minimum Viable Product)

**Goal: Playable solo game with basic features**

1. Core game state management (Phase 1.1)
2. Card deck system with drawing/revealing (Phase 1.2)
3. Basic turn tracker (Phase 8.1 - subset)
4. Achievement tracking (Phase 1.3)
5. Covenant resource management (Phase 4.1)
6. Simple battle calculator (Phase 3.1, 3.2)
7. Left-side effect handlers (Phase 2.1 - basic)
8. Right-side effect handlers (Phase 2.2 - core effects)
9. Difficulty selector (Phase 5.1 - Normal/Expert only)

### High Priority

**Goal: Complete solo experience with all rules**

1. Complete battle system with multiple battles (Phase 3.3)
2. Conditional effects system (Phase 2.1, 2.2)
3. Visual card display with grid (Phase 2.1)
4. Full difficulty system including Extreme mode (Phase 5)
5. End game detection and scoring (Phase 1.3)
6. Advancement pile management (Phase 2.1)
7. Delayed resource system (Phase 4.3)

### Medium Priority

**Goal: Enhanced UX and polish**

1. Reference system and help panels (Phase 8.2)
2. Save/load functionality (Phase 8.4)
3. Turn history and undo (Phase 8.1)
4. Visual aids and animations (Phase 8.3)
5. Improved manual input flows (streamlined forms)

### Low Priority

**Goal: Advanced features and expansions**

1. Analytics and statistics (Phase 8.5)
2. Custom difficulty and house rules (Phase 10.2)
3. AI behavior insights (Phase 10.1)
4. Advanced accessibility features (Phase 10.3)
5. Mobile optimization (Phase 10.4)

### Future Phases (Post-MVP)

**Goal: Expansions and multiplayer**

1. 2-player co-op mode (Phase 7 - complete)
2. Saga expansion support (Phase 9)
3. Online multiplayer features

---

## Technical Considerations

### Covenant Card Data
I will create a json file that holds the information for each of the 18 cards.

### Data Structures Needed

```typescript
// Card database
interface CovenantCard {
    id: number // 1-18
    normalSide: CardSide
    hardSide: CardSide
}

interface CardSide {
    leftEffects: {
        advancements: GridPosition[]
        influencePlacements: { position: GridPosition; count: number }[]
        endPosition: GridPosition
        conditionalTop?: ConditionalEffect
        conditionalBottom?: ConditionalEffect
    }
    rightEffects: Effect[]
    sections: Section[] // A, B, C for turn progression
}

// Game state
interface GameState {
    mode: 'solo' | 'coop'
    difficulty: 'normal' | 'hard' | 'expert' | 'extreme'
    turn: number
    currentPlayer: 'player' | 'covenant' | 'player1' | 'ai1' | 'player2' | 'ai2'
    covenant: {
        coins: number
        wood: number
        damage: number
        shipUpgrades: Upgrade[]
        achievements: AchievementProgress[]
        piratePile: Advancement[]
        mercantilePile: Advancement[]
    }
    player: {
        coins: number
        treasure: number
        damage: number
        achievements: AchievementProgress[]
    }
    deck: CovenantCard[]
    discardPile: CovenantCard[]
    currentCard?: CovenantCard
    delayedResources: DelayedResource[]
}
```

### Complex Logic Areas

1. **Multiple battle sequencing**: Requires state machine to track battle order, cannon splitting, and victory
   conditions between battles
2. **Conditional effect evaluation**: Need robust condition checker with fallback logic
3. **Island control validation**: Track cube counts, calculate control, validate placement exceptions
4. **Resource conversion**: Automatic 3:1 wood-to-coin with timing considerations
5. **Co-op turn order**: 4-entity sequencer with paired AI/player turns
6. **Extreme mode bonus cards**: Insert cards without incrementing turn counter

### User Experience Priorities

1. **Clear visual feedback**: Every action should have immediate visual response
2. **Minimize manual input**: Automate calculations wherever possible
3. **Helpful prompts**: Guide players through complex scenarios
4. **Accessible rules**: Reference material always one click away
5. **Guided vs Expert modes**: Support both new players and experienced players

---

## Design Patterns to Consider

- **State Machine**: For turn phases and battle resolution
- **Observer Pattern**: For achievement tracking and triggers
- **Strategy Pattern**: For difficulty-specific card behavior
- **Command Pattern**: For undo functionality
- **Factory Pattern**: For card and effect creation

---

## Testing Considerations

- [ ] Unit tests for all calculations (cannons, resources, probabilities)
- [ ] Integration tests for turn flow
- [ ] End-to-end tests for complete games
- [ ] Edge case testing (multiple battles, extreme mode, co-op)
- [ ] Rule validation against rulebook
- [ ] User testing for UX clarity

---

## Future Enhancements (Post-Launch)

- Multiplayer online co-op
- AI difficulty learning (adaptive difficulty)
- Campaign mode with persistent progression
- Integration with BoardGameGeek
- Video tutorial integration
- Community card variants
- Tournament mode
- Leaderboards

---

## Notes

- The Covenant has **unlimited cubes** (supplement with neutral if needed)
- Covenant always goes first in solo mode
- Covenant always wins ties in Ship vs Ship battles
- Player chooses for Covenant when multiple valid options exist
- Garrison damage: Only on end turn or battle (never takes 5th damage this way)
- Covenant can explore multiple Ocean boards per turn (unlike player)