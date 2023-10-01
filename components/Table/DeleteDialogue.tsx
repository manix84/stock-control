import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { stockContext } from "../../context/stock";
import { Dialogue } from "./SharedComponents";

export const DeleteDialogue = ({
  id,
  onClose,
}: {
  id?: number;
  onClose: () => void;
}) => {
  const { stock, remove, refresh } = useContext(stockContext);
  const [selectedId, setSelectedId] = useState<number>();

  useEffect(() => {
    if (id !== undefined) setSelectedId(id);
  }, [id]);

  const confirmDelete = (id: number) => {
    remove(id)
      .then(() => {
        onClose();
        refresh();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialogue data-id={id}>
      <ConfirmText>
        Are You sure you want to delete{" "}
        <strong>{id !== null && stock[selectedId as number]?.name}</strong>?
      </ConfirmText>
      <Options>
        <ConfirmButton onClick={() => confirmDelete(id as number)}>
          Yes
        </ConfirmButton>
        <CancelButton onClick={onClose}>No</CancelButton>
      </Options>
    </Dialogue>
  );
};
export default DeleteDialogue;

const ConfirmText = styled.div`
  user-select: none;
  text-shadow: 0px 0px 2px rgb(255, 255, 255);
  @media (prefers-color-scheme: dark) {
    text-shadow: 0px 0px 2px rgb(0, 0, 0);
  }
`;
const Options = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
const CancelButton = styled.button`
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 4px;

  color: rgb(0, 0, 0);
  background-color: rgb(200, 200, 200);
  border: 1px solid rgb(0, 0, 0);
  @media (prefers-color-scheme: dark) {
    color: rgb(0, 0, 0);
    background-color: rgb(155, 155, 155);
    border: 1px solid rgb(0, 0, 0);
  }
`;
const ConfirmButton = styled(CancelButton)`
  &:hover,
  &:focus {
    color: rgb(255, 255, 255);
    background-color: rgb(150, 0, 0);
    border: 1px solid rgb(255, 255, 255);
  }
`;
