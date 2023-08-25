import type { Config } from 'tailwindcss'

const config: Config = {
  

  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',    
    
    
  ],
  theme: {
    extend: {
      colors:{
        gold: '#CDA34F',
        daisy: '#E9E7DA',
        Stem: '#636B46',
        Greenery: '#373F27',
        textWhite: '#FFECC7',
        textBlack: '#2C3718'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
