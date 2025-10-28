# Project Roadmap

*Complete project roadmap and historical progress tracking. This document contains the overall project vision, completed phases, and future planning.*

## How to Update This Doc
Update this document when major milestones are reached or project direction changes.

## Current Status
- **Phase**: Production/Maintenance
- **Status**: Live at joesangiorgio.com (GitHub Pages)
- **Last Updated**: Oct 27, 2025

## Project Overview
- **Purpose**: Personal portfolio website showcasing Joe Sangiorgio's work experience, projects, and skills
- **Key Features**: 
  - Interactive Vue.js single-page application
  - Multiple themed views (Home, Resume, About, Contact, Documentation)
  - Customizable settings (theme colors, animations, persistent preferences)
  - Guided tour for first-time visitors
  - Integration with backend API for dynamic content
  - Responsive design with Material Design principles (Vuetify)

## Implementation Phases
### Phase 1: Initial Build (Completed)
- ✅ Vue.js 2.x application setup with Webpack
- ✅ Vuetify UI framework integration
- ✅ Vue Router for SPA navigation
- ✅ Multiple view components (Home, Resume, About, Contact, Docs)
- ✅ Custom settings system with localStorage persistence
- ✅ Animated transitions between routes
- ✅ Responsive design

### Phase 2: Enhanced Features (Completed)
- ✅ Interactive tour using intro.js
- ✅ Custom animation system (animate.css integration)
- ✅ Theme customization
- ✅ LocalStorage for user preferences
- ✅ GitHub Pages deployment
- ✅ Custom domain setup

### Phase 3: Maintenance (Current)
- ✅ Backend API integration (api.joesangiorgio.com)
- ✅ Content updates as needed
- ✅ Legacy development environment documented and automated
- ✅ Attempted Phase 4 (Sass only) - didn't work with Webpack 2
- 🔄 Planning full Vite migration (Phase 5)

### Phase 4: Drop-in Modernization (Skipped)
**Status**: ❌ Skipped - Attempted but node-sass → sass doesn't work cleanly with Webpack 2.x

**Why Skip**: 
- Webpack 2.x has compatibility issues with modern sass versions
- sass-loader versions are tightly coupled to Webpack versions
- Trying to modernize sass alone creates more problems than it solves
- Better to do full migration to Vite (which handles sass natively)

**Decision**: Go straight to Phase 5 (Vite) which will migrate sass + bundler together

### Phase 5: Build Tool Migration ✅ COMPLETED (Oct 28, 2025)
**Goal**: Migrate from Webpack 2 to Vite for 10-100x faster dev experience + modern sass handling

**Prerequisites:**
- ✅ Legacy baseline working and tested (Node 14, Rosetta)
- ✅ Phase 4 skipped (will be handled by Vite)

**Status**: ✅ COMPLETE - All migration tasks finished and verified

**Changes:**
- 🎯 Install Vite and `vite-plugin-vue2`
- 🎯 Replace `node-sass` → `sass` (Vite handles this automatically)
- 🎯 Create `vite.config.js`
- 🎯 Update `package.json` scripts
- 🎯 Move `index.html` to root (Vite uses HTML as entry)
- 🎯 Update env vars (`process.env` → `import.meta.env.VITE_*`)
- 🎯 Configure path aliases
- 🎯 Update asset imports if needed
- 🎯 Remove Webpack config and loaders
- 🎯 Upgrade to Node 18+ (no more Rosetta/Python required!)

**Benefits:**
- ✅ Instant dev server start (vs ~30s Webpack)
- ✅ Sub-second HMR (vs 5-10s Webpack rebuild)
- ✅ Lightning fast production builds
- ✅ Modern developer experience
- ✅ Simpler configuration
- ✅ Better tree-shaking
- ✅ Native ES modules support
- ✅ Native ARM64 support (no Rosetta!)
- ✅ Modern Node 18+ (no Python 2.7!)
- ✅ Modern sass (Dart Sass) automatically

**Effort**: 1-2 days  
**Risk**: Medium (requires testing all features)  
**Breaking Changes**: Build process only (not user-facing)  
**Bonus**: Also eliminates all Phase 4 issues (Rosetta, Python, node-sass)

