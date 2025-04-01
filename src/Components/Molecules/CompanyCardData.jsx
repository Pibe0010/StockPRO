import styled from "styled-components";

export const CompanyCardData = ({ title, value, img }) => {
  return (
    <Container>
      <div className="card">
        <div className="price-block-content">
          <p className="pricing-plan">{title}</p>
          <div className="price-value">
            <p className="price-number">{value}</p>
            {img && <img src={img} alt="Imagen" />}
          </div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  z-index: 1;
  .card {
    position: relative;
    background-color: #fffefe;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid #05060f;
    box-shadow: 5px 5px rgba(255, 0, 0, 0.2);
    overflow: hidden;
    color: #05060f;
    .price-block-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 0.5rem;
      .pricing-plan {
        color: #500000;
        font-size: 1.3rem;
        font-weight: 700;
        line-height: 1.25;
      }
      .price-value {
        display: flex;
        justify-content: center;
        color: #500000;
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 1.25;
        img {
          width: 50px;
        }
      }
    }
  }
`;
