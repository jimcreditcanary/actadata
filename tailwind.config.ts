import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          DEFAULT: "#070A1A",     /* slight purple-warm shift */
          50: "#0C1428",
          100: "#121C36",
          200: "#1A2544",
          300: "#243054",
          400: "#324166",
        },
        /* Brand accents — names retained for legacy class references.
           Palette pivoted from blue to PURPLE tones in 2026-04. */
        electric: {              /* primary accent (violet) */
          DEFAULT: "#A855F7",
          dim:     "#7C3AED",
          glow:    "#C084FC",
        },
        sky: {                    /* secondary accent (lavender), pairs with electric for gradients */
          DEFAULT: "#A78BFA",
          soft:    "#C4B5FD",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans:    ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono:    ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(168,85,247,.10), transparent 60%)",
        "scan":
          "linear-gradient(180deg, rgba(168,85,247,0) 0%, rgba(168,85,247,.04) 50%, rgba(168,85,247,0) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
