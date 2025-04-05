import styled from "styled-components";
import { Icono } from "../../index";
export const BtnSave = ({ funcion, titulo, bgcolor, icono, url }) => {
  return (
    <Container type="submit" $bgcolor={bgcolor}>
      <Icono>{icono}</Icono>

      <span className="btn" onClick={funcion}>
        <a href={url} target="_blank">
          {titulo}
        </a>
      </span>
    </Container>
  );
};
const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  gap: 10px;
  background-color: initial;
  z-index: 2;
  .btn {
    color: #090909;
    padding: 0.7em 1.7em;
    font-size: 18px;
    border-radius: 0.5em;
    background: ${({ $bgcolor }) => $bgcolor};
    cursor: pointer;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 1px 1px 2px #c5c5c5, -1px -1px 2px #ffffff;
    font-weight: 600;

    a {
      text-decoration: none;
      color: #000;
    }
    cursor: pointer;

    &:active {
      color: #666;
      box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
    }
  }
`;
