import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface Props {
  productsCount: number;
}

function CartWidget({ productsCount }: Props) {
  const navigate = useNavigate();

  const navigateToCart = async () => {
    await navigate("/projects/shop/cart");
  };

  return (
    <button onClick={navigateToCart} className="flex items-center space-x-2">
      <span className="text-lg">{productsCount}</span>
      <span>
        <FontAwesomeIcon icon={faCartShopping} />
      </span>
    </button>
  );
}

export default CartWidget;
