import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'
import { readFileSync } from 'fs'

// Read package.json for build info
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// Custom plugin to inject build.info and console.rainbow
function buildInfoPlugin() {
  const isProduction = process.env.NODE_ENV === 'production'
  const buildInfo = {
    version: pkg.version,
    date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}`,
    environment: isProduction ? 'PRODUCTION' : 'DEVELOPMENT',
    name: pkg.name
  }

  return {
    name: 'build-info-plugin',
    config() {
      return {
        define: {
          'build.info': JSON.stringify(buildInfo),
          'console.rainbow': JSON.stringify((color, input) => console.log(`%c${input}`, `color:${color};`))
        }
      }
    },
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          children: `window.console.rainbow = function(color, input) { console.log('%c' + input, 'color:' + color + ';'); };`,
          injectTo: 'head-prepend'
        }
      ]
    }
  }
}

export default defineConfig({
  plugins: [
    createVuePlugin(),
    buildInfoPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8080
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      output: {
        entryFileNames: 'build.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})

