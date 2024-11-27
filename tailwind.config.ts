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
      "primary-light": "#111111",
      "accent-red": "#EF0000",
      "accent-jade": "#6ED754",
      "transparent": "transparent"
    },
    textShadow: () => ({
      "red": "0 0 8px theme(colors.accent-red)"
    })
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const textShadows = theme('textShadow');
      const textShadowUtilities = Object.keys(textShadows).map((key) => ({
        [`.text-shadow-${key}`]: { textShadow: textShadows[key] },
      }));
      addUtilities(textShadowUtilities, ['responsive', 'hover']);
    },
  ]
} satisfies Config