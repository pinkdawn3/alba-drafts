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
    <div className="space-x-2">
      <input type="button" value="-" onClick={reduce} className="button" />
      <input
        type="number"
        step="1"
        max=""
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        aria-label="quantity label"
        className="px-2 py-2 rounded-md outline-1 -outline-offset-1 outline-gray-600 "
      />
      <input type="button" value="+" onClick={increase} className="button" />
    </div>
  );
};
