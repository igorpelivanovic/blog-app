/** @type {import('tailwindcss').Config} */

import { pluginBorderImage } from './tailwindPlugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        half: "50%"
      },
      keyframes: {
        'rotate-full': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        'rotate-full-linear': 'rotate-full 1s linear infinite'
      },
    },
  },
  plugins: [
    pluginBorderImage
  ],
}

