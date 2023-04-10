import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  base: './',
  root: './src',
  build: {
    outDir: '../dist/shelter/',
    emptyOutDir: true,
    polyfillModulePreload: false,
    minify: false,
    target: 'esnext',
    rollupOptions: {
      input: {
        'main/main': resolve('./src/main/index.html'),
        'pets/pets': resolve('./src/pets/index.html'),
        'script': resolve('./src/script.js'),
      },

      output: {
        entryFileNames: '[name].js',

        assetFileNames: ({name}) => {

          if (/\.css$/.test(name ?? '')) {
            return 'assets/[name][extname]';
          }

          if (/\.(ttf|woff|woff2)$/.test(name ?? '')) {
            return 'assets/fonts/[name][extname]';
          }

          if (/\.(svg|ico)$/.test(name ?? '')) {
            return 'assets/icons/[name][extname]';
          }

          if (/\.(png|jpe?g)$/.test(name ?? '')) {
            return 'assets/images/[name][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },

      },

    },
  },

  plugins: [
    handlebars({
      partialDirectory: resolve('./src/html'),
    }),
  ],

});
