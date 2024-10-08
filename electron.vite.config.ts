import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer/src'),
        '@renderer': resolve(__dirname, 'src/renderer/src'),
        '@icons': resolve(__dirname, 'src/renderer/src/static/icon'),
        '@utils': resolve(__dirname, 'src/renderer/src/utils'),
        '@images': resolve(__dirname, 'src/renderer/src/static/image'),
        '@components': resolve(__dirname, 'src/renderer/src/components'),
      },
    },
    plugins: [react(), svgr()],
  },
})
