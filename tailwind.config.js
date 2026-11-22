/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Caveat"', '"Homemade Apple"', 'cursive'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F9F5EE',
          200: '#F3ECE0',
          300: '#E8DCB8',
        },
        velvet: {
          800: '#5A0B13',
          900: '#3D070D',
          950: '#260408',
        }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.8))' },
        },
        flutter: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.08, 0.92) rotate(-5deg)' },
          '50%': { transform: 'scale(0.95, 1.05) rotate(4deg)' },
          '75%': { transform: 'scale(1.05, 0.95) rotate(-3deg)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        glow: 'pulseGlow 2.5s ease-in-out infinite',
        flutter: 'flutter 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

