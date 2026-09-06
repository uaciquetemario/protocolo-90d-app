import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' garante que os caminhos funcionam quando publicado
// no GitHub Pages dentro de um subdiretório (ex.: usuario.github.io/protocolo-90d-app/)
export default defineConfig({
  plugins: [react()],
  base: './',
})
