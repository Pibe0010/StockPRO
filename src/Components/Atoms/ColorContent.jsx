import styled from "styled-components";
export const ColorContent = styled.div`
  display: flex;
  justify-content: center;
  min-height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  background-color: ${(props) => props.$color};
  border-radius: 50%;
  text-align: center;
`;
