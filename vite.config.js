import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import tailwindcss from '@tailwindcss/vite';
import path from 'path'; 

const BASE_PATH = '/cards/';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? BASE_PATH : '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  //  tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@service': path.resolve(__dirname, './src/service'),
    },
  },
});
