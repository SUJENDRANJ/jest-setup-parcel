import { createContext, useContext, useEffect, useState } from "react";

// Create the EmployeeDataContext for managing employee data globally
const EmployeeDataContext = createContext();

export const Context = ({ children }) => {
  const [employeeData, setEmployeeData] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Tracks loading state

  useEffect(() => {
    fetchData();
  }, []); // [] - empty dependency array (it calls the function only once)

  // Fetch employee data from the server
  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/employee"); // API for fetching employees
    const data = await res.json();
    setEmployeeData(data); // Update context with fetched data
    setIsLoading(false); // Stop loading spinner
  };

  // State which contain employee data

  return (
    // Providing the state and its set function to all child components
    <EmployeeDataContext.Provider
      value={{ employeeData, setEmployeeData, isLoading, setIsLoading }}
    >
      {children} {/* Render child components inside the provider */}
    </EmployeeDataContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeDataContext);
