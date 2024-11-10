import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This will set the host to 0.0.0.0, allowing network access
    port: 3000, // You can specify the port number if needed
  },
})
