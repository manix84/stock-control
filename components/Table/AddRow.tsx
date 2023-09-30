import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StockItem } from "../../@types";
import { stockContext } from "../../context/stock";
import { BodyCell, IconButton, Input, MainTable, Row } from "../Table";

export const AddRow = () => {
  const { add, refresh, isLoaded } = useContext(stockContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<StockItem & { id?: number }>();

  const addItem: SubmitHandler<StockItem> = (data) => add(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      refresh();
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(addItem)}>
      <MainTable>
        <tbody>
          <Row>
            <BodyCell size={"long"}>
              <Input
                required
                type={"text"}
                {...register("name", { required: true })}
                data-error={errors.name?.message}
              />
            </BodyCell>
            <BodyCell size={"long"}>
              <Input
                required
                type={"text"}
                {...register("manufacturer", { required: true })}
                data-error={errors.manufacturer?.message}
              />
            </BodyCell>
            <BodyCell size={"normal"}>
              <Input
                required
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
                <Icon path={mdiPlus} size={"1.6em"} />
              </IconButton>
            </BodyCell>
          </Row>
        </tbody>
      </MainTable>
    </form>
  );
};
