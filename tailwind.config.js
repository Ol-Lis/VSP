// @type {import('tailwindcss').Config} 
module.exports = {
  content: ["./src/*.html"],
  theme: {
    fontFamily: {
      'body': ['e-Ukraine', 'Montserrat'],
    },
    extend: {
      custom: ['e-Ukraine', 'sans-serif'],
      colors: {
        'main': '#079F5D',
        'grey-02': '#242424',
        'grey-03': '#363635',
        'grey-04': '#545454',
        'grey-05': '#6C6C6C',
        'white-08': '#E2E2E2',
        'white-09': '#F8F8F8',
      },
    },
    plugins: [],
  }
}

