import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
      box-sizing: border-box;
    }
    /*
      2. Remove default margin
    */
    * {
      margin: 0;
    }
    /*
      Typographic tweaks!
      3. Add accessible line-height
      4. Improve text rendering
    */
    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      font-family: "IBM Plex Sans", sans-serif;
    }
    /*
      5. Improve media defaults
    */
    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }
    /*
      6. Remove built-in form typography styles
    */
    input, button, textarea, select {
      font: inherit;
    }
    /*
      7. Avoid text overflows
    */
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
