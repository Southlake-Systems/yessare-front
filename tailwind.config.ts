import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     animation: {
        marquee: 'marquee 25s linear infinite',
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50% - 1.5rem))' },
        },
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