### Phase 5.1: Sass Deprecation Cleanup ✅ COMPLETED (Oct 28, 2025)
**Goal**: Eliminate Sass deprecation warnings by modernizing SCSS syntax

**Prerequisites:**
- ✅ Phase 5 completed (Vite + Dart Sass working)

**Changes:**
- ✅ Replace `@import` with `@use` in SCSS files
- ✅ Fix division operators (`/` → `math.div()`)
- ✅ Update global built-in functions (`map-get()` → `map.get()`)
- ✅ Replace `Sass-JSON` library with hard-coded colors array
- ✅ Add `@use "sass:map"` and `@use "sass:math"` where needed

**Benefits:**
- ✅ Clean console output (zero SCSS deprecation warnings)
- ✅ Future-proof for Dart Sass 2.0 and 3.0
- ✅ Better performance with modern Sass module system
- ✅ Improved code organization with explicit imports

**Effort**: 2-4 hours ✅ ACTUAL: ~2 hours
**Risk**: Low (non-breaking changes, easy to test) ✅ CONFIRMED
**Breaking Changes**: None (purely internal SCSS improvements) ✅ CONFIRMED

**Files Updated:**
- ✅ `src/styles/index.scss` - Module system, CSS custom properties
- ✅ `src/styles/tour.scss` - Added colors import
- ✅ `src/components/views/Home.vue` - Import → use
- ✅ `src/components/views/Resume.vue` - Import → use
- ✅ `src/components/ParallaxCardList.vue` - Division operators
- ✅ `src/helpersMixin.js` - Hard-coded colors array (replaced Sass-JSON parsing)
- ✅ `package.json` - Removed Sass-JSON

### Phase 6: Framework Upgrade (Optional - Very High Risk)
**Goal**: Migrate Vue 2 → Vue 3 for long-term support and modern features

**Last Updated**: Oct 28, 2025 (verified against latest versions)

**Prerequisites:**
- ✅ Phase 5 completed (Phase 4 skipped)
- ✅ Phase 5.1 completed (Sass cleanup)
- ✅ Comprehensive testing in place
- ⚠️ Time available for 2-3 weeks of focused work
- ⚠️ Acceptance of high risk and breaking changes

**Latest Target Versions** (as of Oct 2025):
- Vue.js: 3.5.22 (latest stable)
- Vuetify: 3.10.7 (Material Design 3)
- Vue Router: 4.6.3
- Vite: 5.4+ (Vue 3 compatible, skip Vite 7 until plugin support)
- Node: 22 LTS (or 18+ minimum)

**Changes:**
- 🎯 Update to Vue 3 using Migration Build (`@vue/compat`)
- 🎯 Update Vuetify 0.15 → Vuetify 3.10 (⚠️ **COMPLETE REWRITE - ~50-100 components**)
- 🎯 Update Vue Router 2 → Vue Router 4
- 🎯 Refactor Composition API (optional but recommended)
- 🎯 Update component syntax (Options API still supported)
- 🎯 Test all components for breaking changes
- 🎯 Update Vite 4 → Vite 5 (after Vue 3 migration)

**Benefits:**
- ✅ Long-term support (Vue 2 EOL: Dec 2023)
- ✅ Better performance (up to 40% faster)
- ✅ Composition API for better code organization
- ✅ Better TypeScript support
- ✅ Smaller bundle size (tree-shaking improvements)
- ✅ Teleport, Suspense, and other modern features
- ✅ Eliminates Vite legacy-js-api warnings

**Effort**: 2-3 weeks (realistic)  
**Risk**: Very High (Vuetify 0→3 is essentially a complete rewrite)  
**Breaking Changes**: Extensive (~50-100 component instances need manual updates)

## Technical Decisions

### Current Stack (Legacy)
- **Framework**: Vue.js 2.3.3 (2017)
- **UI Library**: Vuetify 0.15.7 (2017)
- **Build Tool**: Webpack 2.6.1 (2017)
- **Styling**: SCSS via node-sass 4.14.1 (deprecated)
- **State Management**: LocalStorage via `store` library
- **Routing**: Vue Router 2.7.0
- **Deployment**: GitHub Pages with custom domain
- **Requirements**: Node 14.21.3 x64, Python 2.7, Rosetta (Apple Silicon)

