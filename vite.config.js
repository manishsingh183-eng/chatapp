import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/chatApp/',
  plugins: [react()],
  build: {
    outDir: 'dist'  // <-- default for Vite and expected by Vercel
  },
})

