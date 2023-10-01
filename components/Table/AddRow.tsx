import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StockItem } from "../../@types";
import { stockContext } from "../../context/stock";
import {
  BodyCell,
  IconButton,
  Input,
  MainTable,
  Row,
} from "./SharedComponents";

export const AddRow = () => {
  const { add, refresh } = useContext(stockContext);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty },
  } = useForm<StockItem & { id?: number }>();

  const addItem: SubmitHandler<StockItem> = async (data) =>
    add(data).catch((err) => setError("root.serverError", { message: err }));

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
          <Row data-error={errors?.root?.serverError.message}>
            <BodyCell size={"long"}>
              <Input
                type={"text"}
                {...register("name", { required: true })}
                data-error={errors.name?.message}
              />
            </BodyCell>
            <BodyCell size={"long"}>
              <Input
                type={"text"}
                {...register("manufacturer", { required: true })}
                data-error={errors.manufacturer?.message}
              />
            </BodyCell>
            <BodyCell size={"normal"}>
              <Input
                type={"number"}
                {...register("stockLevel", {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                })}
                data-error={errors.stockLevel?.message}
              />
            </BodyCell>
            <BodyCell
              size={"short"}
              css={`
                text-align: center;
              `}
            >
              <IconButton type={"submit"} disabled={!isDirty}>
                <Icon path={mdiPlus} size={"1.6em"} />
              </IconButton>
            </BodyCell>
          </Row>
        </tbody>
      </MainTable>
    </form>
  );
};
export default AddRow;
