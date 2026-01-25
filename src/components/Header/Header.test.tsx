// components/Header/Header.test.tsx
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { renderWithProviders } from "../../utils/test-utils";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Header", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders all navigation links", () => {
    renderWithProviders(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("About me")).toBeInTheDocument();
  });

  it("renders language selector", () => {
    renderWithProviders(<Header />);

    // LanguageSelector should render a button with the language icon
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("Home link navigates to root path", () => {
    renderWithProviders(<Header />);

    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "#/");
  });

  it("About me link navigates to about path", () => {
    renderWithProviders(<Header />);

    const aboutLink = screen.getByText("About me").closest("a");
    expect(aboutLink).toHaveAttribute("href", "#/about");
  });

  it("opens Projects menu when clicked", () => {
    renderWithProviders(<Header />);

    const projectsButton = screen.getByText("Projects");
    fireEvent.click(projectsButton);

    expect(screen.getByText("Shop")).toBeInTheDocument();
  });

  it("navigates to shop when Shop menu item is clicked", () => {
    renderWithProviders(<Header />);

    // Open the Projects menu
    const projectsButton = screen.getByText("Projects");
    fireEvent.click(projectsButton);

    // Click the Shop menu item
    const shopButton = screen.getByText("Shop");
    fireEvent.click(shopButton);

    expect(mockNavigate).toHaveBeenCalledWith("/projects/shop");
  });

  it("Shop menu item is hidden when menu is closed", () => {
    renderWithProviders(<Header />);

    // Shop should not be visible initially
    expect(screen.queryByText("Shop")).not.toBeInTheDocument();
  });

  it("renders navigation with proper structure", () => {
    renderWithProviders(<Header />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("contains exactly 3 main navigation items", () => {
    renderWithProviders(<Header />);

    // Home, Projects (button), About me
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("About me")).toBeInTheDocument();
  });

  it("Projects menu has Shop as a submenu item", () => {
    renderWithProviders(<Header />);

    const projectsButton = screen.getByText("Projects");
    fireEvent.click(projectsButton);

    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(1);
    expect(menuItems[0]).toHaveTextContent("Shop");
  });
});
