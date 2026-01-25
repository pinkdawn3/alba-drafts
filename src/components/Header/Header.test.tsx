import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { MemoryRouter, Route, Routes } from "react-router";

describe("Header", () => {
  const user = userEvent.setup();

  //Navigates between components

  it("should navigate to About component", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MemoryRouter>,
    );
    const aboutButton = screen.getByText(/about/i);

    expect(aboutButton).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /about/i }));

    expect(screen.getByRole("heading", { name: /sobre/i })).toBeInTheDocument();
  });
});
