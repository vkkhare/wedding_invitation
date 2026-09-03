import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps every asset path relative, so the site works at
// https://<user>.github.io/<repo>/ regardless of the repo name.
//
// Two pages, one bundle: index.html is the invitation as the groom's family
// sends it, bride/index.html the same page as the bride's family sends it —
// built to dist/bride/index.html, so it is served at /bride. Both load
// src/main.jsx, which reads the side off the URL.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bride: resolve(__dirname, 'bride/index.html'),
      },
    },
  },
})
