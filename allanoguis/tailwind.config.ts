import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll 20s linear infinite', 
        "rotate-slower": 'rotate 2s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      "rotate-slower": {
          '0%': { transform: 'rotate(0deg)' }, 
          '100%': { transform: 'rotate(360deg)' }, 
      }
      },
      colors: {
        background: "rgba(var(--background))",
        foreground: "rgba(var(--foreground))",
        bglogo: "rgba(var(--logo-bg))",
        logotext: "rgba(var(--logo-text))",
        navmenu: "rgba(var(--nav-menu))",
        navsub: "rgba(var(--nav-sub))",
        border: "rgba(var(--border))",
        cta: "rgba(var(--cta))",
        "cta-text": "rgba(var(--cta-text))",
        "cta-active": "rgba(var(--cta-active))",
        "btn-primary": "rgba(var(--btn-primary))",
        "btn-secondary": "rgba(var(--btn-secondary))",
        "accent-primary": "rgba(var(--accent-primary))",
        "accent-secondary": "rgba(var(--accent-secondary))",
        hamburger: "rgba(var(--hamburgerbg))",
      },
      fontFamily: {
        planet: ["PlanetFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
