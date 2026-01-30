// components/Projects/Shop/Products/Products.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Products from "./Products";
import { renderWithProviders } from "../../../../utils/test-utils";

describe("Products", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("displays products after loading", async () => {
    const mockProducts = {
      "1": {
        id: 1,
        name: "Test Product",
        price: 10,
        picture: "test.jpg",
        quantity: 0,
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderWithProviders(<Products />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("10 €")).toBeInTheDocument();
    });
  });

  it("shows error message on fetch failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error"))),
    );

    renderWithProviders(<Products />);

    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });

  it("adds product to cart", async () => {
    const mockProducts = {
      "1": {
        id: 1,
        name: "Test Product",
        price: 10,
        picture: "test.jpg",
        quantity: 0,
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderWithProviders(<Products />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);

    // Check localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    expect(cart["1"]).toBeDefined();
    expect(cart["1"].name).toBe("Test Product");
  });

  it("disables add button when product is in cart", async () => {
    const mockProduct = {
      id: 1,
      name: "Test Product",
      price: 10,
      picture: "test.jpg",
      quantity: 1,
    };

    const mockProducts = {
      "1": mockProduct,
    };

    // Pre-populate cart
    localStorage.setItem(
      "cart",
      JSON.stringify({
        "1": mockProduct,
      }),
    );

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderWithProviders(<Products />);

    await waitFor(() => {
      const addButton = screen.getByText(/add to cart/i);
      expect(addButton).toBeDisabled();
    });
  });
});
