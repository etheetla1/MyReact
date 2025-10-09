import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Optimize for production
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Better chunk splitting for caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react'],
          pdf: ['react-pdf', 'pdfjs-dist']
        }
      }
    },
    // Ensure assets are properly handled
    assetsDir: 'assets',
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  // Ensure proper base path for S3
  base: '/',
  // Preview server configuration (for testing production build)
  preview: {
    port: 4173,
    host: true
  },
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    // Handle SPA routing in development
    historyApiFallback: true
  }
})
