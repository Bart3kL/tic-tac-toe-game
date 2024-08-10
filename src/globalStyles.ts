import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
    }

    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      font-family: "IBM Plex Sans", sans-serif;
    }
 
    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }

    input, button, textarea, select {
      font: inherit;
    }
  
    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }
`;

export const theme = {
  colors: {
    black: "#000",
    white: "#fff",
    "white-2": "#fbfcff",
    blue: "#456eff",
    "$blue-2": "#f7f9ff",
    midnight: "#0e1c36",
    paleLavender: "#d9def0",
  },
};
