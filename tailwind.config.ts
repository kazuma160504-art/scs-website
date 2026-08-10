import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        // 温かみのある配色：アイボリーベース＋優しい緑・橙
        cream: {
          50: "#FDFBF5",
          100: "#F8F4E9",
          200: "#F0E9D8",
        },
        leaf: {
          50: "#F0F5EF",
          100: "#DCE9DA",
          300: "#9CBF99",
          500: "#5B8C5A",
          600: "#4A7549",
          700: "#3B5E3A",
        },
        apricot: {
          50: "#FDF3E7",
          100: "#FAE4C8",
          300: "#F0BC7E",
          500: "#E8964C",
          600: "#D77F33",
          700: "#B0661F",
        },
        ink: {
          DEFAULT: "#3A3630",
          light: "#6B655B",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
