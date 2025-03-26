import styled, { ThemeProvider } from "styled-components";
import { MyRoutes, Light, Dark, Sidebar, MenuHambur } from "./index.js";
import { createContext, useState } from "react";
import { device } from "./Styles/Breackpoints.jsx";
export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = theme === "light" ? "light" : "dark";
  const themeStyle = toggleTheme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themeStyle}>
        <Container className={sidebarOpen ? "active" : ""}>
          <section className="content-sidebar">
            <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
          </section>
          <section className="content-hamburger">
            <MenuHambur />
          </section>
          <section className="content-routes">
            <MyRoutes />
          </section>
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};
  .content-sidebar {
    display: none;
  }
  .content-hamburger {
    display: block;
    position: absolute;
    left: 20px;
  }
  .content-routes {
    padding: 0 1rem;
  }

  @media ${device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .content-sidebar {
      display: initial;
    }
    .content-hamburger {
      display: none;
    }
  }
  .content-routes {
    grid-column: 1;
    width: 100%;
    @media ${device.tablet} {
      grid-column: 2;
    }
  }
`;

export default App;
