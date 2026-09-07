import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "mbjj-blue": "#29ABE2",
        "mbjj-black": "#0A0A0A",
      },
    },
  },
  plugins: [],
};

export default config;
