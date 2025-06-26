import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Required for Vercel’s SPA routing
  build: {
    outDir: 'dist', // Ensure this matches vercel.json’s distDir
    sourcemap: false // Optional: Reduce build size
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
