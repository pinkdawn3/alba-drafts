// components/About/About.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";

import { i18n } from "@lingui/core";
import { renderWithProviders } from "../utils/test-utils";
import About from "./About";

describe("About", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the about section", () => {
    renderWithProviders(<About />);

    expect(screen.getByText("Alba")).toBeInTheDocument();
    expect(screen.getByText("De Taoro González")).toBeInTheDocument();
  });

  it("displays profile picture with correct alt text", () => {
    renderWithProviders(<About />);

    const image = screen.getByAltText("profile picture");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });

  it("renders CV download buttons", () => {
    renderWithProviders(<About />);

    const downloadLinks = screen.getAllByRole("link");
    expect(downloadLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("provides English CV as primary when language is English", () => {
    i18n.activate("en");
    renderWithProviders(<About />);

    const primaryLink = screen.getByLabelText("download cv in english");
    const href = primaryLink.getAttribute("href") || "";

    // Check for "English" in the decoded URL
    expect(decodeURIComponent(href)).toContain("English");
  });

  it("provides Spanish CV as primary when language is Spanish", () => {
    i18n.activate("es");
    renderWithProviders(<About />);

    const primaryLink = screen.getByLabelText("download cv in english");
    const href = primaryLink.getAttribute("href") || "";

    // Check for "Español" in the decoded URL
    expect(decodeURIComponent(href)).toContain("Español");
  });

  it("provides Spanish CV as secondary when language is English", () => {
    i18n.activate("en");
    renderWithProviders(<About />);

    const secondaryLink = screen.getByLabelText("download cv in spanish");
    const href = secondaryLink.getAttribute("href") || "";

    expect(decodeURIComponent(href)).toContain("Español");
  });

  it("provides English CV as secondary when language is Spanish", () => {
    i18n.activate("es");
    renderWithProviders(<About />);

    const secondaryLink = screen.getByLabelText("download cv in spanish");
    const href = secondaryLink.getAttribute("href") || "";

    expect(decodeURIComponent(href)).toContain("English");
  });

  it("opens CV links in new tab", () => {
    renderWithProviders(<About />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("renders all biography paragraphs in English", () => {
    i18n.activate("en");
    renderWithProviders(<About />);

    expect(
      screen.getByText(/Translation and interpreting/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/reinvent myself/i)).toBeInTheDocument();
    expect(
      screen.getByText(/web development and front-end/i),
    ).toBeInTheDocument();
  });
});
