import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', 
  plugins: [react()],
  build: {
    outDir: 'dist' // this is the default and correct for Vercel
  },
})