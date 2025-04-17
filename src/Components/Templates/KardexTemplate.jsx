import styled from "styled-components";
import {
  Header,
  ContentFilter,
  Title,
  Search,
  BtnSave,
  Tabs,
  RegisterKardex,
  KardexStore,
} from "../../index.js";
import { useState } from "react";

export const KardexTemplate = ({ data }) => {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [action, setAction] = useState("");
  const [openRegister, setOpenRegister] = useState(false);
  const { setSearch } = KardexStore();
  const [type, setType] = useState("");

  const newEntry = () => {
    setOpenRegister(true);
    setType("entry");
  };

  const newOutput = () => {
    setOpenRegister(true);
    setType("output");
  };

  return (
    <Container>
      {openRegister && (
        <RegisterKardex
          onClose={() => setOpenRegister(!openRegister)}
          dataSelect={dataSelect}
          action={action}
          type={type}
        />
      )}

      <header className="header">
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </header>
      <section className="area_one">
        <ContentFilter>
          <Title>Kardex</Title>
          <BtnSave bgcolor="#00b806" titulo="Entry" funcion={newEntry} />
          <BtnSave bgcolor="#ff0000" titulo="Ouput" funcion={newOutput} />
        </ContentFilter>
      </section>
      <section className="area_two">
        <Search setSearch={setSearch} />
      </section>
      <main className="main">
        <Tabs data={data} />
      </main>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area_one" 100px
    "area_two" 100px
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
  }
  .area_two {
    grid-area: area_two;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
`;
