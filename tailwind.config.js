module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App Router pages + layouts
    "./components/**/*.{js,ts,jsx,tsx}", // Reusable components
    "./src/**/*.{js,ts,jsx,tsx}"         // If you used src/ option
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


