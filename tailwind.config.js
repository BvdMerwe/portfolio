export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        serif: ["serif"],
      },
      fontSize: {
        h1: [
          "39px",
          {
            lineHeight: "normal",
          },
        ],
        h2: [
          "32px",
          {
            lineHeight: "normal",
          },
        ],
        h3: [
          "24px",
          {
            lineHeight: "normal",
          },
        ],
        paragraph: [
          "14px",
          {
            lineHeight: "normal",
          },
        ],
        "inline-link": [
          "14px",
          {
            lineHeight: "normal",
          },
        ],
        subheading: [
          "16px",
          {
            lineHeight: "normal",
          },
        ],
        footnote: [
          "10px",
          {
            lineHeight: "normal",
          },
        ],
      },
      fontWeight: {
        regular: "400",
        medium: "600",
        bold: "700",
      },
      spacing: {
        xxs: "2px",
        xs: "4px",
        sm: "8px",
        md: "15px",
        lg: "32px",
        xl: "64px",
      },
      colors: {
        "primary-light": "#FFFFFF",
        "primary-dark": "#1A1A1A",
        "secondary-light": "#FFFFFF88",
        "secondary-dark": "#1A1A1A88",
        highlight: "#00FF00",
        glass: "#00FF0088",
      },
      background: {
        "dark-gradient":
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, #1A1A1A 100%)",
        "light-gradient":
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, #FFFFFF 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      font: {},
    },
  },
};
