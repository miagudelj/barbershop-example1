import { defineConfig } from 'vite';
import { resolve } from 'path';

// Widget name from env: WIDGET_NAME=hours|booking|services
const widgetName = process.env.WIDGET_NAME || 'hours';

const entries: Record<string, string> = {
  hours: resolve(__dirname, '../src/modules/hours/hours-entry.tsx'),
  booking: resolve(__dirname, '../src/modules/booking/booking-entry.tsx'),
  services: resolve(__dirname, '../src/modules/services/services-entry.tsx'),
};

export default defineConfig({
  publicDir: false, // Don't copy public assets into widget output
  // No React plugin needed — Vite's built-in esbuild handles JSX
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  build: {
    outDir: resolve(__dirname, '../public/widgets'),
    emptyOutDir: false,
    lib: {
      entry: entries[widgetName],
      name: `BSWidget_${widgetName}`,
      formats: ['iife'],
      fileName: () => `${widgetName}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: `${widgetName}.[ext]`,
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
});
