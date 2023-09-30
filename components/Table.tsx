import { mdiCheck, mdiClose, mdiPlus, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { StockItem, StockItems } from "../@types";
import { stockContext } from "../context/stock";

const Table = ({ data }: { data: StockItems }) => {
  const { add, edit, remove, refresh, isLoaded } = useContext(stockContext);

  const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(
    null
  );
  const confirmDelete = (id: number) => {
    remove(id)
      .then(() => {
        setShowConfirmDelete(null);
        refresh();
      })
      .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitSuccessful },
  } = useForm<StockItem>();

  const addItem: SubmitHandler<StockItem> = (data) => add(data);

  useEffect(() => {
    console.log("success changed at least.", { isSubmitSuccessful });
    if (isSubmitSuccessful) {
      refresh();
      reset();
      console.log("success");
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <MainTable>
        <thead>
          <tr>
            <HeadCell>Name</HeadCell>
            <HeadCell>Manufacturer</HeadCell>
            <HeadCell>Stock Level</HeadCell>
            <HeadCell size={"short"}>-</HeadCell>
          </tr>
        </thead>
        <tbody>
          {data.map((item: StockItem, id: number) => (
            <Row data-id={id} data-pending-delete={id === showConfirmDelete}>
              <BodyCell size={"long"}>{item.name}</BodyCell>
              <BodyCell size={"long"}>{item.manufacturer}</BodyCell>
              <BodyCell size={"normal"}>{item.stockLevel}</BodyCell>
              <BodyCell size={"short"}>
                <IconButton onClick={() => setShowConfirmDelete(id)}>
                  <Icon path={mdiTrashCanOutline} />
                </IconButton>
              </BodyCell>
            </Row>
          ))}
        </tbody>
      </MainTable>
      <form onSubmit={handleSubmit(addItem)}>
        <MainTable
          css={`
            border-top: 0 none;
          `}
        >
          <tbody>
            <Row>
              <BodyCell size={"long"}>
                <Input
                  type={"text"}
                  {...register("name", {
                    required: true,
                    validate: (value) => !!value.trim(),
                  })}
                  data-error={errors.name?.message}
                />
              </BodyCell>
              <BodyCell size={"long"}>
                <Input
                  type={"text"}
                  {...register("manufacturer", {
                    required: true,
                    validate: (value) => !!value.trim(),
                  })}
                  data-error={errors.manufacturer?.message}
                />
              </BodyCell>
              <BodyCell size={"normal"}>
                <Input
                  type={"number"}
                  {...register("stockLevel", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  data-error={errors.stockLevel?.message}
                />
              </BodyCell>
              <BodyCell size={"short"}>
                <IconButton type={"submit"}>
                  <Icon path={mdiPlus} />
                </IconButton>
              </BodyCell>
            </Row>
          </tbody>
        </MainTable>
      </form>
      <ConfirmDeleteDialogue data-delete-id={showConfirmDelete}>
        <ConfirmText>
          Are You sure you want to delete{" "}
          <strong>
            {showConfirmDelete !== null && data[showConfirmDelete].name}
          </strong>
          ?
        </ConfirmText>
        <Options>
          <ConfirmButton
            onClick={() => confirmDelete(showConfirmDelete as number)}
          >
            <Icon path={mdiCheck} color={"red"} />
            Yes
          </ConfirmButton>
          <CancelButton onClick={() => setShowConfirmDelete(null)}>
            <Icon path={mdiClose} color={"green"} />
            No
          </CancelButton>
        </Options>
      </ConfirmDeleteDialogue>
    </>
  );
};
export default Table;

const MainTable = styled.table`
  width: 850px;
  max-width: 100vw;
  border-collapse: collapse;
  font-family: Tahoma, Geneva, sans-serif;
  table tbody td {
    color: rgb(99, 99, 99);
    border: 1px solid rgb(221, 223, 225);
  }
  table tbody tr {
    background-color: rgb(249, 250, 251);
  }
  table tbody tr:nth-child(odd) {
    background-color: rgb(255, 255, 255);
  }
`;

const Cell = styled.td`
  padding: 15px;
`;

const HeadCell = styled(Cell).attrs({ as: "th" })<{ size?: "short" }>`
  text-align: start;
  background-color: rgb(84, 88, 93);
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 13px;
  border: 1px solid rgb(84, 88, 93);
  ${(p) => p.size === "short" && `text-align: center;`};
`;

const Row = styled.tr`
  transition-property: filter, background-color;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  background-color: rgb(249, 250, 251);
  &:nth-child(odd) {
    background-color: rgb(255, 255, 255);
  }
  filter: blur(0px);
  &[data-pending-delete="true"] {
    background-color: rgb(249, 225, 225);
    filter: blur(1px);
  }
`;

const BodyCell = styled(Cell)<{ size?: "short" | "normal" | "long" }>`
  text-align: start;
  color: rgb(99, 99, 99);
  border: 1px solid rgb(221, 223, 225);
  ${(p) => p.size === "long" && `width: 250px;`};
  ${(p) => p.size === "normal" && `width: 100px;`};
  ${(p) => p.size === "short" && `width: 50px;`};
`;

const GenericButton = styled.button``;
const IconButton = styled(GenericButton)`
  border: 0 none;
  background-color: transparent;
  color: currentColor;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const ConfirmDeleteDialogue = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  max-width: 95vw;
  height: 150px;
  padding: 20px;
  background-color: rgba(230, 230, 230, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  backdrop-filter: blur(3px);
  gap: 10px;

  transition: opacity 0.5s ease-out;
  opacity: 0;
  pointer-events: none;
  &[data-delete-id] {
    opacity: 1;
    pointer-events: all;
  }
`;
const ConfirmText = styled.div`
  user-select: none;
  text-shadow: 0px 0px 2px white;
`;
const Options = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const ConfirmButton = styled(GenericButton)`
  display: flex;
  flex-direction: row;
`;
const CancelButton = styled(GenericButton)`
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  outline: 0 none;
  border: 1px solid rgba(100, 100, 100, 0.8);
  border-radius: 4px;
  padding: 5px;
  width: 100%;
  transition: border-left-width 0.2s ease-in;
  &[data-error] {
    border-left-width: 8px;
    border-left-color: red;
  }
`;
