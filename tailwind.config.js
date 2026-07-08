/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        'navy-light': '#1E293B',
        accent: '#0EA5E9',
        'accent-dark': '#0284C7',
        'accent-light': '#7DD3FC',
        success: '#22C55E',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        ink: '#1E293B',
        muted: '#64748B',
        divider: '#E2E8F0',
        brand: { red: '#C8102E', blue: '#1E7FC2' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(15, 23, 42, 0.08)',
        lift: '0 20px 40px -12px rgba(15, 23, 42, 0.18)',
        glow: '0 0 40px -8px rgba(14, 165, 233, 0.45)',
      },
    },
  },
  plugins: [],
}
