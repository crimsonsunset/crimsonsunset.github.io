# Quick Setup Summary

**Updated**: October 28, 2025

## ✅ Working Configuration

```bash
Architecture:  i386 (Rosetta)
Node.js:       v14.21.3 x64
Python:        2.7.18
```

## 🚀 Quick Start (One-Time Setup)

```bash
# 1. In a Rosetta terminal (arch -x86_64 zsh)
arch  # verify: i386

# 2. Install Node 14 x64 (MUST use --arch=x64 flag)
nvm install 14.21.3 --arch=x64
nvm use 14.21.3

# 3. Install Python 2.7
pyenv install 2.7.18
pyenv local 2.7.18

# 4. Clean install
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 5. Run dev server
npm run dev
```

## 🔍 Quick Verification

```bash
arch                      # → i386
node --version            # → v14.21.3
node -p "process.arch"    # → x64
python --version          # → Python 2.7.18
```

## ⚡ Daily Workflow

```bash
# Open Rosetta Terminal
# cd to project
npm run dev
# That's it! check-env.sh handles the rest
```

## 🔥 Critical Gotchas

1. **Must use `--arch=x64`** - `nvm install 14.21.3 --arch=x64` (not just `nvm install`)
2. **Node 14, not 16** - Node 16+ breaks node-sass 4.x
3. **Rosetta terminal** - ARM terminal won't work even with x64 Node
4. **pyenv local** - Use `local` not `global` to isolate Python 2.7

## 📚 Full Documentation

- **Detailed Setup**: `docs/system/legacy-dev-setup.md`
- **Troubleshooting**: See above doc
- **Modernization**: `docs/roadmap.md`

## 🎯 What We Learned

| Issue | Solution |
|-------|----------|
| ARM64 compilation errors | Use `--arch=x64` flag with nvm install |
| C++ V8 API errors | Downgrade from Node 16 → Node 14 |
| Python 2 vs 3 conflicts | Use `pyenv local` to isolate |
| Slow/hanging builds | Clean cache: `npm cache clean --force` |
| nvm not found in scripts | Script auto-loads nvm (fixed) |

## 🔮 Next Steps

Once baseline is working (✅ done!):
1. Consider modernizing (replace node-sass → sass)
2. Or stick with legacy for now
3. See `docs/roadmap.md` for migration path

