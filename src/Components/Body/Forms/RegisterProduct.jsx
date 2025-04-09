import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../Styles/Variables.jsx";
import {
  InputText,
  BtnSave,
  ConversionsCapitalize,
  CompanyStore,
  ProductStore,
  SelectContent,
  Selection,
  BrandStore,
  BtnFilter,
  RegisterBrands,
  GenericList,
  CategoryStore,
  RegisterCategory,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { device } from "../../../Styles/Breackpoints.jsx";

export const RegisterProduct = ({ onClose, dataSelect, action }) => {
  const { insertProduct, updateProduct } = ProductStore();
  const { dataCompany } = CompanyStore();
  const { selectItemBrand, dataBrand, selectBrand } = BrandStore();
  const { selectItemCategory, dataCategory, selectCategory } = CategoryStore();
  const [stateBrand, setStateBrand] = useState(false);
  const [openRegisterBrand, setOpenRegisterBrand] = useState(false);
  const [stateCategory, setStateCategory] = useState(false);
  const [openRegisterCategory, setOpenRegisterCategory] = useState(false);
  const [subAction, setSubAction] = useState("");

  const newRegisterBrand = () => {
    setOpenRegisterBrand(!openRegisterBrand);
    setSubAction("new");
  };

  const newRegisterCategory = () => {
    setOpenRegisterCategory(!openRegisterCategory);
    setSubAction("new");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insert(data) {
    if (action === "Update") {
      const params = {
        id: dataSelect.id,
        description: ConversionsCapitalize(data.description),
        id_brand: selectItemBrand.id,
        stock: parseFloat(data.stock),
        min_stock: parseFloat(data.min_stock),
        bar_code: parseFloat(data.bar_code),
        internal_code: data.internal_code,
        price_sales: parseFloat(data.price_sales),
        price_shopping: parseFloat(data.price_shopping),
        id_category: selectItemCategory.id,
        id_company: dataCompany.id,
      };
      await updateProduct(params);
      onClose();
    } else {
      const params = {
        _description: ConversionsCapitalize(data.description),
        _id_brand: selectItemBrand.id,
        _stock: parseFloat(data.stock),
        _min_stock: parseFloat(data.min_stock),
        _bar_code: parseFloat(data.bar_code),
        _internal_code: data.internal_code,
        _price_sales: parseFloat(data.price_sales),
        _price_shopping: parseFloat(data.price_shopping),
        _id_category: selectItemCategory.id,
        _id_company: dataCompany.id,
      };
      await insertProduct(params);
      onClose();
    }
  }

  useEffect(() => {
    if (action === "Update") {
      selectBrand({ id: dataSelect.id_brand, description: dataSelect.brand_name });
      selectCategory({
        id: dataSelect.id_category,
        description: dataSelect.category_name,
      });
    }
  }, []);

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>{action == "Update" ? "Update product" : "New product"}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insert)}>
          <section className="section-one">
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.description}
                  type="text"
                  placeholder=""
                  {...register("description", {
                    required: true,
                  })}
                />
                <label className="form__label">Description</label>
                {errors.description?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <SelectContent>
              <label>Brand:</label>
              <Selection
                text_one="👀"
                text_two={selectItemBrand?.description}
                color="#d70000"
                state={stateBrand}
                handlerFunction={() => setStateBrand(!stateBrand)}
              />
              {stateBrand && (
                <GenericList
                  data={dataBrand}
                  scroll={"scroll"}
                  setState={() => setStateBrand(!stateBrand)}
                  bottom="-260px"
                  handlerFunction={selectBrand}
                />
              )}
              <BtnFilter
                bgColor="#d70000"
                textColor="#353535"
                icon={<v.agregar />}
                handlerFunction={newRegisterBrand}
              />
            </SelectContent>
            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.stock}
                  type="number"
                  step="0.01"
                  placeholder=""
                  {...register("stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock</label>
                {errors.stock?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.min_stock}
                  type="number"
                  step="0.01"
                  placeholder=""
                  {...register("min_stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Minimum stock</label>
                {errors.min_stock?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <SelectContent>
              <label>Category:</label>
              <Selection
                text_one="👀"
                text_two={selectItemCategory?.description}
                color="#d70000"
                state={stateCategory}
                handlerFunction={() => setStateCategory(!stateCategory)}
              />
              {stateCategory && (
                <GenericList
                  data={dataCategory}
                  scroll={"scroll"}
                  setState={() => setStateCategory(!stateCategory)}
                  bottom="-260px"
                  handlerFunction={selectCategory}
                />
              )}
              <BtnFilter
                bgColor="#d70000"
                textColor="#353535"
                icon={<v.agregar />}
                handlerFunction={newRegisterCategory}
              />
            </SelectContent>
          </section>
          <section className="section-two">
            <article>
              <InputText icono={<v.iconocodigobarras />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.bar_code}
                  type="number"
                  placeholder=""
                  {...register("bar_code", {
                    required: true,
                  })}
                />
                <label className="form__label">Bar code</label>
                {errors.bar_code?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconocodigointerno />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.internal_code}
                  type="number"
                  placeholder=""
                  {...register("internal_code", {
                    required: true,
                  })}
                />
                <label className="form__label">Internal code</label>
                {errors.internal_code?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconoprecioventa />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.price_sales}
                  type="number"
                  placeholder=""
                  {...register("price_sales", {
                    required: true,
                  })}
                />
                <label className="form__label">Price sales</label>
                {errors.price_sales?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconopreciocompra />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.price_shopping}
                  type="number"
                  placeholder=""
                  {...register("price_shopping", {
                    required: true,
                  })}
                />
                <label className="form__label">Price shopping</label>
                {errors.price_shopping?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
          </section>
          <div className="btnguardarContent">
            <BtnSave icono={<v.iconoguardar />} titulo="Save" bgcolor="#f8f2fd" />
          </div>
        </form>
        {openRegisterBrand && (
          <RegisterBrands
            dataSelect={dataSelect}
            action={subAction}
            onClose={() => setOpenRegisterBrand(!openRegisterBrand)}
          />
        )}
        {openRegisterCategory && (
          <RegisterCategory
            dataSelect={dataSelect}
            action={subAction}
            onClose={() => setOpenRegisterCategory(!openRegisterCategory)}
          />
        )}
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
    width: 100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #484848;
      border-radius: 10px;
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
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      @media ${device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .btnguardarContent {
        display: flex;
        justify-content: end;
        grid-column: 1;
        @media ${device.tablet} {
          grid-column: 2;
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
