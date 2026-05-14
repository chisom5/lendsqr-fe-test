import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'node:path'

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // raise warning threshold to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom'],
          'router':       ['react-router-dom'],
          'query':        ['@tanstack/react-query'],
          'forms':        ['react-hook-form', '@hookform/resolvers', 'zod'],
          'icons':        ['lucide-react'],
        },
      },
    },
  },
})