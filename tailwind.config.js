/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// eslint-disable-next-line
import { heroui } from "@heroui/react"

export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};