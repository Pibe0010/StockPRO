import { ThemeProvider } from "styled-components";
import { MyRoutes, Light, Dark } from "./index.js";
import { createContext, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = theme === "light" ? "light" : "dark";
  const themeStyle = toggleTheme === "light" ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themeStyle}>
        <MyRoutes />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
