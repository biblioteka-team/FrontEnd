import path from 'path'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
     plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
    assetsInclude: ['**/*.ttf'],
    base: '/',
    publicDir: path.resolve(__dirname, './public'),
    resolve: {
      alias: {
        _api: path.resolve(__dirname, './src/_api'),
        api: path.resolve(__dirname, './src/api'),
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
        contexts: path.resolve(__dirname, './src/contexts'),
        dev: path.resolve(__dirname, './src/dev'),
        helpers: path.resolve(__dirname, './src/helpers'),
        hooks: path.resolve(__dirname, './src/hooks'),
        pages: path.resolve(__dirname, './src/pages'),
        router: path.resolve(__dirname, './src/router'),
        services: path.resolve(__dirname, './src/services'),
        store: path.resolve(__dirname, './src/store'),
        // styles: path.resolve(__dirname, './src/style.ts'),
        translation: path.resolve(__dirname, './src/translation'),
        types: path.resolve(__dirname, './src/types'),
        ui: path.resolve(__dirname, './src/ui'),
        layouts: path.resolve(__dirname, './src/layouts'),
        queries: path.resolve(__dirname, './src/queries'),
        utils: path.resolve(__dirname, './src/utils'),
        managers: path.resolve(__dirname, './src/managers'),
        validation: path.resolve(__dirname, './src/validation'),
      },
    },
    define: {
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        ...env,
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]__[hash:base64:5]'
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 5173,
    },
    preview: {
      host: true,
      port: 8080,
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
      },
      exclude: ['chunk-35Z6LCG7', 'chunk-A26WW3DX'],
    },
   build: {
  target: 'es2020',
  outDir: 'dist',  
  assetsDir: 'assets',
  rollupOptions: {
    output: {
      chunkFileNames: 'assets/js/[name].[hash].js',
      entryFileNames: 'assets/js/[name].[hash].js',
      assetFileNames: (assetInfo) => {
        if (/\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name ?? '')) {
          return 'assets/fonts/[name].[ext]';
        }
        if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name ?? '')) {
          return 'assets/images/[name].[ext]';
        }
        if (/\.css$/.test(assetInfo.name ?? '')) {
          return 'assets/css/[name].[hash].css';
        }
        return 'assets/[name].[ext]';
      },
    },
  },
},

  };
});
