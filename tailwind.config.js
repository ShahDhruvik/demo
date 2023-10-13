/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundImage: {
      // banner: "url('../../public/images/bannerImage.png')",
      // bannerLaserSkin: "url('../../public/images/laser-skin.png')",
    },
    colors: {
      pink: {
        main: '#e20074',
        light: '#e20074',
        dark: '#e20074',
      },
      darkBlue: {
        main: '#0a3876',
        light: '#0a3876',
        dark: '#0a3876',
      },
      midBlue: {
        main: '#d8dae8',
        light: '#d8dae8',
        dark: '#d8dae8',
      },
      blue: {
        main: '#00a1f1',
        light: '#00a1f1',
        dark: '#00a1f1',
      },
      lightBlue: {
        main: '#d9e3f8',
        light: '#d9e3f8',
        dark: '#d9e3f8',
      },
      lightGray: {
        main: '#f4f4f4',
        light: '#f4f4f4',
        dark: '#f4f4f4',
      },
      gray: {
        main: '#d4d4d4',
        light: '#d4d4d4',
        dark: '#d4d4d4',
      },
      midGray: {
        main: '#c1c1c4',
        light: '#c1c1c4',
        dark: '#c1c1c4',
      },
      darkGray: {
        main: '#787d78',
        light: '#787d78',
        dark: '#787d78',
      },
      orange: {
        main: '#db4437',
        light: '#db4437',
        dark: '#db4437',
      },
      lightOrange: {
        main: '#de605d',
        light: '#de605d',
        dark: '#de605d',
      },
      green: {
        main: '#0f9d58',
        light: '#0f9d58',
        dark: '#0f9d58',
      },
      lightGreen: {
        main: '#006571',
        light: '#006571',
        dark: '#006571',
      },
      yellow: {
        main: '#ffbb00',
        light: '#ffbb00',
        dark: '#ffbb00',
      },
      lime: {
        main: '#f6f9f7',
        light: '#f6f9f7',
        dark: '#f6f9f7',
      },
      white: {
        main: '#ffffff',
        light: '#ffffff',
        dark: '#ffffff',
      },
      black: {
        main: '#000000',
        light: '#000000',
        dark: '#000000',
      },
    },
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px,1fr))',
      },
      spacing: {
        container: `max(
            1rem,
            calc((100vw - calc(1440px - 1rem * 2)) / 2)
            )`,
        'btw-container': `max(
              1rem,
              calc((100vw - calc(1440px - 0.5rem * 2)) / 2)
              )`,
      },
      keyframes: {
        spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        loading: 'spin 1.3s linear infinite', // 'spin-custom' is your custom animation class
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px,1fr))',
      },
      // screens: {
      //   csm: '480px',
      //   cmd: '768px',
      //   clg: '976px',
      //   cxl: '1440px',
      // },
      aspectRatio: {
        planCardRatio: '2/3',
      },
      fontFamily: {
        sans: ['Poppins', 'sans'],
      },
      boxShadow: {
        'box-out': `0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3), inset 0px -3px 0px rgba(0, 0, 0, 0.2)`,
        'box-in': `#d4d4d4 100px -100px 136px -128px inset`,
      },
    },
  },
  plugins: [],
}
