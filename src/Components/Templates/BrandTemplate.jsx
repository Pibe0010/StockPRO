import styled from "styled-components";
import { Header, Title } from "../../index.js";
import { useState } from "react";

export const BrandTemplate = () => {
  const [state, setState] = useState(false);

  return (
    <Container>
      <header className="header">
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </header>
      <section className="area_one">
        <Title></Title>
      </section>
      <main className="main"></main>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area_one" 100px
    "main" auto;
  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area_one {
    grid-area: area_one;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
`;
