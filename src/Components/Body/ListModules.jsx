import styled from "styled-components";
import { useEffect, useState } from "react";
import { UserStore } from "../../index.js";

export const ListModules = ({ checkBox, setCheckBox, action }) => {
  const { dataModules, dataPermitsUser } = UserStore();
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (action === "Update") {
      let AllDocs = [];

      dataModules.map((element) => {
        const statePermits = dataPermitsUser?.some((obj) =>
          obj.modules.name.includes(element.name)
        );

        if (statePermits) {
          AllDocs.push({ ...element, check: true });
        } else {
          AllDocs.push({ ...element, check: false });
        }

        setCheckBox(AllDocs);
      });
    } else {
      setCheckBox(dataModules);
    }
  }, [dataPermitsUser]);

  const SelectPermits = (e) => {
    let check = e.target.checked;
    setIsChecked(check);
  };

  const HandlerCheckbox = (id) => {
    setCheckBox((prev) => {
      return prev?.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        } else {
          return { ...item };
        }
      });
    });
  };

  return (
    <Container>
      {checkBox?.map((item, index) => {
        return (
          <div className="content" key={index} onClick={() => HandlerCheckbox(item.id)}>
            <input
              className="checkbox"
              type="checkbox"
              onChange={(e) => SelectPermits(e)}
              checked={item.check}
            />
            <span>{item.name}</span>
          </div>
        );
      })}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px dashed #414244;
  border-radius: 14px;
  padding: 20px;
  gap: 15px;
  .content {
    display: flex;
    gap: 20px;
  }
  .checkbox {
    appearance: none;
    overflow: hidden;
    min-width: 30px;
    aspect-ratio: 1/1;
    border-radius: 30% 70% 70% 30%/30% 30% 70% 70%;
    border: 2px solid #d70000;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .checkbox::before {
    position: absolute;
    inset: 0;
    content: "";
    font-size: 35px;
    transition: all 0.2s ease-in-out;
  }

  .checkbox:checked {
    border: 2px solid #500000;
    background: linear-gradient(135deg, #d70000 0%, #d70000 100%);
    box-shadow: -5px -5px 30px rgba(215, 0, 0, 1), 5px 5px 30px rgba(215, 0, 0, 1);
  }

  .checkbox:checked::before {
    background: linear-gradient(135deg, #d700000%, #d70000 100%);
  }
`;
