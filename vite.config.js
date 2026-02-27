import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import fs from 'fs';

// Get all HTML files from src directory for multi-page build
const getHtmlInputs = () => {
  const srcDir = resolve(__dirname, 'src');
  return fs.readdirSync(srcDir)
    .filter(file => file.endsWith('.html'))
    .reduce((inputs, file) => {
      const name = file.replace('.html', '');
      inputs[name] = resolve(srcDir, file);
      return inputs;
    }, {});
};

// Helper to load JSON data fresh
const loadData = () => {
  const projectsData = JSON.parse(fs.readFileSync('./src/data/projects.json', 'utf-8'));
  return {
    site: JSON.parse(fs.readFileSync('./src/data/site.json', 'utf-8')),
    featuredWorks: projectsData.featuredWorks,
    otherWorks: projectsData.otherWorks,
    experience: JSON.parse(fs.readFileSync('./src/data/experience.json', 'utf-8')),
  };
};

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
  base: '/portfolio/',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlInputs(),
    },
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
