import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import fs from 'fs';

// Helper to load JSON data fresh
const loadData = () => ({
  site: JSON.parse(fs.readFileSync('./src/data/site.json', 'utf-8')),
  projects: JSON.parse(fs.readFileSync('./src/data/projects.json', 'utf-8')).projects,
  experience: JSON.parse(fs.readFileSync('./src/data/experience.json', 'utf-8')),
});

// Custom plugin to watch data files and reload
const dataReloadPlugin = () => ({
  name: 'data-reload',
  handleHotUpdate({ file, server }) {
    if (file.includes('src/data/') && file.endsWith('.json')) {
      // Send full reload signal
      server.ws.send({ type: 'full-reload' });
      // Restart server to pick up new data
      server.restart();
      return [];
    }
  },
});

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    dataReloadPlugin(),
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: loadData(),
      helpers: {
        eq: (a, b) => a === b,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";`,
      },
    },
  },
});
