import { resolve } from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginRadar } from 'vite-plugin-radar';
import htmlPlugin from 'vite-plugin-html-config';

const htmlPluginOptions = process.env.NODE_ENV !== "development" ? {} : {
  metas: [
    {
      name: 'Content-Security-Policy',
      content: `default-src *.bengawalk.com *.sentry.io *.mapbox.com maps.googleapis.com *.google-analytics.com 'self';
        img-src * 'self' data:;
        style-src *.mapbox.com fonts.googleapis.com 'unsafe-inline' 'self';
        font-src fonts.gstatic.com;
        worker-src 'self' blob:;`,
    }
  ],
};

export default defineConfig({
  envDir: resolve(__dirname),
  plugins: [
    react(),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-1FX33BYDE4',
      },
    }),
    htmlPlugin(htmlPluginOptions)
  ],
})
