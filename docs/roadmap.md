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

### Phase 5: Build Tool Migration (Current - In Progress)
**Goal**: Migrate from Webpack 2 to Vite for 10-100x faster dev experience + modern sass handling

**Prerequisites:**
- ✅ Legacy baseline working and tested (Node 14, Rosetta)
- ✅ Phase 4 skipped (will be handled by Vite)

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

### Phase 6: Framework Upgrade (Optional - High Risk)
**Goal**: Migrate Vue 2 → Vue 3 for long-term support and modern features

**Prerequisites:**
- ✅ Phase 5 completed (Phase 4 skipped)
- ✅ Comprehensive testing in place

**Changes:**
- 🎯 Update to Vue 3
- 🎯 Update Vuetify 0.x → Vuetify 3.x (major rewrite)
- 🎯 Update Vue Router 2 → Vue Router 4
- 🎯 Refactor Composition API (optional but recommended)
- 🎯 Update component syntax (Options API still supported)
- 🎯 Test all components for breaking changes

**Benefits:**
- ✅ Long-term support (Vue 2 EOL: Dec 2023)
- ✅ Better performance
- ✅ Composition API for better code organization
- ✅ Better TypeScript support
- ✅ Smaller bundle size
- ✅ Teleport, Suspense, and other modern features

**Effort**: 1-2 weeks  
**Risk**: High (Vuetify 0→3 is major breaking change)  
**Breaking Changes**: Many (requires component refactoring)

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

#### After Phase 6 (Future-Proof)
- **Framework**: Vue.js 3.x ✨ **NEW**
- **UI Library**: Vuetify 3.x ✨ **NEW**
- **Build Tool**: Vite 5.x
- **Styling**: SCSS via `sass`
- **API**: Composition API optional
- **Long-term Support**: ✅ Actively maintained

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

**Note**: This is OPTIONAL and HIGH EFFORT due to Vuetify 0→3 changes.

**Step 1: Upgrade Vue**
```bash
npm install vue@3 vue-router@4
npm install --save-dev @vitejs/plugin-vue
```

**Step 2: Upgrade Vuetify (BREAKING)**
```bash
npm install vuetify@3 @mdi/font
```

**Step 3: Update Vite Config**
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

**Step 4: Refactor Components**
- Update Vuetify components to v3 API (MAJOR breaking changes)
- Convert Options API → Composition API (optional)
- Update Vue Router syntax
- Test everything thoroughly

**Recommendation**: Only do Phase 6 if:
- ✅ Need long-term support
- ✅ Have time for extensive testing
- ✅ Willing to rewrite Vuetify components

Otherwise, Phase 5 alone provides 90% of the benefits with 10% of the effort.

## Migration Timeline

### Current Approach (Phase 4 Skipped)
```
Day 1-2: Phase 5 - Vite migration (includes Sass)
         Install Vite, migrate config, test
         
Day 3:   Deploy and monitor
         
Later:   Phase 6 (Vue 3) if needed
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

### Phase 5 Success Criteria (Includes Phase 4 Goals)
- ✅ Dev server starts in <3s (vs ~30s)
- ✅ HMR in <1s (vs 5-10s)
- ✅ Production build works
- ✅ All features functional
- ✅ No regressions
- ✅ No Rosetta terminal required
- ✅ No Python 2.7 required
- ✅ Builds on Node 18+ in ARM terminal
- ✅ Modern sass (Dart Sass) working

### Phase 6 Success Criteria
- ✅ Vue 3 running
- ✅ Vuetify 3 working
- ✅ All components updated
- ✅ Performance improved
- ✅ Bundle size smaller

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
| **5: Vite** | Medium (1-2d) | Medium | **Very High** | **Urgent** | 🔄 **IN PROGRESS** |
| **6: Vue 3** | High (1-2w) | High | Medium | Low | ⚠️ MAYBE |

**Updated Recommendation**: 
- ❌ **Phase 4 Skipped** - Doesn't work with Webpack 2
- ✅ **Do Phase 5 NOW** - Includes all Phase 4 benefits + massive DX improvement
- ⚠️ **Evaluate Phase 6 later** - Only if long-term support critical

**The winner**: **Phase 5 (Vite)** - Does everything Phase 4 promised + 10-100x faster dev experience.



