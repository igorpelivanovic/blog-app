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
      aspectRatio: {
        '5/3': '5 / 3',
      },
      boxShadow: {
      },
      colors: {
        text: '#060f09',
        background: '#f0faf3',
        primary: '#48cb69',
        secondary: '#92e3a6',
        accent: '#68df85',
        'secondary-transparent-20': "rgba(146, 227, 166, .05)"
      }
    },
  },
  plugins: [
    pluginBorderImage
  ],
}

/* --tw-shadow-colored: 0 0px 15px -3px var(--tw-shadow-color), 0 0px 6px -4px var(--tw-shadow-color) */