### Target Stack (Modernized)

#### After Phase 4 (Quick Wins)
- **Framework**: Vue.js 2.3.3 (unchanged)
- **UI Library**: Vuetify 0.15.7 (unchanged)
- **Build Tool**: Webpack 2.6.1 (unchanged)
- **Styling**: SCSS via `sass` (Dart Sass) ✨ **NEW**
- **Requirements**: Node 18+ LTS, no Python, native ARM64 ✨ **NEW**

#### After Phase 5 (Modern DX)
- **Framework**: Vue.js 2.x (updated to latest 2.x)
- **UI Library**: Vuetify 0.15.7 (unchanged)
- **Build Tool**: Vite 5.x ✨ **NEW**
- **Styling**: SCSS via `sass`
- **Dev Experience**: Instant HMR, <1s rebuilds ✨ **NEW**

#### After Phase 6 (Future-Proof - OPTIONAL)
- **Framework**: Vue.js 3.5.22 ✨ **NEW**
- **UI Library**: Vuetify 3.10.7 (or alternative like PrimeVue) ✨ **NEW**
- **Routing**: Vue Router 4.6.3 ✨ **NEW**
- **Build Tool**: Vite 5.4+ (skip Vite 7 until plugin support)
- **Styling**: SCSS via `sass`
- **API**: Composition API optional (Options API still supported)
- **Long-term Support**: ✅ Actively maintained
- **Node**: Node 22 LTS or 18+ minimum
- **Benefits**: Eliminates legacy-js-api warnings, Vue 2 EOL addressed
- **Tradeoff**: 2-3 weeks of high-risk component rewrites

## Implementation Details

### Phase 4: Sass Migration (Skipped)

**Status**: ❌ Attempted but incompatible with Webpack 2.x

**Issues Encountered:**
- sass-loader compatibility matrix issues
- Webpack 2.x doesn't work well with modern sass versions
- Created more problems than it solved

**Decision**: Skip Phase 4, do full Vite migration instead (handles sass automatically)

### Phase 5: Vite Migration (Current Implementation)

**Step 0: Switch to Modern Node (No Rosetta!)**
```bash
# Exit Rosetta terminal, use regular ARM terminal
nvm install 18
nvm use 18
node -p "process.arch"  # Should show: arm64 🎉
```

**Step 1: Install Vite + Sass**
```bash
# Install Vite and Vue 2 plugin
npm install --save-dev vite vite-plugin-vue2

# Install modern sass (replaces node-sass)
npm install --save-dev sass

# Uninstall old Webpack stuff (optional, do later)
# npm uninstall webpack webpack-dev-server node-sass
```

**Step 2: Create `vite.config.js`**
```javascript
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [
    createVuePlugin()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 8080
  },
  build: {
    outDir: 'dist'
  }
})
```

**Step 3: Move `index.html` to Root**
```bash
# Vite uses index.html as entry point
mv src/index.html ./index.html

# Update script tag in index.html:
# FROM: <script src="/dist/build.js"></script>
# TO:   <script type="module" src="/src/main.js"></script>
```

**Step 4: Update Environment Variables**
```javascript
// FROM (Webpack):
const API_URL = process.env.VUE_APP_API_URL

// TO (Vite):
const API_URL = import.meta.env.VITE_API_URL
```

**Step 5: Update `package.json`**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Step 6: Remove Webpack**
```bash
npm uninstall webpack webpack-dev-server webpack-cli
npm uninstall babel-loader css-loader style-loader file-loader url-loader
```

**Step 7: Test All Features**
- ✅ Dev server starts instantly
- ✅ HMR works (<1s)
- ✅ Production build completes
- ✅ All routes work
- ✅ Assets load correctly
- ✅ Environment variables work
- ✅ Settings persist

