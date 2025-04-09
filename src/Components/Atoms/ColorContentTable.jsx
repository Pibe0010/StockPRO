import styled from "styled-components";
import { device } from "../../Styles/Breackpoints.jsx";
export const ColorContentTable = styled.div`
  color: ${(props) => props.$color};
  border-radius: 8px;
  border: 1px solid ${(props) => props.$color};
  text-align: center;
  padding: 3px;
  width: 70%;
  @media ${device.tablet} {
    width: 100%;
  }
`;
