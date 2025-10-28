# Manual Visual Regression Test Checklist

**Date**: October 28, 2025  
**Migration**: Phase 5 (Vite)  
**Test Against**: Production build at `http://localhost:4173`

## Critical Features

### Home Page (`/`)
- [ ] Hero section displays correctly with animated text
- [ ] "Hi, I'm Joe" heading visible
- [ ] Animated typing effect works ("I build Web Applications" cycles)
- [ ] "Who?" and "Tell me more!" buttons display and are clickable
- [ ] Tour dialog appears on first visit
- [ ] Footer with GitHub and LinkedIn icons displays
- [ ] All animations trigger on scroll/load

### Resume Page (`/Resume`)
- [ ] Five tabs visible: Experience, Projects, Skills, References, Education
- [ ] **Experience tab**: Marvel, Rutgers, ScrollMotion cards display
- [ ] **Projects tab**: Project cards with company logos display
- [ ] **Skills tab**: Skill icons grid displays correctly (isotope layout)
- [ ] **References tab**: LinkedIn recommendations display
- [ ] **Education tab**: Educational background displays
- [ ] Smooth transitions between tabs
- [ ] All images and logos load correctly

### About Page (`/About`)
- [ ] Content displays correctly
- [ ] Any images or media elements load
- [ ] Layout is responsive

### Contact Page (`/Contact`)
- [ ] Contact form displays
- [ ] Form fields are functional
- [ ] Submit functionality works (if implemented)

### Documentation Page (`/Documentation`)
- [ ] API documentation displays
- [ ] Code samples render correctly

## Navigation & UI

### Drawer (Sidebar)
- [ ] Opens when clicking menu icon
- [ ] Closes when clicking outside or escape key
- [ ] All navigation links work:
  - [ ] Home
  - [ ] Resume
  - [ ] About
  - [ ] Contact
  - [ ] API Documentation
- [ ] Settings section displays:
  - [ ] Theme color selector
  - [ ] Animation selector
  - [ ] Toggle switches (Return to Top, Remember Settings, Remember Location, Show Info Button)
- [ ] "Start the Tour!" button works

### Theme Customization
- [ ] Theme color dropdown shows all colors (red, pink, purple, indigo, blue, cyan, teal, green, etc.)
- [ ] Selecting a theme updates the UI immediately
- [ ] Selected theme persists after page reload (if "Remember Settings" enabled)

### Animation Customization
- [ ] Animation dropdown shows options (fadeInUp, fadeIn, etc.)
- [ ] Selecting animation updates transitions
- [ ] Selected animation persists after page reload (if "Remember Settings" enabled)

### Settings Toggles
- [ ] "Return To Top" button appears when enabled
- [ ] "Remember Settings" persists theme/animation choices
- [ ] "Remember Location" returns to last visited page
- [ ] "Show Info Button" displays help icon in navbar

### Interactive Tour
- [ ] Tour starts when clicking "Start the Tour!" or help icon
- [ ] Tour steps progress correctly
- [ ] Tour highlights correct UI elements
- [ ] Tour can be skipped
- [ ] Tour completes and dismisses

## Routing & Browser Features

- [ ] All routes work with direct URL access
- [ ] Browser back/forward buttons work correctly
- [ ] Page titles update per route
- [ ] 404 page displays for invalid routes (if implemented)
- [ ] URL hash fragments work (e.g., `/Resume#Experience`)

## Build Info & Console

- [ ] Console shows build information:
  - [ ] Project name and version
  - [ ] Build environment (PRODUCTION)
  - [ ] Build timestamp
  - [ ] GitHub repository link
- [ ] No console errors (warnings acceptable)
- [ ] Vue DevTools message appears (if installed)

## Performance

- [ ] Initial page load < 3 seconds
- [ ] Route transitions are smooth
- [ ] No janky animations or layout shifts
- [ ] Images load progressively
- [ ] Site is responsive on different screen sizes

## LocalStorage Features

- [ ] Settings persist when "Remember Settings" enabled
- [ ] Last route persists when "Remember Location" enabled
- [ ] Settings clear when toggles disabled

## Assets & Resources

- [ ] All images load successfully
- [ ] All icons display correctly
- [ ] Fonts load (Roboto, Material Icons)
- [ ] SVG icons render properly
- [ ] Company logos display on Resume/Projects

## Browser Compatibility (if testing multiple browsers)

- [ ] Chrome/Edge: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work

## Known Issues / Acceptable Warnings

- ✅ Sass deprecation warnings in build output (legacy @import syntax)
- ✅ intro.js deprecation warning about require usage
- ✅ Vue DevTools extension message

## Regression Checks

Compare against legacy Webpack build (if available):

- [ ] Visual appearance matches
- [ ] All features still work
- [ ] Performance is same or better
- [ ] No functionality lost

## Sign-Off

- **Tester**: ___________
- **Date**: ___________
- **Result**: PASS / FAIL
- **Notes**: ___________

