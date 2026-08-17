/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ava: {
          red: '#E84142',
          deep: '#B90F21',
          ink: '#080A0F',
          steel: '#DCE1E8',
          pearl: '#F7F8FB',
          silver: '#EEF1F5',
        },
      },
      boxShadow: {
        chrome: '0 24px 80px rgba(14, 19, 28, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
        glow: '0 0 45px rgba(232,65,66,0.28)',
        'glow-strong': '0 0 70px rgba(232,65,66,0.44)',
      },
      fontFamily: {
        display: ['Arial Narrow', 'Roboto Condensed', 'Impact', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-red': 'radial-gradient(circle at center, rgba(232,65,66,.18), transparent 68%)',
      },
    },
  },
  plugins: [],
}
