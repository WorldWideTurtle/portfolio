import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "math": "math,ui-serif,serif"
      },
      maxWidth: {
        "text": "800px"
      }
    },
    colors: {
      "primary": {
        900: "#666666",
        800: "#5C5C5C",
        700: "#525252",
        600: "#474747",
        500: "#3D3D3D",
        400: "#333333",
        300: "#292929",
        200: "#1B1B1B",
        100: "#0C0C0C"
      },
      "accent-red": "#EF0000",
      "accent-jade": "#6ED754",
      "transparent": "transparent",
      "white": {
        900: "#EEE9E9",
        800: "#E4DCDC",
        700: "#DCD1D1",
        600: "#D3C5C5",
        500: "#CAB9B9",
        400: "#C2AEAE",
        300: "#B9A2A2",
        200: "#B09696",
        100: "#A78B8B"
      }
    },
    textShadow: () => ({
      "red": "0 0 8px theme(colors.accent-red)"
    })
  },
  plugins: [
    function ({ addUtilities, theme } : {addUtilities : Function, theme : Function}) {
      const textShadows = theme('textShadow');
      const textShadowUtilities = Object.keys(textShadows).map((key) => ({
        [`.text-shadow-${key}`]: { textShadow: textShadows[key] },
      }));
      addUtilities(textShadowUtilities, ['responsive', 'hover']);
    }
  ]
} satisfies Config