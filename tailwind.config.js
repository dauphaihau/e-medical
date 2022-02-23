module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      primary: {
        DEFAULT: '#5156be',
        light: '#c8c9ee'
      },
      secondary: {
        DEFAULT: '#e4e6ef',
        light: '#e9edf2',
      },
      success: {
        DEFAULT: '#05825f',
        light: '#ebf9f5',
      },
      info: {
        DEFAULT: '#3596f7',
        light: '#cce5ff',
      },
      warning: {
        DEFAULT: '#ffa800',
        light: '#fff8ea',
      },
      danger: {
        DEFAULT: '#ee3158',
        light: '#ffd6de',
      },
      gray: {
        100: '#f3f6f9',
        200: '#ebedf3',
        300: '#e4e6ef',
      },
      dark: '#172b4c'
    },
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      variants: {
        button: ['primary', 'success'],
      },
      spacing: {
        75: '19.29rem',
        8.5: '1.875rem'
      },
    },
  },
  plugins: [],
}
