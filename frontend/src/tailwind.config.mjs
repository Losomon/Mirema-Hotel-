/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.375', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.625', letterSpacing: '0.01em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '0.01em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '2', letterSpacing: '0.01em', fontWeight: '500' }],
                '3xl': ['1.875rem', { lineHeight: '2.25', letterSpacing: '0.005em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '2.5', letterSpacing: '0.005em', fontWeight: '600' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '0.002em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '0.001em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "cormorantgaramond",
                paragraph: "sora"
            },
            colors: {
                destructive: '#D32F2F',
                'destructive-foreground': '#FFFFFF',
                'accent-gold': '#C4A484',
                'dark-gray-text': '#333333',
                'light-gray-background': '#F8F8F8',
                background: '#F8F8F8',
                secondary: '#C4A484',
                foreground: '#333333',
                'secondary-foreground': '#333333',
                'primary-foreground': '#FFFFFF',
                primary: '#0A3A2A'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/typography')],
}
