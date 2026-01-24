import { type FunctionComponent } from "react";

import useLocalStorageState from "use-local-storage-state";
import type { CartProps } from "../Products/Products";
import { type Operation, Quantifier } from "../Quantifier/Quantifier";
import { useNavigate } from "react-router";

export const Cart: FunctionComponent = () => {
  const [cart, setCart] = useLocalStorageState<CartProps>("cart", {});

  const navigate = useNavigate();

  const navigateToShop = () => {
    navigate("/projects/shop/");
  };

  const handleRemoveProduct = (productId: number): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const handleUpdateQuantity = (productId: number, operation: Operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        if (operation === "increase") {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity + 1,
          };
        } else {
          updatedCart[productId] = {
            ...updatedCart[productId],
            quantity: updatedCart[productId].quantity - 1,
          };
        }
      }
      return updatedCart;
    });
  };

  const getProducts = () => Object.values(cart || {});

  const totalPrice = getProducts().reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py- lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-200">Cart</h2>
      <div className="flow-root py-5">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {getProducts().map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  alt={product.name}
                  src={product.picture}
                  className="size-full object-cover"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium">
                    <Quantifier
                      removeProductCallback={() =>
                        handleRemoveProduct(product.id)
                      }
                      productId={product.id}
                      handleUpdateQuantity={handleUpdateQuantity}
                    />

                    <p className="ml-4">{product.price}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p>Qty {product.quantity}</p>

                  <div className="flex">
                    <button
                      type="button"
                      className=" button font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium ">
          <p>Total</p>
          <p>{totalPrice} €</p>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-xl text-white font-semibold py-2 px-4 rounded-xl"
          >
            Checkout
          </button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <button
              type="button"
              onClick={navigateToShop}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
