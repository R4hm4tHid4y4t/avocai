/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        judul: ['var(--font-judul)'],
        teks: ['var(--font-teks)'],
      },
    },
  },
  plugins: [],
};