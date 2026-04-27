import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // React pluginini ulash
  plugins: [react()],
  
  // GitHub Pages uchun asosiy yo'l (base path)
  // Repozitoriyingiz nomi 'login' bo'lgani uchun '/login/' deb yoziladi
  base: '/login/',

  // Build jarayonida chiqadigan papka nomi
  build: {
    outDir: 'dist',
  }
})