import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../Styles/Variables.jsx";
import {
  InputText,
  BtnSave,
  CompanyStore,
  Search,
  GenericList,
  ProductStore,
  ProductCardSelect,
  KardexStore,
  UserStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";

export const RegisterKardex = ({ onClose, dataSelect, action, type }) => {
  const { insertKardex } = KardexStore();
  const { dataCompany } = CompanyStore();
  const { dataProduct, setSearch, selectProduct, selectItemProduct } = ProductStore();
  const { idUser } = UserStore();
  const [stateListProduct, setStateListProduct] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insert(data) {
    const params = {
      created_at: new Date(),
      type: type,
      id_user: idUser,
      cuantity: parseFloat(data.cuantity),
      details: data.details,
      id_product: selectItemProduct.id,
      id_company: dataCompany.id,
    };
    await insertKardex(params);
    onClose();
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
            <h1>{type == "entry" ? "New entry" : "New output"}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <div className="content-search">
          <div onClick={() => setStateListProduct(!stateListProduct)}>
            <Search setSearch={setSearch} />
          </div>
          {stateListProduct && (
            <GenericList
              data={dataProduct}
              setState={() => setStateListProduct(!stateListProduct)}
              bottom="-120px"
              scroll="scroll"
              handlerFunction={selectProduct}
            />
          )}
        </div>
        <ProductCardSelect
          text_one={selectItemProduct.description}
          text_two={selectItemProduct.stock}
        />

        <form className="formulario" onSubmit={handleSubmit(insert)}>
          <section>
            <article>
              <InputText icono={<v.iconocalculadora />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.description}
                  type="number"
                  placeholder=""
                  {...register("cuantity", {
                    required: true,
                  })}
                />
                <label className="form__label">Cuantity</label>
                {errors.cuantity?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconotodos />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.description}
                  type="text"
                  placeholder=""
                  {...register("details", {
                    required: true,
                  })}
                />
                <label className="form__label">Details</label>
                {errors.details?.type === "required" && <p>Area is required</p>}
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
    .content-search {
      position: relative;
    }

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
