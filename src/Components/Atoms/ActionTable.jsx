import styled from "styled-components";

export const ActionTable = ({ handlerFunction, icon, color, fontSize }) => {
  return (
    <Container onClick={handlerFunction} $color={color} $fontSize={fontSize}>
      {icon}
    </Container>
  );
};
const Container = styled.span`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  cursor: pointer;
`;
