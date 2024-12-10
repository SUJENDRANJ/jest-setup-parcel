import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { expect } from "vitest";

// check if app is rendered
test("renders Dashboard component", () => {
  render(<Header />);
  const heading = screen.getByText(/employee agreement management/i);
  expect(heading).toBeInTheDocument();
});
