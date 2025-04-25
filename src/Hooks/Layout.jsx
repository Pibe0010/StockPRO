import styled from "styled-components";
import { CompanyStore, ErrorPage, MenuHambur, Sidebar, UserStore } from "../index.js";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { device } from "../Styles/Breackpoints.jsx";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addUsers, addPermits, idUser } = UserStore();
  const { addCompany } = CompanyStore();

  const {
    data: dataUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["add users"],
    queryFn: addUsers,
  });

  const { data: dataCompany } = useQuery({
    queryKey: ["add company"],
    queryFn: async () => {
      const result = await addCompany({ id_user: idUser });
      return result ?? null;
    },
    enabled: !!dataUsers,
  });

  const { data: dataPermits } = useQuery({
    queryKey: ["add permits", { id_user: idUser }],
    queryFn: async () => {
      const result = await addPermits({ id_user: idUser });
      return result ?? null;
    },
    enabled: !!dataUsers,
  });

  if (error) return <ErrorPage message={error.message} />;

  if (isLoading) return <SpinnerLoader />;

  return (
    <Container className={sidebarOpen ? "active" : ""}>
      <section className="content-sidebar">
        <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
      </section>
      <section className="content-hamburger">
        <MenuHambur />
      </section>
      <section className="content-routes">{children}</section>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};
  .content-sidebar {
    display: none;
  }
  .content-hamburger {
    display: block;
    position: absolute;
    left: 20px;
  }
  .content-routes {
    padding: 0 1rem;
  }

  @media ${device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .content-sidebar {
      display: initial;
    }
    .content-hamburger {
      display: none;
    }
  }
  .content-routes {
    grid-column: 1;
    width: 100%;
    @media ${device.tablet} {
      grid-column: 2;
    }
  }
`;
