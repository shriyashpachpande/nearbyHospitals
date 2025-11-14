import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configure to proxy API requests during development
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/search-hospitals': 'http://localhost:5000'
    }
  }
})
