import styled from "styled-components";
import { v } from "../../../index.js";

export const Pagination = ({ table, initialPage, pageSize, setPage, maxPeges }) => {
  return (
    <Container>
      <button onClick={() => initialPage()} disabled={!table.getCanPreviousPage()}>
        <span className="icons">{<v.iconotodos />}</span>
      </button>
      <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        <span className="icons right">{<v.iconoflechaderecha />}</span>
      </button>
      <span>{pageSize}</span>
      <p>Of</p>
      <span>{maxPeges}</span>
      <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
        <span className="icons">{<v.iconoflechaderecha />}</span>
      </button>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  button {
    background-color: #d70000;
    border: none;
    border-radius: 3px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
    &:hover {
      box-shadow: 0px 10px 15px -3px #b10303;
    }
    .icons {
      color: #ffffff;
      &.right {
        transform: rotate(180deg);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  button[disabled] {
    background-color: #646464;
    cursor: no-drop;
    box-shadow: none;
  }
`;
