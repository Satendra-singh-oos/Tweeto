/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".scrollbar-none": {
          "scrollbar-width": "none" /* For Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* For Chrome, Safari, and Edge */,
          },
        },
      });
    },
  ],
};
