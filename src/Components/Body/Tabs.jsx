import { useState } from "react";
import styled from "styled-components";
import { v } from "../../Styles/Variables.jsx";
import { device } from "../../Styles/Breackpoints.jsx";
import { KardexTable } from "../../index.js";

export const Tabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handlerClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Container className="container" $activeTab={`${activeTab}00%`}>
      <ul className="tabs">
        <li className={activeTab === 0 ? "active" : ""} onClick={() => handlerClick(0)}>
          {<v.iconopie />}Kardex
        </li>
        <span className="glider"></span>
      </ul>
      <div className="tab-content">
        {activeTab === 0 && <KardexTable data={data} />}
        {activeTab === 1 && <div>Tab 2</div>}
        {activeTab === 2 && <div>Tab 3</div>}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #6a6b6c;
  border-radius: 15px;
  .tabs {
    list-style: none;
    display: flex;
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    top: 0;
    left: 0;
    flex-direction: column;
    @media ${device.tablet} {
      flex-direction: row;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 180px;
      height: 54px;
      font-size: 1.25rem;
      font-weight: 500;
      border-radius: 99px;
      cursor: pointer;
      transition: color 0.15s ease-in; 
      }
      .glider {
        position: absolute;
        color: #fff;
        height: 54px;
        width: 4px;
        background-color: #d70000;
        z-index: 1;
        border-radius: 15px;
        transition: all 0.25s ease-out;
        transform: translateY(${(props) => props.$activeTab});
        box-shadow: 0px 10px 20px -3px #ff0000;
        top: 0;
        @media ${device.tablet} {
            transform: translateX(${(props) => props.$activeTab});
            height: 4px;
            width: 180px;
            bottom: 0;
            top:100%;
        }
      }
    }
  }
    .tab-content {
        margin-top: 20px;
        height: 100%;
        width: 100%;
    }
`;
