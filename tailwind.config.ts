import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {},
    colors: {
      "primary": "#0C0C0C",
      "accent-red": "#EF0000",
      "accent-jade": "#6ED754",
      "transparent": "transparent"
    }
  },
  plugins: [],
} satisfies Config