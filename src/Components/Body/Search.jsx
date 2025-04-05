import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export const Search = ({ setSearch }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <article className="content">
        <FaSearch className="icon" />
        <input type="text" onChange={handleSearch} placeholder="Search" />
      </article>
    </Container>
  );
};
const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  height: 60px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  border: 1px solid #414244;
  .content {
    padding: 15px;
    gap: 10px;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    .icon {
      font-size: 18px;
    }
    input {
      width: 100%;
      background: none;
      border: 0;
      outline: none;
      color: ${({ theme }) => theme.text};
      font-size: 18px;
    }
  }
`;
