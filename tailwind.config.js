/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primaryColor: 'rgb(37, 47, 63)',
                secondaryColor: 'rgb(27, 33, 44)',
                primaryColorAlt: 'rgb(36, 48, 63)',
                secondaryColorAlt: 'rgb(72, 105, 147)'
            }
        },
    },
    plugins: [],
}
