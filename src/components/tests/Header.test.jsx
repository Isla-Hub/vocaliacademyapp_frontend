import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "../Header";

describe("Header Component", () => {
  it("renders correctly with title and subtitle", () => {
    render(<Header title="Test Title" subtitle="Test Subtitle" />);
    const titleElement = screen.getByText("Test Title");
    const subtitleElement = screen.getByText("Test Subtitle");
    expect(titleElement).toBeVisible()
    expect(subtitleElement).toBeVisible()
  });
});
