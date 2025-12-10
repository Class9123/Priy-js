/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,pri}"],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        bounceScale: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" }
        }
      },
      animation: {
        slideUp: "slideUp 0.35s ease-out",
        bounceScale: "bounceScale 0.25s ease-out"
      }
    }
  },

  plugins: []
};
