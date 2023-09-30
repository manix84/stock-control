import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { styled } from "styled-components";
import { StockItem, StockItems } from "../@types";
import { stockContext } from "../context/stock";
import { AddRow } from "./Table/AddRow";
import { DeleteDialogue } from "./Table/DeleteDialogue";
import { EditDialogue } from "./Table/EditDialogue";
import {
  BodyCell,
  Cell,
  IconButton,
  MainTable,
  Row,
} from "./Table/SharedComponents";

const Table = ({ data }: { data: StockItems }) => {
  const { edit, refresh } = useContext(stockContext);

  const [showDeleteDiaglogue, setShowDeleteDiaglogue] = useState<number>();
  const [showEditDialogue, setShowEditDialogue] = useState<number>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitSuccessful },
  } = useForm<StockItem & { id?: number }>();

  const editItem: SubmitHandler<StockItem & { id?: number }> = (data) =>
    edit(data.id as number, data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      refresh();
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <MainTable>
        <thead>
          <tr>
            <HeadCell size={"long"}>Name</HeadCell>
            <HeadCell size={"long"}>Manufacturer</HeadCell>
            <HeadCell size={"normal"}>Stock Level</HeadCell>
            <HeadCell size={"short"}>-</HeadCell>
          </tr>
        </thead>
        <tbody>
          {data.map((item: StockItem, id: number) => (
            <Row
              key={`stock_row_${id}`}
              data-id={id}
              data-pending-delete={id === showDeleteDiaglogue}
            >
              <BodyCell size={"long"}>{item.name}</BodyCell>
              <BodyCell size={"long"}>{item.manufacturer}</BodyCell>
              <BodyCell size={"normal"}>{item.stockLevel}</BodyCell>
              <BodyCell size={"short"}>
                <IconButton onClick={() => setShowEditDialogue(id)}>
                  <Icon path={mdiPencil} size={"1.6em"} />
                </IconButton>
                <IconButton onClick={() => setShowDeleteDiaglogue(id)}>
                  <Icon path={mdiTrashCanOutline} size={"1.6em"} />
                </IconButton>
              </BodyCell>
            </Row>
          ))}
        </tbody>
      </MainTable>
      <AddRow />
      <DeleteDialogue
        id={showDeleteDiaglogue}
        onClose={() => setShowDeleteDiaglogue(undefined)}
      />
      <EditDialogue
        id={showEditDialogue}
        onClose={() => setShowEditDialogue(undefined)}
      />
    </>
  );
};
export default Table;

const HeadCell = styled(Cell).attrs({ as: "th" })`
  text-align: start;
  font-weight: bold;
  font-size: 13px;
  background-color: rgb(84, 88, 93);
  color: rgb(255, 255, 255);
  border: 1px solid rgb(84, 88, 93);

  @media (prefers-color-scheme: dark) {
    background-color: rgb(171, 167, 192);
    color: rgb(0, 0, 0);
    border: 1px solid rgb(171, 167, 192);
  }
  ${(p) => p.size === "short" && `text-align: center;`};
`;
