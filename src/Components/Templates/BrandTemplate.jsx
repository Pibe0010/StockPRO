import styled from "styled-components";
import {
  BrandTable,
  Header,
  RegisterBrands,
  BtnFilter,
  ContentFilter,
  Title,
  v,
  Search,
  BrandStore,
} from "../../index.js";
import { useState } from "react";

export const BrandTemplate = ({ data }) => {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [action, setAction] = useState("");
  const [openRegister, setOpenRegister] = useState(false);
  const { setSearch } = BrandStore();

  const newRegister = () => {
    setOpenRegister(!openRegister);
    setAction("Create");
    setDataSelect([]);
  };

  return (
    <Container>
      {openRegister && (
        <RegisterBrands
          onClose={() => setOpenRegister(!openRegister)}
          dataSelect={dataSelect}
          action={action}
        />
      )}

      <header className="header">
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </header>
      <section className="area_one">
        <ContentFilter>
          <Title>Brands</Title>
          <BtnFilter
            handlerFunction={newRegister}
            bgColor={"#f0f0f0"}
            textColor="#353535"
            icon={<v.agregar />}
          />
        </ContentFilter>
      </section>
      <section className="area_two">
        <Search setSearch={setSearch} />
      </section>
      <main className="main">
        <BrandTable
          data={data}
          setOpenRegister={setOpenRegister}
          setDataSelect={setDataSelect}
          setAction={setAction}
        />
      </main>
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
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
`;
