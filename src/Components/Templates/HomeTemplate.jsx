import styled from "styled-components";
import { BtnSave, useAuthStore } from "../../index.js";

export const HomeTemplate = () => {
  const { signOut } = useAuthStore();
  return (
    <Container>
      <div>HomeTemplate</div>
      <BtnSave titulo="Logout" bgcolor={"#f8f2fd"} funcion={signOut} />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
