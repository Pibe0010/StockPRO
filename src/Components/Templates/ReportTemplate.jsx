import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

export const ReportTemplate = () => {
  return (
    <Container>
      <PageContent>
        <Content>
          <Outlet />
        </Content>
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Current stock</SidebarTitle>
            <SidebarItems to="current-stock-product">By product</SidebarItems>
            <SidebarItems to="all-stock">All stock</SidebarItems>
            <SidebarItems to="min-stock">Min stock</SidebarItems>
          </SidebarSection>
          <SidebarSection>
            <SidebarTitle>Entry and exit</SidebarTitle>
            <SidebarItems to="current-kardex">By product</SidebarItems>
          </SidebarSection>
          <SidebarSection>
            <SidebarTitle>Stock valuation</SidebarTitle>
            <SidebarItems to="inventory-valued">All valued</SidebarItems>
          </SidebarSection>
        </Sidebar>
      </PageContent>
    </Container>
  );
};
const Content = styled.div`
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  flex: 1;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Sidebar = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 700px) {
    width: 250px;
    order: 2;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.color2};
  padding: 12px;
`;

const SidebarTitle = styled.div`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const SidebarItems = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  margin: 5px;
  padding: 0 5%;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  height: 60px;
  &:hover {
    color: ${(props) => props.theme.colorSubtitle};
  }
  &.active {
    background: ${(props) => props.theme.bg6};
    border: 2px solid ${({ theme }) => theme.bg5};
    color: ${(props) => props.theme.color1};
    font-weight: 600;
  }
`;
