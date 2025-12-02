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

- [ ] **Implement Card Grid Layout**
  - [ ] Create responsive grid container
  - [ ] Use CSS Grid or Flexbox for card layout
  - [ ] Define breakpoints for mobile, tablet, desktop
  - [ ] Set appropriate gap/spacing between cards

- [ ] **Add Game Images**
  - [ ] Determine image source/storage location
  - [ ] Implement image loading with fallback
  - [ ] Optimize image sizes for performance
  - [ ] Add alt text for accessibility

- [ ] **Style Cards**
  - [ ] Design card appearance (borders, padding, background)
  - [ ] Set typography for name and description
  - [ ] Ensure consistent card heights or allow flexible heights
  - [ ] Apply border-radius for rounded corners

- [ ] **Implement Hover Effects**
  - [ ] Add subtle box-shadow on hover
  - [ ] Include smooth transition animation
  - [ ] Optional: slight scale or lift effect
  - [ ] Ensure cursor changes to pointer

- [ ] **Connect to Navigation**
  - [ ] Link cards to respective helper pages/routes
  - [ ] Implement onClick navigation handlers
  - [ ] Ensure proper routing setup

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

