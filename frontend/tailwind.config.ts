import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          darker: '#050814',
          blue: '#00d9ff',
          purple: '#9d4edd',
          pink: '#ff006e',
          green: '#06ffa5',
        },
      },
    },
  },
  plugins: [],
};
export default config;
