/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--avatour-background))',
        white: 'hsl(var(--avatour-white))',
        black: 'hsl(var(--avatour-black))',
        p_50: 'hsl(var(--avatour-p_50))',
        p_100: 'hsl(var(--avatour-p_100))',
        p_200: 'hsl(var(--avatour-p_200))',
        p_300: 'hsl(var(--avatour-p_300))',
        p_400: 'hsl(var(--avatour-p_400))',
        p_500: 'hsl(var(--avatour-p_500))',
        p_600: 'hsl(var(--avatour-p_600))',
        p_700: 'hsl(var(--avatour-p_700))',
        p_800: 'hsl(var(--avatour-p_800))',
        p_900: 'hsl(var(--avatour-p_900))',
        gray_900: 'hsl(var(--avatour-gray_900))',
        gray_800: 'hsl(var(--avatour-gray_800))',
        gray_700: 'hsl(var(--avatour-gray_700))',
        gray_600: 'hsl(var(--avatour-gray_600))',
        gray_500: 'hsl(var(--avatour-gray_500))',
        gray_400: 'hsl(var(--avatour-gray_400))',
        gray_300: 'hsl(var(--avatour-gray_300))',
        gray_200: 'hsl(var(--avatour-gray_200))',
        gray_100: 'hsl(var(--avatour-gray_100))',
        gray_50: 'hsl(var(--avatour-gray_50))',
        // Other colors
        green: 'hsl(var(--avatour-green))',
        red: 'hsl(var(--avatour-red))',
        pink: 'hsl(var(--avatour-pink))',
        blue: 'hsl(var(--avatour-blue))',
        blue_800: 'hsl(var(--avatour-blue_800))',
        orange: 'hsl(var(--avatour-orange))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      screens: {
        xl: { min: '1300px' },
        min_lg: { max: '1200px' },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
