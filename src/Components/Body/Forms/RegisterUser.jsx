import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../Styles/Variables.jsx";
import {
  InputText,
  BtnSave,
  CompanyStore,
  SelectContent,
  Selection,
  GenericList,
  DocTypeData,
  TypeUserData,
  ListModules,
  UserStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { device } from "../../../Styles/Breackpoints.jsx";
import { useQuery } from "@tanstack/react-query";
import SpinnerLoader from "../../Molecules/SpinnerLoader.jsx";

export const RegisterUser = ({ onClose, dataSelect, action }) => {
  const { InsertUser, updateUser, updatePermitsUser } = UserStore();
  const { dataCompany } = CompanyStore();
  const [stateDoc, setStateDoc] = useState(false);
  const [stateUserType, setStateUserType] = useState(false);
  const [docType, setDocType] = useState({ icon: "", description: "others" });
  const [userType, setUserType] = useState({ icon: "", description: "employer" });
  const [checkBox, setCheckBox] = useState([]);

  const { isLoading } = useQuery({
    queryKey: ["add permits update", { id_user: dataSelect.id }],
    queryFn: () => updatePermitsUser({ id_user: dataSelect.id }),
    enabled: action === "Update" && !!dataSelect?.id,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insert(data) {
    if (action === "Update") {
      const params = {
        id: dataSelect.id,
        name: data.name,
        personal_number: data.personal_number,
        phone: data.phone,
        address: data.address,
        role: userType.description,
        doc_type: docType.description,
      };
      await updateUser(params, checkBox, dataCompany.id);
      onClose();
    } else {
      const params = {
        name: data.name,
        email: data.email,
        personal_number: data.personal_number,
        phone: data.phone,
        address: data.address,
        role: userType.description,
        doc_type: docType.description,
        id_company: dataCompany.id,
      };

      const authParams = {
        email: data.email,
        password: data.password,
      };
      await InsertUser(authParams, params, checkBox);
      onClose();
    }
  }

  useEffect(() => {
    if (action === "Update") {
      setDocType({ icon: "", description: dataSelect.doc_type });
      setUserType({ icon: "", description: dataSelect.role });
    }
  }, []);

  if (isLoading) return <SpinnerLoader />;

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>{action == "Update" ? "Update user" : "New user"}</h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insert)}>
          <section className="section-one">
            {action !== "Update" ? (
              <article>
                <InputText icono={<v.icononombre />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.email}
                    type="email"
                    placeholder=""
                    {...register("email", {
                      required: true,
                    })}
                  />
                  <label className="form__label">E-mail</label>
                  {errors.email?.type === "required" && <p>Area is required</p>}
                </InputText>
              </article>
            ) : (
              <span className="form__field disabled">{dataSelect.email}</span>
            )}
            {action !== "Update" ? (
              <article>
                <InputText icono={<v.icononombre />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.password}
                    type="pasword"
                    placeholder=""
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  <label className="form__label">Password</label>
                  {errors.password?.type === "required" && <p>Area is required</p>}
                  {errors.password?.type === "minLength" && (
                    <p>It must have at least 6 characters and a symbol.</p>
                  )}
                </InputText>
              </article>
            ) : null}

            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.name}
                  type="text"
                  placeholder=""
                  {...register("name", {
                    required: true,
                  })}
                />
                <label className="form__label">Name</label>
                {errors.name?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <SelectContent>
              <label>Doc type:</label>
              <Selection
                color={"#d70000"}
                text_one="⏺ "
                text_two={docType.description}
                handlerFunction={() => setStateDoc(!stateDoc)}
                state={stateDoc}
              />
              {stateDoc && (
                <GenericList
                  data={DocTypeData}
                  scroll="scroll"
                  setState={() => setStateDoc(!stateDoc)}
                  bottom="-190px"
                  handlerFunction={(params) => setDocType(params)}
                />
              )}
            </SelectContent>
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.personal_number}
                  type="text"
                  placeholder=""
                  {...register("personal_number", {
                    required: true,
                  })}
                />
                <label className="form__label">Personal number</label>
                {errors.personal_number?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.phone}
                  type="text"
                  placeholder=""
                  {...register("phone", {
                    required: true,
                  })}
                />
                <label className="form__label">Phone</label>
                {errors.phone?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.address}
                  type="text"
                  placeholder=""
                  {...register("address", {
                    required: true,
                  })}
                />
                <label className="form__label">Address</label>
                {errors.address?.type === "required" && <p>Area is required</p>}
              </InputText>
            </article>
          </section>
          <section className="section-two">
            <SelectContent>
              <label>Role:</label>
              <Selection
                color={"#d70000"}
                text_one="👨‍💼 "
                text_two={userType.description}
                handlerFunction={() => setStateUserType(!stateUserType)}
                state={stateUserType}
              />
              {stateUserType && (
                <GenericList
                  data={TypeUserData}
                  scroll="scroll"
                  setState={() => setStateUserType(!stateUserType)}
                  bottom="-150px"
                  handlerFunction={(params) => setUserType(params)}
                />
              )}
            </SelectContent>
            PERMITS: 🔑
            <ListModules checkBox={checkBox} setCheckBox={setCheckBox} action={action} />
          </section>
          <div className="btnguardarContent">
            <BtnSave icono={<v.iconoguardar />} titulo="Save" bgcolor="#f8f2fd" />
          </div>
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
  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: ${(props) => props.theme.text};
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    &.disabled {
      color: #696969;
      background: #2d2d2d;
      border-radius: 8px;
      margin-top: 8px;
      border-bottom: 1px dashed #656565;
      padding: 8px;
    }
  }

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
