import styled from "styled-components";
import { v } from "../../Styles/Variables.jsx";

export const BtnClose = ({ handlerCloseFunction }) => {
  return (
    <Container onClick={handlerCloseFunction}>
      <v.iconocerrar />
    </Container>
  );
};
const Container = styled.div`
  cursor: pointer;
  fotn-size: 25px;
  transition: all 0.2s;
  &:hover {
    color: ${v.colorselector};
  }
`;
