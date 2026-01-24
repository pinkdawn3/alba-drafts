import type { FunctionComponent } from "react";
import { CartWidget } from "./CartWidget/CartWidget";
import { Products } from "./Products/Products";

export const Shop: FunctionComponent = () => {
  return (
    <>
      <CartWidget productsCount={0} />
      <Products />
    </>
  );
};
