import animate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1280px" } },
    extend: {
      fontFamily: {
        sans: ["Manrope Variable", "Noto Sans JP", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk Variable", "Manrope Variable", "Noto Sans JP", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        "accent-soft": "hsl(var(--accent-soft))",
        canvas: "hsl(var(--canvas))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        ring: "hsl(var(--ring))",
        paper: "#f1efe8",
        ink: "#10110f",
        signal: "#c7ff3d",
      },
      boxShadow: {
        shell: "0 40px 120px -55px rgba(38, 42, 85, .42)",
        card: "0 22px 65px -38px rgba(30, 41, 90, .34)",
        glow: "0 26px 68px -34px hsl(var(--accent) / .45)",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(.5)" },
          "100%": { opacity: "1", transform: "translate(-48%, -38%) scale(1)" },
        },
      },
      animation: {
        spotlight: "spotlight 1.8s ease-out .35s forwards",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
