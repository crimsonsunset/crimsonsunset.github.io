# Legacy Development Setup (Apple Silicon)

**Last Updated**: October 28, 2025

## The Problem

This codebase uses **node-sass v4.14.1** which:
- Requires Python 2.7 (for node-gyp)
- Requires Node 14.x (NOT 16+) - node-sass 4.x is incompatible with Node 16's V8 engine
- Has native x86 bindings that won't compile on ARM64 (Apple Silicon)
- Requires the **x64 (Intel) version** of Node.js, even in Rosetta

## The Solution

### Prerequisites
- ✅ pyenv installed (`brew install pyenv`)
- ✅ nvm installed
- ✅ Rosetta 2 installed (`softwareupdate --install-rosetta`)
- ✅ Xcode Command Line Tools (`xcode-select --install`)

### Step 1: Create a Rosetta Terminal

**Option A: Duplicate Terminal App (Recommended)**
```bash
# In Finder, navigate to /Applications/Utilities/
# Duplicate Terminal.app
# Rename to "Terminal (Rosetta).app"
# Right-click → Get Info → Check "Open using Rosetta"
```

**Option B: Temporarily Run in Rosetta**
```bash
arch -x86_64 zsh
```

### Step 2: Verify You're in x86 Mode
```bash
arch
# Should output: i386
```

### Step 3: Install Python 2.7 (if not already installed)
```bash
pyenv install 2.7.18
pyenv local 2.7.18  # Sets Python 2.7 for this project only
python --version    # Should show: Python 2.7.18
```

**Important**: Use `pyenv local` (not `global`) to avoid affecting other projects.

### Step 4: Install Node 14.21.3 (x64 version)

**CRITICAL**: You MUST use the `--arch=x64` flag:

```bash
# Install x64 (Intel) version of Node
nvm install 14.21.3 --arch=x64

# Use it
nvm use 14.21.3

# Verify architecture
node -p "process.arch"  # Should output: x64 (NOT arm64)
node --version          # Should output: v14.21.3
```

**Why `--arch=x64`?** Without this flag, nvm installs the ARM64 version of Node even in a Rosetta terminal. The ARM64 Node then compiles node-sass for ARM64, which fails.

### Step 5: Clean Install Dependencies
```bash
# Clean everything
npm cache clean --force
rm -rf node_modules package-lock.json

# Install with Python 2.7 and Node 14.x in Rosetta terminal
npm install
```

The install will take 3-5 minutes as node-sass compiles from source.

### Step 6: Run Dev Server
```bash
npm run dev
# or
yarn dev

# Server should start on http://localhost:8080
```

The `check-env.sh` script will automatically verify your environment.

## Quick Start (After Initial Setup)

In your **Rosetta Terminal**:
```bash
cd /path/to/crimsonsunset.github.io
nvm use           # Uses .nvmrc (14.21.3)
pyenv local       # Uses .python-version (2.7.18)
npm run dev
```

## Verification Commands

```bash
# Check architecture (should be i386 in Rosetta terminal)
arch

# Check Node version (should be 14.21.3)
node --version

# Check Node architecture (should be x64, NOT arm64)
node -p "process.arch"

# Check Python version (should be 2.7.18)
python --version

# Check if pyenv is active
pyenv version
```

**All checks must pass** for node-sass to compile successfully.

## Why This Works

1. **Rosetta Terminal**: Provides x86_64 environment for running x86 binaries
2. **Node 14.21.3 x64**: Last Node 14, compatible with node-sass 4.x, compiled for Intel
3. **--arch=x64 Flag**: Forces nvm to download Intel binaries instead of ARM64
4. **Python 2.7**: Required by node-gyp to compile C++ native addons
5. **pyenv**: Isolates Python 2.7 from system Python and other tools

## Node-sass Compatibility Matrix

| Node Version | node-sass Version | Result |
|--------------|-------------------|--------|
| 14.x | 4.14+ | ✅ Works |
| 16.x | 4.14.1 | ❌ C++ compilation errors (V8 API changes) |
| 16.x | 6.0+ | ✅ Works (but requires upgrade) |
| 18.x | 7.0+ | ✅ Works (but requires upgrade) |

## Troubleshooting

### "Unsupported architecture (arm64)" error

**Cause**: Node.js was installed as ARM64 instead of x64

