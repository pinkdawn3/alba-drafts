import { useState, type FunctionComponent } from "react";

export type Operation = "decrease" | "increase";

interface Props {
  removeProductCallback: (productId: number) => void;
  handleUpdateQuantity: (productId: number, operation: Operation) => void;
  productId: number;
}

export const Quantifier: FunctionComponent<Props> = ({
  removeProductCallback,
  handleUpdateQuantity,
  productId,
}) => {
  const [value, setValue] = useState<number>(1);

  const reduce = (): void => {
    handleUpdateQuantity(productId, "decrease");

    setValue((prevState) => {
      const updatedValue = prevState - 1;
      if (updatedValue === 0) {
        removeProductCallback(productId);
      }
      return updatedValue;
    });
  };

  const increase = (): void => {
    handleUpdateQuantity(productId, "increase");
    setValue((prevState) => prevState + 1);
  };

  return (
    <div>
      <input type="button" value="-" onClick={reduce} />
      <input
        type="number"
        step="1"
        max=""
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        aria-label="product"
      />
      <input type="button" value="+" onClick={increase} />
    </div>
  );
};
