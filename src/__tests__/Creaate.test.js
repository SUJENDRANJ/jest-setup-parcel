import { render, screen, waitFor } from "@testing-library/react";
import { Context, useEmployee } from "../contexts/Context"; // Adjust the import path

// Mock child component to test context
const MockChild = () => {
  const { employeeData, isLoading } = useEmployee();

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {employeeData.map((employee) => (
        <li key={employee.id}>{employee.name}</li>
      ))}
    </ul>
  );
};

test("displays loading state initially", () => {
  render(
    <Context>
      <MockChild />
    </Context>
  ); // Check if loading state is displayed
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
