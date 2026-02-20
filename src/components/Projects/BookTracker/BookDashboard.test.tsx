// BookDashboard.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import BookDashboard from "./BookDashboard";

// Mock the child components BEFORE the React mock
vi.mock("./BookSearch/BookSearch", () => ({
  default: () => <div data-testid="book-search">Book Search Component</div>,
}));

vi.mock("./BookShelf/BookShelf", () => ({
  default: () => <div data-testid="book-shelf">Book Shelf Component</div>,
}));

describe("BookDashboard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("debug test", async () => {
    renderWithProviders(<BookDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Books")).toBeInTheDocument();
    });

    screen.debug();
  });

  it("should render both tab buttons", async () => {
    renderWithProviders(<BookDashboard />);

    await waitFor(() => {
      expect(screen.getByLabelText("book gallery")).toBeInTheDocument();
      expect(screen.getByLabelText("user shelf")).toBeInTheDocument();
    });
  });

  it("should render tab button text", async () => {
    renderWithProviders(<BookDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Books")).toBeInTheDocument();
      expect(screen.getByText("Shelf")).toBeInTheDocument();
    });
  });

  it("should render BookSearch component by default", async () => {
    renderWithProviders(<BookDashboard />);

    await waitFor(() => {
      expect(screen.getByTestId("book-search")).toBeInTheDocument();
    });
  });

  it("should switch to shelf tab when clicked", async () => {
    renderWithProviders(<BookDashboard />);

    const shelfTab = await screen.findByLabelText("user shelf");
    fireEvent.click(shelfTab);

    await waitFor(() => {
      expect(screen.getByTestId("book-shelf")).toBeInTheDocument();
      expect(screen.queryByTestId("book-search")).not.toBeInTheDocument();
    });
  });
});
