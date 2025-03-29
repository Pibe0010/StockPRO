import styled from "styled-components";
import { GiPadlock } from "react-icons/gi";

export const FooterLogin = () => {
  return (
    <Container>
      <section className="lock">
        <GiPadlock />
        <span>
          This is a secure Daniel Montero. If you have any questions about the
          authenticity of this website, please contact
          <br /> us at salamapatela@gmail.com or through our digital media.
        </span>
      </section>
      <section className="derechos">
        <span>StockPRO S.A - RUC: 20530019318</span>
        <div className="separador"></div>
        <span>All rights reserved</span>
        <div className="separador"></div>
        <span>© 2025 Danile Montero</span>
      </section>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12.2px;
  color: #91a4b7;
  gap: 5px;
  .lock {
    border-bottom: 1px solid rgba(145, 164, 183, 0.3);
    gap: 5px;
    display: flex;
    align-items: center;
  }
  .derechos {
    display: flex;
    justify-content: space-between;
    .separador {
      width: 1px;
      background-color: rgba(145, 164, 183, 0.3);
      margin-top: 4px;
      height: 80%;
      align-items: center;
      display: flex;
    }
    span {
      margin-top: 5px;
    }
  }
`;
