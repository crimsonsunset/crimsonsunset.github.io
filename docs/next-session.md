# Next Session Planning

*This is a working document for active session planning and immediate priorities. Update this document throughout development sessions to track progress and plan next steps.*

## Current Session Goals
- [x] Initial documentation structure created
- [x] Comprehensive codebase analysis completed
- [x] Documented legacy dev environment setup (Rosetta + Python 2.7 + Node 8)
- [x] Created environment verification script

## Immediate Priorities
- [ ] Get dev environment running in Rosetta terminal
- [ ] Verify site builds and runs locally
- [ ] Plan modernization strategy
- [ ] Create migration roadmap

## Progress Log

### Oct 27, 2025 - Session: Documentation & Environment Setup
**Completed:**
- Created documentation structure (`docs/`, `docs/system/`)
- Generated comprehensive codebase analysis (see chat history)
- Reverse-engineered legacy dev setup requirements:
  - **Issue**: node-sass 4.5.0 requires x86 architecture, Python 2.7, Node 8.x
  - **Solution**: Rosetta terminal + pyenv + nvm
- Created setup documentation: `docs/system/legacy-dev-setup.md`
- Created environment check script: `scripts/check-env.sh`
- Added `.nvmrc` (8.17.0) and `.python-version` (2.7.18)
- Added `npm run check-env` command
- Updated README with Apple Silicon setup instructions
- Created proper `.gitignore`

**Current State:**
- Currently in ARM64 terminal (won't work for legacy deps)
- Need to switch to Rosetta terminal to continue
- pyenv: ✅ Python 2.7.18 available
- nvm: ✅ Node 8.17.0 available

## Next Steps

### Immediate (Next 5 minutes)
1. [ ] Open Terminal with Rosetta
2. [ ] Run `npm run check-env` to verify
3. [ ] Run `npm install` (may take 5-10 min)
4. [ ] Run `npm start` to verify site works
5. [ ] Document any issues encountered

### Short Term (This Session)
1. [ ] Verify all routes work locally
2. [ ] Test build process (`npm run build`)
3. [ ] Check for runtime errors in browser console
4. [ ] Document current functionality baseline

### Planning Phase (Before Modernization)
1. [ ] Identify critical features to preserve
2. [ ] Research modern equivalents for dependencies:
   - node-sass → sass (Dart Sass)
   - Webpack 2 → Vite
   - Vue 2 → Vue 3
   - Vuetify 0.15 → Vuetify 3
3. [ ] Create migration strategy document
4. [ ] Decide: incremental migration vs. fresh rewrite?

## Notes & Decisions

### Technical Debt Identified
- **Critical**: node-sass 4.5.0 (requires Python 2.7, x86, ancient Node)
- **High**: All dependencies 4-5 years old (security concerns)
- **Medium**: Webpack 2 → should be Webpack 5 or Vite
- **Medium**: Vue 2 → Vue 3 migration needed
- **Low**: No TypeScript
- **Low**: No tests

### Architecture Findings
- Well-structured component architecture
- Good separation of concerns
- Reusable patterns (helpers mixin)
- Configuration-driven routing
- LocalStorage for user preferences

### Modernization Philosophy
Per the README, this site is intentionally over-engineered as a showcase. Any modernization should:
1. Maintain the "fun" factor
2. Keep customization features
3. Preserve interactive tour
4. Update to modern best practices
5. Improve performance
6. Enable easier maintenance

### Blockers
- **Immediate**: Must use Rosetta terminal for legacy deps
- **Short term**: node-sass prevents using modern Node
- **Long term**: Complete dependency refresh needed
