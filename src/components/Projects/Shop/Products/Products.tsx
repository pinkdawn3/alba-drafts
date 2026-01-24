import { useEffect, useState, type FunctionComponent } from "react";
import useLocalStorageState from "use-local-storage-state";

const API_URL = "https://ecom-fake-api.onrender.com/products";

export type Product = {
  id: number;
  name: string;
  price: number;
  picture: string;
  quantity: number;
};

export interface CartProps {
  [productId: string]: Product;
}

export const Products: FunctionComponent = () => {
  //const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [cart, setCart] = useLocalStorageState<CartProps>("cart", {});

  async function fetchData(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();
    console.log(data);

    //We must do this because the api returns a list instead of an array
    return Object.values(data) as Product[];
  }

  useEffect(() => {
    fetchData(API_URL)
      .then(setProducts)
      .catch(() => setError(true));
  }, []);

  const addToCart = (product: Product): void => {
    product.quantity = 1;

    setCart((prevCart) => ({
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

  /*  if (isLoading) {
    return <Loader />;
  } */

  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-200">
          Productos
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                src={product.picture}
                alt={product.name}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
              />
              <p></p>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-500">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-400">
                  {product.price}
                </p>
              </div>
              <button
                disabled={isInCart(product.id)}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div></div>
    </section>
  );
};
