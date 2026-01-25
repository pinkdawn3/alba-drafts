// contexts/PreferencesProvider.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { PreferencesProvider } from "./PreferencesProvider";
import { usePreferences } from "../hooks/usePreferences";

describe("PreferencesProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides default values", () => {
    const { result } = renderHook(() => usePreferences(), {
      wrapper: PreferencesProvider,
    });

    expect(result.current.theme).toBe("dark");
    expect(result.current.language).toBe("en");
    expect(result.current.cart).toEqual({});
  });

  it("updates theme", () => {
    const { result } = renderHook(() => usePreferences(), {
      wrapper: PreferencesProvider,
    });

    act(() => {
      result.current.setTheme("light");
    });

    expect(result.current.theme).toBe("light");
  });

  it("toggles theme", () => {
    const { result } = renderHook(() => usePreferences(), {
      wrapper: PreferencesProvider,
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
  });

  it("persists values to localStorage", () => {
    const { result } = renderHook(() => usePreferences(), {
      wrapper: PreferencesProvider,
    });

    act(() => {
      result.current.setLanguage("es");
    });

    expect(localStorage.getItem("language")).toContain("es");
  });

  it("updates cart with functional update", () => {
    const { result } = renderHook(() => usePreferences(), {
      wrapper: PreferencesProvider,
    });

    const mockProduct = {
      id: 1,
      name: "Test Product",
      price: 10,
      picture: "test.jpg",
      quantity: 1,
    };

    act(() => {
      result.current.setCart((prevCart) => ({
        ...prevCart,
        [mockProduct.id]: mockProduct,
      }));
    });

    expect(result.current.cart[1]).toEqual(mockProduct);
  });
});
