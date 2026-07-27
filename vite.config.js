import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      // Jab bhi frontend se '/users' par call jayegi, 
      // Vite use chupchaap 13.127.244.118:3000 par bhej dega
      '/users': {
        target: 'http://13.127.244.118:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
