import styled from "styled-components";

export const ProductCardSelect = ({ text_one, text_two }) => {
  return (
    <Container>
      <span className="description">{text_one}</span>
      <span className="stock">Current stock: {text_two}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px dashed #54f04f;
  background-color: rgba(84, 240, 79, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  .description {
    color: #00e602;ç
    font-weight: bold;
  }
  .stock {
    color: ${({ theme }) => theme.text};
  }
`;