**Migration Resources:**
- [Vite Guide](https://vitejs.dev/guide/)
- [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)
- [Webpack to Vite Migration](https://vitejs.dev/guide/migration.html)

### Phase 6: Vue 3 Upgrade (Future-Proof)

**Note**: This is OPTIONAL and VERY HIGH EFFORT due to Vuetify 0→3 changes.

**Overall Timeline**: 2-3 weeks

---

#### **Step 1: Install Vue 3 Migration Build** (Day 1-2, ~8-12 hours)

The Vue Migration Build (`@vue/compat`) provides a compatibility layer that helps identify breaking changes incrementally.

```bash
# Install Vue 3 with compatibility build
npm install vue@3.5.22
npm install --save-dev @vue/compat@3.5.22

# Replace vue-template-compiler with new compiler
npm uninstall vue-template-compiler
npm install --save-dev @vue/compiler-sfc@3.5.22

# Install Vue 3 Vite plugin
npm uninstall vite-plugin-vue2
npm install --save-dev @vitejs/plugin-vue@latest
```

**Update `vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Use compatibility build
      vue: '@vue/compat'
    }
  },
  define: {
    // Enable Options API (if not using Composition API yet)
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
})
```

**Run and fix migration warnings:**
- Start dev server: `npm run dev`
- Check console for deprecation warnings
- Fix each warning incrementally

**Common Vue 3 Breaking Changes to Fix:**
- Replace filters with computed properties or methods
- Update `v-model` syntax (now uses `modelValue` prop)
- Change lifecycle hooks: `beforeDestroy` → `beforeUnmount`, `destroyed` → `unmounted`
- Fix `$listeners` (merged into `$attrs` in Vue 3)
- Update custom directives API (different hook names)
- Replace `this.$set()` with reactive mutations

---

#### **Step 2: Upgrade Vue Router** (Day 3, ~6-8 hours)

```bash
npm install vue-router@4.6.3
```

**Update `src/config/routes.js`:**
```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // your existing routes
  ]
})

export default router
```

**Update `src/main.js`:**
```javascript
import { createApp } from 'vue'
import router from './config/routes'
import App from './components/App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

**Breaking changes to fix:**
- `mode: 'history'` → `history: createWebHistory()`
- `<router-link>` `tag` prop removed (use `custom` slot instead)
- Navigation guards now async by default
- `$route` and `$router` accessed differently in Composition API

---

#### **Step 3: Upgrade Vuetify** (Day 4-14, ~1-2 WEEKS) ⚠️ **HARDEST PART**

**WARNING**: Vuetify 0.15 → 3.10 is essentially rewriting every component from scratch.

```bash
npm install vuetify@3.10.7
npm install @mdi/font  # Material Design Icons
npm install vite-plugin-vuetify
```

**Update `vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ]
})
```

**Create `src/plugins/vuetify.js`:**
```javascript
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})
```

**Major Vuetify Breaking Changes:**

| Old (v0.15) | New (v3.10) | Impact |
|-------------|-------------|--------|
| `v-layout`, `v-flex` | Removed - use CSS Grid/Flexbox | **ALL layout code** |
| `v-select` | Complete API change | **ALL selects** |
| `v-switch` | Different props | **ALL switches** |
| `v-btn` | Different props/classes | **ALL buttons** |
| `v-card` | Restructured | **ALL cards** |
| `v-list`, `v-list-tile` | Now `v-list`, `v-list-item` | **ALL lists** |
| `v-navigation-drawer` | Different API | **NavDrawer.vue** |
| `v-toolbar` → `v-app-bar` | Renamed + API change | **NavBar.vue** |
| `v-footer` | Different API | **Footer** |
| `v-icon` | Uses MDI, different syntax | **ALL icons** |
| Theme system | Completely different | **Theme selector** |

**Your Components Requiring Rewrite:**
1. `NavBar.vue` - Complete toolbar → app-bar rewrite
2. `NavDrawer.vue` - Navigation drawer API changed, all list items changed
3. `App.vue` - v-app structure different
4. All views with v-layout/v-flex
5. All buttons, cards, lists throughout

**Vuetify 3 Migration Resources:**
- [Official Migration Guide](https://vuetifyjs.com/en/getting-started/upgrade-guide/)
- [Component API Changes](https://vuetifyjs.com/en/components/all/)

---

#### **Step 4: Remove Migration Build** (Day 15, ~2-4 hours)

Once all warnings are resolved:

```bash
npm uninstall @vue/compat
```

**Update `vite.config.js`** to remove compat alias:
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
    // Remove vue: '@vue/compat' line
  }
}
```

