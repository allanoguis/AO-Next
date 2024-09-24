import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        foreground: "rgba(var(--foreground))",
        bglogo: "rgba(var(--logo-bg))",
        logotext: "rgba(var(--logo-text))",
        navmenu: "rgba(var(--nav-menu))",
        navsub: "rgba(var(--nav-sub))",
        border:"rgba(var(--border))",
        cta: "rgba(var(--cta))",
        "cta-text":"rgba(var(--cta-text))",
        "cta-active":"rgba(var(--cta-active))",
        btnprimary: "rgba(var(--btn-primary))",
        btnsecondary: "rgba(var( --btn-secondary))",
        accent: "rgba(var(--accent))",
      },
    },
  },
  plugins: [],
};
export default config;
