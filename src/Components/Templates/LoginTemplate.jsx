import styled from "styled-components";
import {
  BtnSave,
  v,
  useAuthStore,
  InputText,
  FooterLogin,
  RegisterAdmin,
} from "../../index";
import { device } from "../../Styles/Breackpoints.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import carrito from "../../assets/carrito.svg";
import logo from "../../assets/icons8-producto.svg";
import { MdOutlineInfo } from "react-icons/md";
import { ThemeContext } from "../../App";

export const LoginTemplate = () => {
  const { setTheme } = useContext(ThemeContext);
  const { signInWithEmail } = useAuthStore();
  const [state, setState] = useState(false);
  const [initialState, setInitialState] = useState(false);

  useEffect(() => {
    setTheme("light");
  }, []);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function login(data) {
    const response = await signInWithEmail({
      email: data.email,
      password: data.password,
    });
    if (response) {
      navigate("/");
    } else {
      setInitialState(true);
    }
  }

  return (
    <Container>
      <div className="contentLogo">
        <img src={logo} alt="Icon logo"></img>
        <span>StockPRO</span>
      </div>
      <div className="bannerlateral">
        <img src={carrito} alt="Icon cart"></img>
      </div>

      <div className="contentCard">
        <div className="card">
          {state && <RegisterAdmin setState={() => setState(!state)} />}
          <Title>StockPRO</Title>
          {initialState && <InitialTextState>Incorrect data</InitialTextState>}
          <span className="ayuda">
            {" "}
            Create new account and <br></br>Ask your employer for access.{" "}
            <MdOutlineInfo />
          </span>
          <p className="frase">My stock control.</p>
          <form onSubmit={handleSubmit(login)}>
            <InputText icono={<v.iconoemail />}>
              <input
                className="form__field"
                type="text"
                placeholder="E-mail"
                {...register("email", {
                  required: true,
                })}
              />
              <label className="form__label">E-mail</label>
              {errors.email?.type === "required" && <p>Area required</p>}
            </InputText>
            <InputText icono={<v.iconopass />}>
              <input
                className="form__field"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />
              <label className="form__label">Password</label>
              {errors.password?.type === "required" && <p>Area required</p>}
            </InputText>
            <ContainerBtn>
              <BtnSave titulo="Login" bgcolor="#d70000" />
              <BtnSave
                funcion={() => setState(!state)}
                titulo="Create Account"
                bgcolor="#ffffff"
              />
            </ContainerBtn>
          </form>
        </div>
        <FooterLogin />
      </div>
    </Container>
  );
};
const Container = styled.div`
  background-size: cover;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #262626;
  @media ${device.tablet} {
    grid-template-columns: 1fr 2fr;
  }
  .contentLogo {
    position: absolute;
    top: 15px;
    font-weight: 700;
    display: flex;
    left: 15px;
    align-items: center;
    color: #fff;

    img {
      width: 50px;
    }
  }
  .cuadros {
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    transition: 0.6s;
  }

  .bannerlateral {
    background-color: #d70000;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .contentCard {
    grid-column: 2;
    background-color: #ffffff;
    background-size: cover;
    z-index: 100;
    position: relative;
    gap: 30px;
    display: flex;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content: center;
    width: auto;
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .card {
      padding-top: 80px;
      width: 100%;
      @media ${device.laptop} {
        width: 50%;
      }
    }
    .version {
      color: #d70000;
      text-align: start;
    }
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 40%;

        animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #d70000;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .ayuda {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #d70000;
      font-size: 15px;
      font-weight: 500;
    }
    &:hover {
      .contentsvg {
        top: -100px;
        opacity: 1;
      }
      .cuadros {
        transform: rotate(37deg) rotateX(5deg) rotateY(12deg) rotate(3deg) skew(2deg)
          skewY(1deg) scaleX(1.2) scaleY(1.2);
        color: red;
      }
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;
const Title = styled.span`
  font-size: 3rem;
  font-weight: 700;
`;
const ContainerBtn = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
const InitialTextState = styled.p`
  color: #d70000;
`;
