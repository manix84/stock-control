/**
 * @jest-environment jsdom
 */
import Background from "@/components/Background";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import AddRow from "@/components/Table/AddRow";
import DeleteDialogue from "@/components/Table/DeleteDialogue";
import EditDialogue from "@/components/Table/EditDialogue";
import {
  BodyCell,
  Cell,
  Dialogue,
  IconButton,
  Input,
  MainTable,
  Row,
} from "@/components/Table/SharedComponents";
import Home from "@/pages/index";
import { render } from "@testing-library/react";

it("renders homepage unchanged", () => {
  const home = render(<Home />);
  expect(home).toMatchSnapshot();
});

it("renders table components unchanged", () => {
  const tableData = [
    {
      name: "Shirts",
      manufacturer: "Polo",
      stockLevel: 50,
    },
  ];
  const table = render(<Table data={tableData} />);
  expect(table).toMatchSnapshot();
});

it("renders addRow components unchanged", () => {
  const addRow = render(<AddRow />);
  expect(addRow).toMatchSnapshot();
});

it("renders editDialogue components unchanged", () => {
  const editDialogue = render(<EditDialogue id={0} onClose={() => {}} />);
  expect(editDialogue).toMatchSnapshot();
});

it("renders deleteDialogue components unchanged", () => {
  const deleteDialogue = render(<DeleteDialogue id={0} onClose={() => {}} />);
  expect(deleteDialogue).toMatchSnapshot();
});

it("renders shared components unchanged", () => {
  const mainTable = render(<MainTable />);
  expect(mainTable).toMatchSnapshot();

  const cell = render(<Cell />);
  expect(cell).toMatchSnapshot();

  const row = render(<Row />);
  expect(row).toMatchSnapshot();

  const bodyCell = render(<BodyCell />);
  expect(bodyCell).toMatchSnapshot();

  const iconButton = render(<IconButton />);
  expect(iconButton).toMatchSnapshot();

  const dialogue = render(<Dialogue />);
  expect(dialogue).toMatchSnapshot();

  const input = render(<Input />);
  expect(input).toMatchSnapshot();
});

it("renders background components unchanged", () => {
  const background = render(<Background />);
  expect(background).toMatchSnapshot();
});

it("renders spinner components unchanged", () => {
  const spinner = render(<Spinner />);
  expect(spinner).toMatchSnapshot();
});
