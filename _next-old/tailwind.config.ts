import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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

export default config;
