# UI Updates

This document tracks tasks for improving the UI design.

## Board Game Helpers List Design

### Design Specifications
- **Layout**: Card grid layout (responsive)
- **Card Content**:
  - Game image (header/background)
  - Helper name (heading)
  - Description text
- **Interactions**:
  - Clickable cards to open helper tool
  - Subtle shadow/elevation on hover
  - Responsive grid adaptation

### Implementation Tasks

- [x] **Create Card Component**
  - [x] Build reusable card component for helpers
  - [x] Include props: name, image, description, onClick handler
  - [x] Structure: image container, title, description text

- [x] **Implement Card Grid Layout**
  - [x] Create responsive grid container
  - [x] Use CSS Grid or Flexbox for card layout
  - [x] Define breakpoints for mobile, tablet, desktop
  - [x] Set appropriate gap/spacing between cards

- [x] **Add Game Images**
  - [x] Determine image source/storage location
  - [x] Implement image loading with fallback
  - [x] Optimize image sizes for performance
  - [x] Add alt text for accessibility

- [x] **Style Cards**
  - [x] Design card appearance (borders, padding, background)
  - [x] Set typography for name and description
  - [x] Ensure consistent card heights or allow flexible heights
  - [x] Apply border-radius for rounded corners

- [x] **Implement Hover Effects**
  - [x] Add subtle box-shadow on hover
  - [x] Include smooth transition animation
  - [x] Optional: slight scale or lift effect
  - [x] Ensure cursor changes to pointer

- [x] **Connect to Navigation**
  - [x] Link cards to respective helper pages/routes
  - [x] Implement onClick navigation handlers
  - [x] Ensure proper routing setup

- [ ] **Test Responsiveness**
  - [ ] Verify layout on mobile devices
  - [ ] Check tablet breakpoints
  - [ ] Test desktop wide screens
  - [ ] Adjust grid columns per breakpoint

- [ ] **Accessibility Review**
  - [ ] Add proper ARIA labels
  - [ ] Ensure keyboard navigation works
  - [ ] Test screen reader compatibility
  - [ ] Add focus states for keyboard users

- [ ] **Polish & Refinements**
  - [ ] Review spacing and alignment
  - [ ] Ensure consistent visual hierarchy
  - [ ] Test with actual content
  - [ ] Gather feedback and iterate

