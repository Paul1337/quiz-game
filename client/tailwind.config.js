/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                rubik: ['Rubik'],
            },
            colors: {
                'main-bg': '#f6faf5',
                'second-bg': '#fffff7',
                main: '#656663',
                'main-transparent': 'border-gray-400', //'rgb(101 102 99 / 57%)',
            },
        },
    },
    plugins: [],
};
