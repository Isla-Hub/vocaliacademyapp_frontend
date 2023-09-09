import { describe, it, expect, vi, beforeEach } from "vitest";
import SideBar from "../SideBar";
import { render, screen, fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Import the appropriate router component

vi.mock("react-auth-kit", () => {
  return {
    useAuthUser: () => {
      return () => ({
        name: "John",
        lastName: "Doe",
        role: "Admin",
      });
    },
  };
});

describe("SideBar Component", () => {
  beforeEach(() => {
    render(<SideBar />, { wrapper: BrowserRouter });
  })

  it("toggles the collapsed state on menu button click", () => {    
    fireEvent.click(screen.getByTestId("MenuOutlinedIcon"))
    expect(() => screen.getByText('ADMIN')).toThrow('Unable to find an element');
    expect(() => screen.getByText('John Doe')).toThrow('Unable to find an element');
  });

  it("displays user profile when user is logged in", () => {
    expect(screen.getByText('ADMIN')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  });
});
