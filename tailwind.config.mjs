/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                // Thinka High-Trust Palette
                brand: {
                    primary: '#00FF94',   // Electric Mint
                    obsidian: '#0B0F1A',  // Deep Obsidian
                    navy: '#161C2C',      // Midnight Navy
                    indigo: '#6366F1',    // Indigo Glow
                    white: '#F8FAFC',     // Ghost White
                    slate: '#94A3B8',     // Secondary Text
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Sora', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shine': 'shine 1.5s ease-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(0, 255, 148, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 255, 148, 0.6)' },
                },
                shine: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            boxShadow: {
                'glass-sm': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'spotlight': '0 0 80px -10px rgba(0, 255, 148, 0.15)',
            }
        },
	},
	plugins: [],
    darkMode: 'class', // or 'media'
}
