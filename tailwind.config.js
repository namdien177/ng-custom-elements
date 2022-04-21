module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      minWidth: theme => ({
        ...theme('spacing')
      }),
      minHeight: theme => ({
        ...theme('spacing')
      }),
      maxWidth: theme => ({
        ...theme('spacing')
      }),
      maxHeight: theme => ({
        ...theme('spacing')
      }),
      inset: theme => ({
        ...theme('spacing')
      }),
      zIndex: {
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        '25': 25,
        '75': 75,
        '100': 100,
        auto: 'auto'
      },
      colors: {
        transparent: 'transparent',
        inherit: 'inherit'
      },
      fontFamily: {
        'segoe-ui': ["Segoe UI"]
      }
    },
  },
  plugins: [],
}
