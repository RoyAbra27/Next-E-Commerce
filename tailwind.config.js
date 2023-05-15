/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'modal-open': {
                    '0%': { transform: 'translate3d(0, 100%, 0)', opacity: '0' },
                    '100%': { transform: 'translate3d(0, 0, 0)', opacity: '1' },
                },
            },
            animation: {
                'modal-open': 'modal-open 0.3s ease-in-out',
            },
        },
    },
    plugins: [],
}