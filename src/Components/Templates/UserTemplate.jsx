import styled from "styled-components";
import {
  Header,
  BtnFilter,
  ContentFilter,
  Title,
  v,
  Search,
  RegisterUser,
  UsersTable,
  UserStore,
} from "../../index.js";
import { useState } from "react";

export const UserTemplate = ({ data }) => {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [action, setAction] = useState("");
  const [openRegister, setOpenRegister] = useState(false);
  const { setSearch } = UserStore();

  const newRegister = () => {
    setOpenRegister(!openRegister);
    setAction("Create");
    setDataSelect([]);
  };

  return (
    <Container>
      {openRegister && (
        <RegisterUser
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
          <Title>Staff</Title>
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
        <UsersTable
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