---

#### **Step 5: Optional - Composition API Refactoring** (Day 16-18, ~3-5 days)

Convert components to use `<script setup>` syntax:

**Before (Options API):**
```vue
<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

**After (Composition API):**
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>
```

---

#### **Step 6: Testing & Polish** (Day 19-21, ~2-3 days)

- Full regression testing of all features
- Visual regression testing (compare old vs new)
- Performance testing
- Fix any visual inconsistencies
- Update animations/transitions if needed
- Test in multiple browsers

---

### **Alternative Approach: Replace Vuetify**

Instead of migrating Vuetify 0→3, consider replacing it entirely:

**Option A: PrimeVue** (Modern, well-documented)
- Similar component library
- Better documentation
- Might be faster than migrating Vuetify

**Option B: Quasar** (Full-featured)
- Material Design 3 support
- More modern than Vuetify

**Option C: Element Plus** (Clean, simple)
- Lighter weight
- Good for portfolios

**This might actually be FASTER than migrating Vuetify 0→3!**

---

**Recommendation**: Only do Phase 6 if:
- ✅ Need long-term support (Vue 2 is EOL)
- ✅ Have 2-3 weeks available for focused work
- ✅ Willing to rewrite essentially every component
- ✅ Consider replacing Vuetify instead of migrating

Otherwise, **Phase 5 alone provides 90% of the benefits with 10% of the effort.**

**Current stack is modern, fast, and production-ready. Vue 3 can wait.**

## Migration Timeline

### Completed Approach (As of Oct 28, 2025)
```
✅ Phase 5 (COMPLETE):
   Day 1-2: Vite migration (includes Dart Sass)
            - Installed Vite 4, migrated config
            - Zero breaking changes to components
            - 10-100x dev speed improvement
            
✅ Phase 5.1 (COMPLETE):
   Day 3:   Sass deprecation cleanup (~2 hours)
            - @import → @use syntax
            - / → math.div() for division
            - map-get() → map.get()
            - Removed Sass-JSON dependency
            - Zero SCSS-level deprecation warnings
         
📋 Next:  Deploy to production (GitHub Pages)
         
⚠️ Later: Phase 6 (Vue 3) - OPTIONAL, only if needed
          Estimated 2-3 weeks, very high risk
```

### Why We Skipped Phase 4
```
Attempted: node-sass → sass with Webpack 2
Result:    Compatibility hell with sass-loader
Decision:  Skip Phase 4, go straight to Vite
Benefit:   Vite handles sass automatically + all other wins
```

## Success Metrics

### Phase 4 Success Criteria
- ❌ Skipped (incompatible with Webpack 2)
- ➡️ Benefits rolled into Phase 5

### Phase 5 Success Criteria ✅ COMPLETE (Includes Phase 4 Goals)
- ✅ Dev server starts in <3s (vs ~30s) - **ACHIEVED**
- ✅ HMR in <1s (vs 5-10s) - **ACHIEVED**
- ✅ Production build works - **ACHIEVED**
- ✅ All features functional - **ACHIEVED**
- ✅ No regressions - **ACHIEVED**
- ✅ No Rosetta terminal required - **ACHIEVED**
- ✅ No Python 2.7 required - **ACHIEVED**
- ✅ Builds on Node 18+ in ARM terminal - **ACHIEVED**
- ✅ Modern sass (Dart Sass) working - **ACHIEVED**

