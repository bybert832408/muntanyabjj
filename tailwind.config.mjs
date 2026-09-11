/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "blue-logo": "#00AEF0",
        "blue-kimono": "#1E3A8A",
        ink: "#0A0A0A",
        offwhite: "#F7F9FB",
        "yellow-kids": "#FACC15",
      },
    },
  },
  plugins: [],
};
