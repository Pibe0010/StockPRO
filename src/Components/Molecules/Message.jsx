import styled from "styled-components";

export const Message = ({ state }) => {
  return (
    <Container className={state ? "" : "visible"}>
      <span className="icon">🚫</span>
      <span className="text">Do not have permissions to this module</span>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 10;
  background: rgba(26, 9, 9, 0.9);
  border: 1px solid rgba(248, 42, 45, 0.5);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  gap: 15px;
  width: 100%;
  height: 100%;
  opacity: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .text {
    color: #fff;
    text-align: center;
  }
  &:hover {
    &.visible {
      opacity: 1;
    }
  }
  .icon {
    font-size: 30px;
  }
`;
