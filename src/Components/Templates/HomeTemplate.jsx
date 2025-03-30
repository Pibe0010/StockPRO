import styled from "styled-components";
import { Header } from "../../index.js";
import { useState } from "react";

export const HomeTemplate = () => {
  const [state, setState] = useState(false);

  return (
    <Container>
      <header className="header">
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </header>
      <section className="area_one"></section>
      <section className="area_two"></section>
      <main className="main"></main>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area_one" 100px
    "area_two" 100px
    "main" auto;
  .header {
    grid-area: header;
    background-color: rgba(103, 83, 241, 0.14);
  }
  .area_one {
    grid-area: area_one;
    background-color: rgba(2293, 83, 241, 0.14);
  }
  .area_two {
    grid-area: area_two;
    background-color: rgba(77, 237, 106, 0.14);
  }
  .main {
    grid-area: main;
    background-color: rgba(255, 0, 0, 0.14);
  }
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
`;
