import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { StockItem, StockItems } from "../@types";
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

export const Table = ({ data }: { data: StockItems }) => {
  const [showDeleteDialogue, setShowDeleteDialogue] = useState<boolean>(false);
  const [deleteDialogueId, setDeleteDialogueId] = useState<number>();
  const [showEditDialogue, setShowEditDialogue] = useState<boolean>(false);
  const [editDialogueId, setEditDialogueId] = useState<number>();

  useEffect(() => {
    if (deleteDialogueId === undefined) {
      setTimeout(() => {
        setShowDeleteDialogue(false);
      }, 500);
    } else {
      setShowDeleteDialogue(true);
      setShowEditDialogue(false);
      setEditDialogueId(undefined);
    }
    if (editDialogueId === undefined) {
      setTimeout(() => {
        setShowEditDialogue(false);
      }, 500);
    } else {
      setShowEditDialogue(true);
      setShowDeleteDialogue(false);
      setDeleteDialogueId(undefined);
    }
  }, [deleteDialogueId, editDialogueId]);

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
              data-pending-delete={id === deleteDialogueId}
              data-pending-edit={id === editDialogueId}
            >
              <BodyCell size={"long"}>{item.name}</BodyCell>
              <BodyCell size={"long"}>{item.manufacturer}</BodyCell>
              <BodyCell size={"normal"}>{item.stockLevel}</BodyCell>
              <BodyCell size={"short"}>
                <IconButton onClick={() => setEditDialogueId(id)}>
                  <Icon path={mdiPencil} size={"1.6em"} />
                </IconButton>
                <IconButton onClick={() => setDeleteDialogueId(id)}>
                  <Icon path={mdiTrashCanOutline} size={"1.6em"} />
                </IconButton>
              </BodyCell>
            </Row>
          ))}
        </tbody>
      </MainTable>
      <AddRow />
      {showDeleteDialogue && (
        <DeleteDialogue
          id={deleteDialogueId}
          onClose={() => setDeleteDialogueId(undefined)}
        />
      )}
      {showEditDialogue && (
        <EditDialogue
          id={editDialogueId}
          onClose={() => setEditDialogueId(undefined)}
        />
      )}
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
