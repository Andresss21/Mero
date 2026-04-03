import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: false,
      inject: {
        ejsOptions: {
          filename: path.resolve('index.html')
        }
      }
    })
  ],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})
