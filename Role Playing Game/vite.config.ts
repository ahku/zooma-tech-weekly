import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: './dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        app: './index.html',
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
