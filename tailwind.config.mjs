/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Tambahkan baris ini
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}", // Dan baris ini
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