/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#27ae60',
        'primary-dark': '#1e8449',
        'primary-light': '#f0faf4',
        secondary: '#2c3e50',
        accent: '#ecf0f1',
        success: '#27ae60',
        danger: '#e74c3c',
        warning: '#f39c12',
        'text-primary': '#2c3e50',
        'text-secondary': '#7f8c8d',
        'bg-light': '#f9f9f9',
        border: '#e0e0e0',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease forwards',
        'fade-in': 'fadeIn 0.3s ease',
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)',
        'shimmer': 'shimmer 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(400px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 20px rgba(0,0,0,0.15)',
        green: '0 4px 12px rgba(39,174,96,0.3)',
      },
    },
  },
  plugins: [],
}
