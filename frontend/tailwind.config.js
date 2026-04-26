/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        emeraldDeep: '#0f3d2e',
        emeraldSoft: '#1f7a55',
        gold: '#d9a441',
        goldSoft: '#f3d78a',
        paper: '#f7f8f3',
        ink: '#17231d',
      },
      boxShadow: {
        premium: '0 18px 50px rgba(15, 61, 46, 0.12)',
      },
    },
  },
  plugins: [],
};
