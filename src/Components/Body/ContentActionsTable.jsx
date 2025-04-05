import styled from "styled-components";
import { ActionTable, v } from "../../index.js";

export const ContentActionsTable = ({ handlerUpdate, handlerDelete }) => {
  return (
    <Container>
      <ActionTable
        handlerFunction={handlerUpdate}
        icon={<v.iconeditarTabla />}
        color={"#7d7d7d"}
        fontSize={"18px"}
      />
      <ActionTable
        handlerFunction={handlerDelete}
        icon={<v.iconeliminarTabla />}
        color={"#d70000"}
        fontSize={"18px"}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 48em) {
    justify-content: end;
  }
`;
