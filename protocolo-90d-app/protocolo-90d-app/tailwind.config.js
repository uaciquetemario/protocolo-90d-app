/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#16231F',       // fundo — verde-floresta profundo, não preto puro
        raised: '#1D2C27',   // superfícies elevadas / divisórias
        ink: '#EDE6D6',      // texto principal — pergaminho quente
        muted: '#A6A08F',    // texto secundário
        gold: '#C9A24B',     // destaque primário — disciplina, sequência sem apostar
        sage: '#6E9B8C',     // destaque secundário — saúde, espiritualidade
        rust: '#A85D3B',     // alerta suave — gatilhos, avisos
        line: 'rgba(237,230,214,0.12)',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
