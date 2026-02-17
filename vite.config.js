import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/aircall': {
        target: 'https://api.aircall.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/aircall/, ''),
      },
    },
  },
})
