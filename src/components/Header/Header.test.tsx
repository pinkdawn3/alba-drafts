import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { BrowserRouter } from "react-router";

describe("Header", () => {
  const user = userEvent.setup();

  //Navigates between components

  it("should navigate to About component", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const aboutButton = screen.getByText(/about/i);

    expect(aboutButton).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /about/i }));

    expect(screen.getByRole("heading", { name: /sobre/i })).toBeInTheDocument();
  });
});
