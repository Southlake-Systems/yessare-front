import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bitcount: ["'Bitcount Prop Single'", "sans-serif"],
        jaro: ["'Jaro'", "sans-serif"],
        changa: ["'Changa One'", "cursive"],
      },
      colors: {
        primary: "#005bae",
        secondary: "#1064b5",
        accent: "#4ec3c9",
        background: "#005bae",
        card: "#1A1A1A",
        textPrimary: "#FFFFFF",
        textSecondary: "#f9fcf8",
        textTertiary: "#f2ba36",
      },
    },
  },
  plugins: [],
};

export default config;