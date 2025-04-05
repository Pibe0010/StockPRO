import { useEffect } from "react";
import styled from "styled-components";
import { v } from "../../../Styles/Variables.jsx";
import {
  InputText,
  BtnSave,
  ConversionsCapitalize,
  BrandStore,
  CompanyStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";

export const RegisterBrands = ({ onClose, dataSelect, action }) => {
  const { insertBrand, updateBrand } = BrandStore();
  const { dataCompany } = CompanyStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insert(data) {
    if (action === "Update") {
      const params = {
        id: dataSelect.id,
        description: ConversionsCapitalize(data.name),
      };
      await updateBrand(params);
      onClose();
    } else {
      const params = {
        _description: ConversionsCapitalize(data.name),
        _id_company: dataCompany.id,
      };
      await insertBrand(params);
      onClose();
    }
  }

  useEffect(() => {
    if (action === "Update") {
    }
  }, []);

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>{action == "Update" ? "Update brand" : "New brand"}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insert)}>
          <section>
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.description}
                  type="text"
                  placeholder=""
                  {...register("name", {
                    required: true,
                  })}
                />
                <label className="form__label">Brand</label>
                {errors.name?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>

            <div className="btnguardarContent">
              <BtnSave icono={<v.iconoguardar />} titulo="Save" bgcolor="#f8f2fd" />
            </div>
          </section>
        </form>
      </div>
    </Container>
  );
};
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
