import { useEffect, useState, type FunctionComponent } from "react";
import { usePreferences } from "../../../../hooks/usePreferences";
import { CartWidget } from "../CartWidget/CartWidget";
import { Spinner } from "../../../Spinner/Spinner";
import { Trans } from "@lingui/react/macro";
import type { CartProps, Product } from "../../../../types/cart";

const API_URL = "https://ecom-fake-api.onrender.com/products";

export const Products: FunctionComponent = () => {
  const { cart, setCart } = usePreferences();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  const productsCount: number = Object.keys(cart || {}).length;

  async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    //We must do this because the api returns a list instead of an array
    return Object.values(data) as Product[];
  }

  useEffect(() => {
    fetchData(API_URL)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const addToCart = (product: Product): void => {
    product.quantity = 1;

    setCart((prevCart: CartProps) => ({
      ...prevCart,
      [product.id]: product,
    }));
  };

  const isInCart = (productId: number): boolean =>
    Object.keys(cart || {}).includes(productId.toString());

  if (error) {
    return (
      <h3>
        An error occurred when fetching data. Please check the API and try
        again.
      </h3>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py- lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-200">
            <Trans>Products</Trans>
          </h2>

          <CartWidget productsCount={productsCount} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length === 0 ? (
            <p>
              {" "}
              <Trans>The product list is empty.</Trans>{" "}
            </p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="group relative">
                <img
                  src={product.picture}
                  alt={product.name}
                  className="aspect-square w-full rounded-md object-cover lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-m text-gray-400 font-semibold">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-m font-medium text-gray-400">
                    {product.price} €
                  </p>
                </div>
                <div className="flex py-2">
                  <button
                    disabled={isInCart(product.id)}
                    onClick={() => addToCart(product)}
                    className="button grow"
                  >
                    <Trans>Add to Cart</Trans>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div></div>
    </section>
  );
};
