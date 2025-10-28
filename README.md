# Joe Sangiorgio Portfolio

Hello and welcome to my Portfolio site! My name is Joe Sangiorgio and I'm currently a Web Interface Developer for Marvel Entertainment. I have a passion for all things Javascript, and love creating meaningful data-driven web applications.

I made this app in order to have an interesting space to showcase the type of work I love doing. My goal was to create an environment that would present my professional products in a unique and compelling way. I also just wanted to play with some flashy cutting-edge web technologies! 🤓

Do I realize the same content housed within this site could have been communicated in a 3kb javascript-free HTML file with a few CSS styles? Sure. Are some of the customization controls in the sidebar completely over the top? Absolutely. Should there be a need for a tour around a portfolio? Oh God no. But where's the fun in making something like that?!

## ⚠️ Apple Silicon Setup (Required!)

This project uses legacy dependencies that require **Rosetta 2** on Apple Silicon Macs.

**Quick Start:**
1. Open Terminal with Rosetta (see [docs/system/legacy-dev-setup.md](docs/system/legacy-dev-setup.md))
2. Verify environment: `npm run check-env`
3. If checks pass: `npm start`

**Detailed instructions:** See [docs/system/legacy-dev-setup.md](docs/system/legacy-dev-setup.md)

## Build Setup

```bash
# verify your environment is correct (Apple Silicon only)
npm run check-env

# install dependencies (in Rosetta terminal!)
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build
```

## Requirements

- **Node.js**: v14.21.3 x64 (use nvm with `--arch=x64` flag)
- **Python**: 2.7.18 (use pyenv)
- **Architecture**: x86_64/i386 (Rosetta terminal required on Apple Silicon)
- **Platform**: macOS with Rosetta 2 support

## Modernization

This codebase is intentionally kept in legacy state for now. See `docs/roadmap.md` for modernization plans.
