import styled from "styled-components";
import { v } from "../../index.js";

export const Selection = ({ color, state, handlerFunction, text_one, text_two }) => {
  return (
    <Container $color={color} $state={state} onClick={handlerFunction}>
      <div>
        <span>{text_one}</span>
        <span>{text_two}</span>
      </div>
      <span className={state ? "open" : "close"}>
        <v.iconoFlechabajo className="icon" />
      </span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  cursor: pointer;
  border: 2px solid ${(props) => props.$color};
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  transition: 0.3s;
  font-weight: 600;
  box-shadow: 4px 9px 20px -12px ${(props) => props.$color};
  .open,
  .close {
    transition: 0.3s;
    transform-origin: center center;
  }
  .open {
    transition: 0.3s;
    transform: rotate(0deg);
  }
  .close {
    transition: 0.3s;
    transform: rotate(180deg);
  }
  .icon {
    display: block;
  }
  &:hover {
    background-color: ${(props) => props.$color};
    color: #000;
  }
`;