**Solution**:
```bash
# Uninstall ARM64 version
nvm uninstall 14.21.3

# Reinstall with x64 flag
nvm install 14.21.3 --arch=x64

# Verify
node -p "process.arch"  # Must show: x64

# Clean reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### C++ compilation errors (std::remove_cv_t, V8 API errors)

**Cause**: Using Node 16+ which has breaking changes for node-sass 4.x

**Solution**: Use Node 14.21.3 (see Step 4)

### "gyp ERR! stack SyntaxError: Missing parentheses in call to 'print'"

**Cause**: node-gyp is using Python 3.x instead of 2.7

**Solution**:
```bash
# Initialize pyenv in current shell
eval "$(pyenv init -)"

# Set Python 2.7 for project
pyenv local 2.7.18

# Verify
python --version  # Should show: Python 2.7.18

# If still issues, explicitly set npm's Python
npm config set python $(pyenv which python)
```

### "nvm: command not found" in scripts

**Cause**: nvm isn't loaded in the script's subshell

**Solution**: The `check-env.sh` script now auto-loads nvm. If you still have issues, ensure nvm is in your `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Terminal shows ARM mode

**Symptom**: `arch` outputs `arm64` instead of `i386`

**Solution**:
- Quit Terminal completely
- Open your Rosetta Terminal app
- Verify: `arch` should show `i386`
- If using temporary Rosetta shell: `arch -x86_64 zsh`

## Automated Environment Check

The project includes `scripts/check-env.sh` which runs automatically with `npm run dev`:

✅ **Checks:**
- Architecture is i386 (Rosetta mode)
- Node version is 14.21.3
- Python version is 2.7.18
- node_modules directory exists

🔧 **Auto-fixes:**
- Switches Node version via nvm
- Activates Python 2.7 via pyenv
- Reports issues that need manual intervention

## Key Lessons Learned

1. **ARM64 Node doesn't work** - Even in Rosetta, if Node is ARM64, node-gyp compiles for ARM64
2. **Must use `--arch=x64` flag** - This forces nvm to download Intel binaries
3. **Node 16 breaks node-sass 4.x** - V8 engine changes caused C++ API incompatibilities
4. **Node 14.21.3 is the sweet spot** - Last Node 14, fully compatible with node-sass 4.x
5. **pyenv must be initialized** - Scripts need `eval "$(pyenv init -)"` to access Python 2.7
6. **npm cache matters** - `npm cache clean --force` clears corrupted binaries
7. **pyenv local > global** - Use `local` to avoid polluting other projects with Python 2.7

## Environment Summary

| Component | Version | Why |
|-----------|---------|-----|
| **Terminal** | Rosetta (i386) | Provides x86_64 emulation |
| **Node.js** | 14.21.3 x64 | Compatible with node-sass 4.x C++ bindings |
| **Python** | 2.7.18 | Required by node-gyp for native compilation |
| **node-sass** | 4.14.1 | Bundled with project dependencies |
| **Architecture** | x86_64 | node-sass has no ARM64 binaries |

## Future: Modernization Path

When ready to modernize (see `docs/roadmap.md`):

### Option 1: Minimal Change (Drop-in Replacement)
```bash
npm uninstall node-sass
npm install sass
# sass-loader will auto-detect and use Dart Sass
```
**Benefits:**
- ✅ No Python required
- ✅ No Rosetta required
- ✅ Works on ARM64 natively
- ✅ Compatible with modern Node.js
- ✅ ~10% faster compilation

### Option 2: Full Modernization
1. Replace Webpack → Vite (10-100x faster HMR)
2. Upgrade Vue 2 → Vue 3
3. Replace node-sass → sass
4. Update all dependencies to current versions

**Benefits:**
- ✅ Native ARM64 support
- ✅ Sub-second hot reload
- ✅ Modern DX
- ✅ Better performance
- ✅ Active maintenance

### Cost of Staying Legacy
- ⚠️ Requires Rosetta terminal (slower than native ARM)
- ⚠️ Requires Python 2.7 (deprecated since 2020)
- ⚠️ Stuck on Node 14.x (EOL: April 2023)
- ⚠️ Slow builds (Webpack + node-sass compilation)
- ⚠️ Security vulnerabilities in old dependencies

**Recommendation**: Get baseline working (done!), then prioritize modernization.

## References

- [node-sass Compatibility](https://github.com/sass/node-sass#node-version-support-policy)
- [Apple Silicon Rosetta](https://support.apple.com/en-us/HT211861)
- [pyenv Documentation](https://github.com/pyenv/pyenv)
- [nvm Documentation](https://github.com/nvm-sh/nvm)
