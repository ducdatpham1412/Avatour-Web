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
    // FIXME: Only applies to Lexend font. If you change to another font, you need to remove the `fontWeight` config below.
    fontWeight: {
      thin: '100',
      extralight: '100',
      light: '200',
      normal: '300',
      medium: '400',
      semibold: '500',
      bold: '600',
      extrabold: '700',
      black: '800',
    },
    extend: {
      colors: {
        background: 'var(--avatour-background)',
        white: 'var(--avatour-white)',
        black: 'var(--avatour-black)',
        p_50: 'var(--avatour-p_50)',
        p_100: 'var(--avatour-p_100)',
        p_200: 'var(--avatour-p_200)',
        p_300: 'var(--avatour-p_300)',
        p_400: 'var(--avatour-p_400)',
        p_500: 'var(--avatour-p_500)',
        p_600: 'var(--avatour-p_600)',
        p_700: 'var(--avatour-p_700)',
        p_800: 'var(--avatour-p_800)',
        p_900: 'var(--avatour-p_900)',
        gray_900: 'var(--avatour-gray_900)',
        gray_800: 'var(--avatour-gray_800)',
        gray_700: 'var(--avatour-gray_700)',
        gray_600: 'var(--avatour-gray_600)',
        gray_500: 'var(--avatour-gray_500)',
        gray_400: 'var(--avatour-gray_400)',
        gray_300: 'var(--avatour-gray_300)',
        gray_200: 'var(--avatour-gray_200)',
        gray_100: 'var(--avatour-gray_100)',
        gray_50: 'var(--avatour-gray_50)',
        // Other colors
        green: 'var(--avatour-green)',
        red: 'var(--avatour-red)',
        blue: 'var(--avatour-blue)',
        orange: 'var(--avatour-orange)',
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
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'zoom-out': {
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 0.3s ease-in-out',
        'zoom-out': 'zoom-out 0.3s ease-in-out',
      },
      screens: {
        xl: { min: '1300px' },
        max_ssm: { max: '450px' },
        min_lg: { max: '1200px' },
      },
      boxShadow: {
        all: '0 2px 6px -1px rgba(0, 0, 0, 0.10), 0 6px 24px 0px rgba(0, 0, 0, 0.10);',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
