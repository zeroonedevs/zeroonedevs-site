/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        clubBlue: "#2563eb",
        clubBlueMuted: "#1d4ed8",
        clubBlack: "#0a0a0a",
        clubPanel: "#111827"
      }
    }
  },
  plugins: []
};
