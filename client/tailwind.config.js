/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
        body: ["Nunito Sans", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ocean: {
          50: "#ecfeff",
          100: "#cffafe",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          950: "#083344"
        },
        clinic: {
          50: "#f8fbff",
          100: "#eaf6ff",
          500: "#2bb3ff",
          700: "#0878c7",
          950: "#081827"
        }
      },
      boxShadow: {
        glow: "0 20px 80px rgba(14, 165, 233, 0.18)"
      }
    }
  },
  plugins: []
};
