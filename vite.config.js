import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // server: {
  //   proxy: {
  //     '/api/v1': {
  //       target: 'http://127.0.0.1:8001',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => {
  //         console.log('Vite proxying:', path, '→', `http://127.0.0.1:8001${path}`);
  //       },
  //     },
  //   },
  // },
});