import styled from "styled-components";

export const ErrorPage = ({ message }) => {
  return (
    <Container>
      <div>Error {message}</div>
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;
