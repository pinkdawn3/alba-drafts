// components/Projects/Shop/Cart/Cart.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { renderWithProviders } from "../../../../utils/test-utils";

// Mock the navigate function
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Cart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows empty cart message when cart is empty", () => {
    renderWithProviders(<Cart />);

    expect(screen.getByText(/the cart is empty/i)).toBeInTheDocument();
  });

  it("displays products in cart", () => {
    // Pre-populate localStorage with cart data
    const mockCart = {
      "1": {
        id: 1,
        name: "Test Product",
        price: 10,
        picture: "test.jpg",
        quantity: 2,
      },
    };

    localStorage.setItem("cart", JSON.stringify(mockCart));

    renderWithProviders(<Cart />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Qty 2")).toBeInTheDocument();
  });

  it("calculates total price correctly", () => {
    const mockCart = {
      "1": {
        id: 1,
        name: "Product 1",
        price: 10,
        picture: "test1.jpg",
        quantity: 2,
      },
      "2": {
        id: 2,
        name: "Product 2",
        price: 5,
        picture: "test2.jpg",
        quantity: 1,
      },
    };

    localStorage.setItem("cart", JSON.stringify(mockCart));

    renderWithProviders(<Cart />);

    // Total should be (10 * 2) + (5 * 1) = 25
    expect(screen.getByText("25 €")).toBeInTheDocument();
  });

  it("removes product from cart", () => {
    const mockCart = {
      "1": {
        id: 1,
        name: "Test Product",
        price: 10,
        picture: "test.jpg",
        quantity: 1,
      },
    };

    localStorage.setItem("cart", JSON.stringify(mockCart));

    renderWithProviders(<Cart />);

    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);

    expect(screen.getByText(/the cart is empty/i)).toBeInTheDocument();
  });
});
