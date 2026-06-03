import { defineConfig, loadEnv } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: env.API_PROXY_TARGET,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
        build: {
            target: "es2020",
            sourcemap: true,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
                            return "vendor"
                        }
                    },
                },
            },
        },
    }
})
