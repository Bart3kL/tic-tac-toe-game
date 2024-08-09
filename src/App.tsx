import { ThemeProvider } from "styled-components";

import { HomePage } from "./pages/homePage";

import { theme } from "./globalStyles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
