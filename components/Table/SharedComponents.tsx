import { styled } from "styled-components";

export const MainTable = styled.table`
  width: 850px;
  max-width: 100vw;
  border-collapse: collapse;
`;

export const Cell = styled.td<{ size?: "short" | "normal" | "long" }>`
  padding: 15px;
  ${(p) => p.size === "long" && `width: 250px;`};
  ${(p) => p.size === "normal" && `width: 100px;`};
  ${(p) => p.size === "short" && `width: 75px;`};
`;

export const Row = styled.tr`
  transition-property: filter, background-color;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;

  background-color: rgb(249, 250, 251);
  &:nth-child(odd) {
    background-color: rgb(255, 255, 255);
  }
  @media (prefers-color-scheme: dark) {
    background-color: rgb(20, 20, 20);
    &:nth-child(odd) {
      background-color: rgb(0, 0, 0);
    }
  }
  filter: blur(0px);
  &[data-pending-delete="true"],
  &[data-error] {
    background-color: rgb(249, 225, 225);
    @media (prefers-color-scheme: dark) {
      background-color: rgb(50, 4, 4);
    }
  }
  &[data-pending-delete="true"] {
    filter: blur(2px);
  }
`;

export const BodyCell = styled(Cell)`
  text-align: start;
  color: rgb(99, 99, 99);
  border: 1px solid rgb(221, 223, 225);
  @media (prefers-color-scheme: dark) {
    color: rgb(155, 155, 155);
    border: 1px solid rgb(44, 46, 30);
  }
`;

const GenericButton = styled.button`
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;
export const IconButton = styled(GenericButton)`
  border: 0 none;
  background-color: transparent;
  color: currentColor;
  height: 30px;
  width: 30px;
  margin: 0;
  padding: 0;
`;

export const Dialogue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  max-width: 95vw;
  min-height: 100px;
  padding: 20px;
  border-radius: 4px;
  backdrop-filter: blur(3px);
  gap: 10px;

  background-color: rgba(230, 230, 230, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.8);

  @media (prefers-color-scheme: dark) {
    background-color: rgba(75, 75, 75, 0.7);
  }
  transition-property: opacity, filter;
  transition-duration: 0.5s;
  transition-timing-function: ease-out;
  opacity: 0;
  filter: blur(10px);
  pointer-events: none;
  &[data-id] {
    opacity: 1;
    filter: blur(0);
    pointer-events: all;
  }
  &[data-error] {
    background-color: rgba(150, 75, 75, 0.7);
  }
`;

export const Input = styled.input.attrs({
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
  transition: border-left-width 0.2s ease-in-out;
  &[data-error] {
    border-left-width: 8px;
    border-left-color: rgb(255, 0, 0);
    @media (prefers-color-scheme: dark) {
      border-left-color: rgb(200, 0, 0);
    }
  }
`;
