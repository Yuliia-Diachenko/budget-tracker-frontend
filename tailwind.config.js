module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class' 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