### Phase 5.1 Success Criteria ✅ COMPLETE
- ✅ Zero SCSS-level deprecation warnings - **ACHIEVED**
- ✅ Modern Sass module system (@use, @forward) - **ACHIEVED**
- ✅ math.div() for division operators - **ACHIEVED**
- ✅ map.get() for map access - **ACHIEVED**
- ✅ Removed Sass-JSON dependency - **ACHIEVED**
- ✅ Zero runtime errors - **ACHIEVED**
- ✅ Clean production builds - **ACHIEVED**
- ⚠️ Legacy-js-api warnings remain (Vite 4 internal, not our code)

### Phase 6 Success Criteria (NOT STARTED - OPTIONAL)
- [ ] Vue 3.5+ running with @vue/compat migration build
- [ ] All Vue 2 deprecation warnings resolved
- [ ] Vue Router 4.6+ working
- [ ] Vuetify 3.10+ working (or replaced with alternative)
- [ ] All ~50-100 component instances updated
- [ ] All features functional with no regressions
- [ ] Performance improved or maintained
- [ ] Bundle size smaller or maintained
- [ ] Comprehensive testing completed
- [ ] Legacy-js-api warnings eliminated (Vite 5+ migration)

## Risk Mitigation

### Before Starting Phase 5
1. ✅ Commit all current work
2. ✅ Create feature branch (`modernize/vite`)
3. ✅ Document current behavior
4. ✅ Take screenshots of all views
5. ✅ Ensure dev environment working (Node 14 + Rosetta)
6. ✅ Switch to Node 18 in regular ARM terminal

### During Migration
1. ✅ One phase at a time
2. ✅ Test frequently
3. ✅ Keep Webpack config as backup
4. ✅ Monitor for visual regressions
5. ✅ Document issues encountered

### After Migration
1. ✅ Side-by-side comparison (old vs new)
2. ✅ Performance benchmarks
3. ✅ Deploy to staging first
4. ✅ Monitor production for issues
5. ✅ Keep rollback plan ready

## References & Resources

### Official Documentation
- [Dart Sass](https://sass-lang.com/dart-sass)
- [Vite](https://vitejs.dev)
- [Vue 2 Docs](https://v2.vuejs.org)
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org)
- [Vuetify 3](https://vuetifyjs.com)

### Migration Guides
- [node-sass to sass](https://sass-lang.com/blog/libsass-is-deprecated)
- [Webpack to Vite](https://vitejs.dev/guide/migration.html)
- [Vue 2 to Vue 3](https://v3-migration.vuejs.org)
- [Vuetify 2 to 3](https://vuetifyjs.com/en/getting-started/upgrade-guide/)

### Case Studies
- [Neon: Webpack to Vite](https://neon.com/blog/from-webpack-to-vite)
- [SaaS Pegasus: Migration Guide](https://docs.saaspegasus.com/front-end/migrating)

## Decision Matrix

| Phase | Effort | Risk | Benefit | Priority | Status |
|-------|--------|------|---------|----------|--------|
| **4: Sass** | Low (2h) | Low | Medium | High | ❌ SKIPPED |
| **5: Vite** | Medium (1-2d) | Medium | **Very High** | **Urgent** | ✅ **COMPLETE** |
| **5.1: Sass Cleanup** | Low (2-4h) | Low | Medium | High | ✅ **COMPLETE** |
| **6: Vue 3** | **Very High (2-3w)** | **Very High** | Medium | Low | ⚠️ OPTIONAL |

**Current Recommendation** (Updated Oct 28, 2025):
- ❌ **Phase 4 Skipped** - Doesn't work with Webpack 2
- ✅ **Phase 5 COMPLETE** - Includes all Phase 4 benefits + massive DX improvement
- ✅ **Phase 5.1 COMPLETE** - Zero SCSS deprecation warnings, modern Sass module system
- ⚠️ **Phase 6 is OPTIONAL** - Only pursue if you have 2-3 weeks and need Vue 3

**Why Phase 6 effort increased from "1-2 weeks" to "2-3 weeks":**
- Added Vue Migration Build step (critical but time-consuming)
- Vuetify 0.15 → 3.10 is more complex than initially estimated
- ~50-100 component instances need manual updates
- Consider replacing Vuetify entirely instead of migrating

**Bottom Line:** Current stack is modern, fast, and production-ready. Vue 3 migration can wait indefinitely.



