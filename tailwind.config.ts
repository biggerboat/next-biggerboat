import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'biggerboat-yellow': '#E6C42F',
      },
      fontFamily: {
        droid: ["Droid Sans", "sans-serif"],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' }
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'wave-front': 'wave 60s linear infinite',
        'wave-back': 'wave 100s linear infinite',
      },
      backgroundColor: {
        'wave': '#3B82F6'
      }
    },
  },
  plugins: [
    typography(),
  ],
};

export default config;
