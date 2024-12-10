import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { EmployeeDataContext } from "../contexts/Context"; // Assuming this is the correct import
import Dashboard from "../components/Dashboard";

const mockEmployeeData = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    position: "Developer",
    agreementDate: "2024-12-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "HR",
    position: "Recruiter",
    agreementDate: "2024-11-15",
  },
];

const mockSetEmployeeData = jest.fn();
const mockIsLoading = false;

const renderWithContext = (component) => {
  return render(
    <EmployeeDataContext.Provider
      value={{
        employeeData: mockEmployeeData,
        setEmployeeData: mockSetEmployeeData,
        isLoading: mockIsLoading,
      }}
    >
      <BrowserRouter>{component}</BrowserRouter>
    </EmployeeDataContext.Provider>
  );
};

describe("Dashboard Component", () => {
  test("renders the employee table", () => {
    renderWithContext(<Dashboard />);

    // Check table headers
    expect(screen.getByText("Employee Name")).toBeInTheDocument();
    expect(screen.getByText("Department")).toBeInTheDocument();
    expect(screen.getByText("Position")).toBeInTheDocument();
    expect(screen.getByText("Agreement Date")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    // Check employee data
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Engineering")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Developer")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2024-12-01")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Jane Smith")).toBeInTheDocument();
  });

  test("toggles between edit and delete mode", () => {
    renderWithContext(<Dashboard />);

    const toggleButton = screen.getByText("Delete Agreement");
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText("Edit Agreement")).toBeInTheDocument();
  });

  test("handles editing an employee's details", async () => {
    renderWithContext(<Dashboard />);

    const nameInput = screen.getByDisplayValue("John Doe");
    fireEvent.change(nameInput, { target: { value: "John Smith" } });

    expect(mockSetEmployeeData).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "John Smith" }),
      ])
    );
  });

  test("handles deleting an employee's details", async () => {
    global.confirm = jest.fn(() => true); // Mock confirm dialog

    renderWithContext(<Dashboard />);

    const deleteButton = screen.getAllByText("Delete Details")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockSetEmployeeData).toHaveBeenCalledWith([
        mockEmployeeData[1], // Remaining employee after deletion
      ]);
    });
  });

  test("displays loader when isLoading is true", () => {
    render(
      <EmployeeDataContext.Provider
        value={{
          employeeData: [],
          setEmployeeData: jest.fn(),
          isLoading: true,
        }}
      >
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </EmployeeDataContext.Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
