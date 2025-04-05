import styled from "styled-components";

export const BtnFilter = ({ bgColor, textColor, icon, handlerFunction }) => {
  return (
    <Container $bgColor={bgColor} $textColor={textColor} onClick={handlerFunction}>
      <div className="content-icon">
        <span>{icon}</span>
      </div>
    </Container>
  );
};
const Container = styled.div`
  min-width: 50px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow: 1px 1px 5px #bebebe, -1px -1px 5px #ffffff;
  border-radius: 50%;
  color: ${(props) => props.$textColor};
  font-size: 20px;
  position: relative;
  cursor: pointer;
  .content-icon {
    position: absolute;
    top: 25%;
    bottom: 25%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    transition: 0.2s;
    &:hover {
      transform: scale(1.3);
    }
  }
`;
