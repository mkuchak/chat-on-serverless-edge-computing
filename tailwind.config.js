const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        // https://www.tailwindshades.com/
        primary: {},
        secondary: {},
        tertiary: {}
      },
      screens: {
        xxs: { max: '340px' },
        xs: { max: '640px' }
      }
    }
  },
  plugins: []
}
