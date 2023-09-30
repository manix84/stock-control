import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { StockItem } from "../../@types";
import { stockContext } from "../../context/stock";
import { Dialogue } from "./SharedComponents";

export const EditDialogue = ({
  id,
  onClose,
}: {
  id?: number;
  onClose: () => void;
}) => {
  const { stock, edit, refresh } = useContext(stockContext);

  const [selectedId, setSelectedId] = useState<number>();

  useEffect(() => {
    if (id !== undefined) setSelectedId(id);
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<StockItem & { id?: number }>({
    values: { ...stock[selectedId as number], id: selectedId },
  });

  const editItem: SubmitHandler<StockItem & { id?: number }> = (data) =>
    edit(data.id as number, data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      onClose();
      refresh();
    }
  }, [isSubmitSuccessful]);

  return (
    <Dialogue data-id={id}>
      <Form onSubmit={handleSubmit(editItem)}>
        <input
          type={"hidden"}
          {...register("id", {
            valueAsNumber: true,
          })}
          value={id as number}
        />
        <InputContainer>
          <Input
            required
            type={"text"}
            {...register("name", {
              required: true,
            })}
            data-error={errors.name?.message}
          />
          <Label>Name</Label>
        </InputContainer>
        <InputContainer>
          <Input
            required
            type={"text"}
            {...register("manufacturer", {
              required: true,
            })}
            data-error={errors.manufacturer?.message}
          />
          <Label>Manufacturer</Label>
        </InputContainer>
        <InputContainer>
          <Input
            required
            type={"number"}
            {...register("stockLevel", {
              required: true,
              valueAsNumber: true,
            })}
            data-error={errors.stockLevel?.message}
          />
          <Label>Stock Level</Label>
        </InputContainer>
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton type={"submit"}>Save</SaveButton>
        </ButtonContainer>
      </Form>
    </Dialogue>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input.attrs({
  autoComplete: "off",
  "data-1pignore": "true",
})`
  outline: 0 none;
  border-radius: 4px;
  padding: 5px;
  width: 100%;

  border: 1px solid rgba(100, 100, 100, 0.8);
  @media (prefers-color-scheme: dark) {
    border: 1px solid rgba(155, 155, 155, 0.8);
  }
  transition: border-left-width 0.2s ease-in;
  &[data-error] {
    border-left-width: 8px;
    border-left-color: red;
  }
`;

const Label = styled.label`
  font-size: 13px;
  position: absolute;
  left: 4px;
  top: 4px;
  transform-origin: top left;
  transition-property: transform, scale, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  text-shadow: -1px 1px 0 rgb(255, 255, 255), 1px 1px 0 rgb(255, 255, 255),
    1px -1px 0 rgb(255, 255, 255), -1px -1px 0 rgb(255, 255, 255);
  @media (prefers-color-scheme: dark) {
    text-shadow: -1px 1px 0 rgb(175, 175, 175), 1px 1px 0 rgb(175, 175, 175),
      1px -1px 0 rgb(175, 175, 175), -1px -1px 0 rgb(175, 175, 175);
  }

  transform: translateY(0);
  scale: 1;
  color: rgb(190, 190, 190);
  ${Input}:focus + &,
  ${Input}:valid + & {
    transform: translateY(-14px);
    scale: 0.8;
    color: rgb(0, 0, 0);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 4px;
`;
const CancelButton = styled.button`
  transition-property: color, background-color, border;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
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
const SaveButton = styled(CancelButton)`
  &:hover,
  &:focus {
    color: rgb(255, 255, 255);
    background-color: rgb(0, 150, 0);
    border: 1px solid rgb(150, 150, 150);
  }
`;
