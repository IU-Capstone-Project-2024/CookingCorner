import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    server: {
      open: "http://127.0.0.1:5173/sign-in"
    }
  }
})
