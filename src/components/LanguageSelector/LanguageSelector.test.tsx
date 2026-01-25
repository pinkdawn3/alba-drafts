// components/LanguageSelector/LanguageSelector.test.tsx
import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { LanguageSelector } from "./LanguageSelector";
import { renderWithProviders } from "../../utils/test-utils";

describe("LanguageSelector", () => {
  it("renders language selector button", () => {
    renderWithProviders(<LanguageSelector />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("shows language options when clicked", async () => {
    renderWithProviders(<LanguageSelector />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(2);
  });

  it("changes language when option is selected", async () => {
    renderWithProviders(<LanguageSelector />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const spanishOption = screen.getByText("Spanish");
    fireEvent.click(spanishOption);

    expect(localStorage.getItem("language")).toContain("es");
  });
});
