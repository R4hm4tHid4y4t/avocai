/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#dff2e6",
          100: "#b3e6c2",
          200: "#84d49b",
          300: "#5abf7a",
          400: "#3d9e60",
          500: "#2d7a4a",
          600: "#225c38",
          700: "#1a4a2e",
          800: "#0f2e1c",
          950: "#0a1f14",
        }
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;