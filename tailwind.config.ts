import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindFormPlugin from "@tailwindcss/forms";

function variants(variableName: string) {
  return `rgba(var(${variableName}),1)`;
}

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[class="dark-mode"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: variants("--color-primary-900"),
          800: variants("--color-primary-800"),
          700: variants("--color-primary-700"),
          600: variants("--color-primary-600"),
          500: variants("--color-primary-500"),
          400: variants("--color-primary-400"),
          300: variants("--color-primary-300"),
          200: variants("--color-primary-200"),
          100: variants("--color-primary-100"),
        },
        secondary: {
          900: variants("--color-secondary-900"),
          800: variants("--color-secondary-800"),
          700: variants("--color-secondary-700"),
          600: variants("--color-secondary-600"),
          500: variants("--color-secondary-500"),
          400: variants("--color-secondary-400"),
          300: variants("--color-secondary-300"),
          200: variants("--color-secondary-200"),
          100: variants("--color-secondary-100"),
          50: variants("--color-secondary-50"),
          0: variants("--color-secondary-0"),
        },
        success: variants("--color-success"),
        warning: variants("--color-warning"),
        error: variants("--color-error"),
      },
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        sans: ["var(--font-vazir)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    // require("@tailwindcss/aspect-ratio"),
    tailwindFormPlugin({
      strategy: "class",
    }),
  ],
};
export default config;
