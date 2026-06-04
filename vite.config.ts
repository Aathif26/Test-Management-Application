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
                        // React core
                        if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/") || id.includes("node_modules/scheduler")) {
                            return "vendor-react"
                        }
                        // React Router
                        if (id.includes("node_modules/react-router")) {
                            return "vendor-router"
                        }
                        // TanStack Query
                        if (id.includes("node_modules/@tanstack/react-query") || id.includes("node_modules/@tanstack/query-core")) {
                            return "vendor-query"
                        }
                        // TanStack Table
                        if (id.includes("node_modules/@tanstack/react-table") || id.includes("node_modules/@tanstack/table-core")) {
                            return "vendor-table"
                        }
                        // Radix UI primitives
                        if (id.includes("node_modules/radix-ui") || id.includes("node_modules/@radix-ui")) {
                            return "vendor-radix"
                        }
                        // Form handling
                        if (id.includes("node_modules/react-hook-form") || id.includes("node_modules/@hookform") || id.includes("node_modules/zod")) {
                            return "vendor-forms"
                        }
                        // Icons
                        if (id.includes("node_modules/react-icons")) {
                            return "vendor-icons"
                        }
                        // Axios + networking utilities
                        if (id.includes("node_modules/axios")) {
                            return "vendor-http"
                        }
                        // Utility libs (clsx, tailwind-merge, class-variance-authority)
                        if (
                            id.includes("node_modules/clsx") ||
                            id.includes("node_modules/tailwind-merge") ||
                            id.includes("node_modules/class-variance-authority")
                        ) {
                            return "vendor-utils"
                        }
                    },
                },
            },
        },
    }
})
