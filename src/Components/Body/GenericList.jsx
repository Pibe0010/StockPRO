import styled from "styled-components";
import { BtnClose } from "../../index.js";
import { device } from "../../Styles/Breackpoints.jsx";

export const GenericList = ({ data, setState, handlerFunction, scroll, bottom }) => {
  const addSelection = (params) => {
    handlerFunction(params);
    setState();
  };

  return (
    <Container $scroll={scroll} $bottom={bottom}>
      <BtnClose handlerCloseFunction={setState} />
      <section className="content-items">
        {data.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => addSelection(item)}>
              <span>💎</span>
              <span>{item.description}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  bottom: ${(props) => props.$bottom};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  z-index: 3;
  height: 230px;
  @media ${device.tablet} {
    width: 400px;
  }
  .content-items {
    overflow-y: ${(props) => props.$scroll};
  }
`;
const ItemContainer = styled.div`
  display: flex;
  gap: 10px;
  bordrer-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;
