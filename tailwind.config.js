/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  screens: {
    // ml stands for 'mobile landscape'
    ml: {
      raw: '(min-width: 480px) and (max-width: 960px) and (max-height: 480px)',
    },
  },
};
