#!/bin/bash
# Environment verification and auto-fix script for legacy dev setup

# Load nvm if available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Load pyenv if available (CRITICAL for Python to work)
if command -v pyenv 1>/dev/null 2>&1; then
  export PYENV_ROOT="$HOME/.pyenv"
  export PATH="$PYENV_ROOT/bin:$PATH"
  eval "$(pyenv init -)"
  eval "$(pyenv init --path)"
fi

echo "🔍 Checking development environment..."
echo ""

NEEDS_FIX=0

# Check architecture
ARCH=$(arch)
echo "Architecture: $ARCH"
if [ "$ARCH" = "i386" ]; then
    echo "  ✅ Running in Rosetta (x86) mode"
elif [ "$ARCH" = "arm64" ]; then
    echo "  ❌ Running in ARM mode - you need a Rosetta terminal!"
    echo "  📖 See docs/system/legacy-dev-setup.md for setup instructions"
    echo ""
    echo "Cannot auto-fix architecture. Please open Terminal with Rosetta and try again."
    exit 1
fi
echo ""

# Check and fix Node version
NODE_VERSION=$(node --version 2>/dev/null)
if [ -z "$NODE_VERSION" ]; then
    echo "Node: NOT FOUND"
    echo "  ❌ Installing Node 14.21.3..."
    nvm install 14.21.3
    nvm use 14.21.3
    NEEDS_FIX=1
else
    echo "Node: $NODE_VERSION"
    if [[ "$NODE_VERSION" == "v14.21.3" ]]; then
        echo "  ✅ Correct version"
    else
        echo "  🔧 Switching to v14.21.3..."
        nvm use 14.21.3 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "  ✅ Switched to v14.21.3"
        else
            echo "  ⚠️  Installing Node 14.21.3..."
            nvm install 14.21.3
            nvm use 14.21.3
        fi
        NEEDS_FIX=1
    fi
fi
echo ""

# Check and fix Python version
PYTHON_VERSION=$(python --version 2>&1)
echo "Python: $PYTHON_VERSION"
if [[ "$PYTHON_VERSION" == *"2.7.18"* ]]; then
    echo "  ✅ Correct version"
elif [[ "$PYTHON_VERSION" == *"Unable to determine"* ]] || [[ "$PYTHON_VERSION" == *"command not found"* ]]; then
    echo "  🔧 Setting Python 2.7.18 with pyenv..."
    pyenv local 2.7.18
    if [ $? -ne 0 ]; then
        echo "  ⚠️  Python 2.7.18 not installed, installing now..."
        pyenv install 2.7.18
        pyenv local 2.7.18
    fi
    echo "  ✅ Set to Python 2.7.18"
    NEEDS_FIX=1
else
    echo "  🔧 Switching to Python 2.7.18..."
    pyenv local 2.7.18
    echo "  ✅ Set to Python 2.7.18"
    NEEDS_FIX=1
fi
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "Dependencies: Installed"
    echo "  ✅ node_modules exists"
else
    echo "Dependencies: NOT INSTALLED"
    echo "  ⚠️  Need to run: npm install"
fi
echo ""

# Summary
echo "========================================"
if [ $NEEDS_FIX -eq 1 ]; then
    echo "🔧 Environment has been configured!"
    echo ""
    # Verify the fixes worked
          NODE_CHECK=$(node --version 2>&1)
          PYTHON_CHECK=$(python --version 2>&1)

          if [[ "$NODE_CHECK" != "v14.21.3" ]]; then
              echo "⚠️  Node version change requires shell reload"
              echo "    Please run: nvm use 14.21.3"
              echo "    Then run this script again"
              exit 1
          fi
    
    if [[ "$PYTHON_CHECK" != *"2.7.18"* ]]; then
        echo "⚠️  Python version change requires verification"
        echo "    Please run: pyenv local 2.7.18"
        echo "    Then run this script again"
        exit 1
    fi
    
    echo "✅ All fixes applied successfully!"
    if [ ! -d "node_modules" ]; then
        echo ""
        echo "Next step: npm install"
    fi
      else
          NODE_CHECK=$(node --version 2>&1)
          PYTHON_CHECK=$(python --version 2>&1)
          if [ "$ARCH" = "i386" ] && [[ "$NODE_CHECK" == "v14.21.3" ]] && [[ "$PYTHON_CHECK" == *"2.7.18"* ]]; then
              echo "✅ Environment is perfect!"
              if [ ! -d "node_modules" ]; then
                  echo ""
                  echo "Next step: npm install"
              fi
          else
              echo "⚠️  Some issues remain"
              echo ""
              echo "Manual steps needed:"
              [[ "$NODE_CHECK" != "v14.21.3" ]] && echo "  - Run: nvm use 14.21.3"
              [[ "$PYTHON_CHECK" != *"2.7.18"* ]] && echo "  - Run: pyenv local 2.7.18"
              echo ""
              echo "See: docs/system/legacy-dev-setup.md"
              exit 1
          fi
      fi
echo "========================================"
