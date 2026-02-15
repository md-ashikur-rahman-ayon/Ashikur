/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#141414", // dark primary
                secondary: "#F3F3F3", // light secondary
                accent: "#FFFFFF",
            },
            fontFamily: {
                custom: ['Inter', 'sans-serif'], // Or similar font available via index.html or font load.
            }
        },
    },
    plugins: [],
}
