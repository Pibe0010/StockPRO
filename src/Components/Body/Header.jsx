import styled from "styled-components";
import {
  BtnCircular,
  UserAuth,
  v,
  DropDownList,
  UserDropDown,
  useAuthStore,
} from "../../index";
import person from "../../assets/person_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg";

export const Header = ({ stateConfig }) => {
  const { signOut } = useAuthStore();
  const { user } = UserAuth();

  const funcionXtipo = async (params) => {
    if (params.tipo === "logout") {
      await signOut();
    }
  };

  return (
    <Container>
      <Datauser onClick={stateConfig.setState}>
        <div className="imgContainer">
          <img src={person} alt="icon person" />
        </div>
        <BtnCircular
          icono={<v.iconocorona />}
          width="25px"
          height="25px"
          bgcolor="#d70000"
          textcolor="#ffffff"
          fontsize="11px"
          translatex="-50px"
          translatey="-12px"
        />
        <span className="nombre">{user.email}</span>
        {stateConfig.state && (
          <DropDownList
            data={UserDropDown}
            top="62"
            funcion={(params) => funcionXtipo(params)}
          />
        )}
      </Datauser>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: end;
`;
const Datauser = styled.div`
  z-index: 10;
  position: relative;
  top: 0;
  right: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;
  .imgContainer {
    height: 40px;
    width: 40px;
    min-height: 40px;
    min-width: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      object-fit: cover;
      background-color: #000000;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;
