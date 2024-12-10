import { Link } from "react-router-dom";
import { Table, Button, Container, Form } from "react-bootstrap";
import { useEffect, useContext, useState } from "react";
import { useEmployee } from "../contexts/Context";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
  // Access employee data from context and state setter
  const { employeeData, setEmployeeData, isLoading } = useEmployee();

  // Local state variables

  const [editable, setEditable] = useState(false); // Tracks if edits are in done in textfield
  const [toggleEdit, setToggleEdit] = useState(true); // Toggles between edit and delete modes

  // Fetch employee data when the component rendered

  // Handle input changes for  editing text fields
  function onchangeHandler(id, value, key) {
    const findEmp = employeeData.find((emp) => emp.id === id); // finds the employee being edited

    // Update the state with modified employee details
    setEmployeeData(
      employeeData.map((emp) =>
        emp.id === id ? { ...emp, [key]: value } : emp
      )
    );
  }

  // Handle editing of an employee's details
  function handleEdit(id) {
    if (!editable) {
      alert("⚠ Edit Agreements by directly selecting the text field");
      return;
    }
    const findEmp = employeeData.find((emp) => emp.id === id); // Find the employee being edited

    // Validate input fields
    if (
      !findEmp.name.trim() ||
      !findEmp.department.trim() ||
      !findEmp.position.trim() ||
      !findEmp.agreementDate
    ) {
      alert("❗ All fields must be filled out correctly!");
      return;
    }

    // Send PUT request
    fetch("http://localhost:3000/employee/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(findEmp),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("✔ Edited the Agreement");
        setEditable(false); // Reset edit state
      })
      .catch((err) => {
        // Handling Error on fetching data
        alert("❗ Cannot Edit the Agreement - " + err.message);
      });
  }

  // Handle deletion of an employee's data
  function handleDelete(id) {
    const confirmDel = confirm("⚠ Confirm to Delete Agreement"); // Confirming Deletion

    if (confirmDel) {
      const filteredEmp = employeeData.filter((emp) => emp.id !== id); // Filtering employee

      // Send DELETE request
      fetch("http://localhost:3000/employee/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("✔ Deleted Employee Successfully");
          setEmployeeData(filteredEmp); // Update state with filtered employees
        })
        .catch((err) => {
          // Handling Error on fetching data
          alert("❗ Cannot Delete the Agreement - " + err.message);
        });
    } else return;
  }

  // Render loading state
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "80vh",
        }}
      >
        <HashLoader size={60} color="#7FCDCD" />;
      </div>
    );
  }

  // Render the main dashboard
  return (
    <div className="mt-5">
      <Container>
        <h2 className="mb-4">Employee Agreements Dashboard</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Agreement Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {toggleEdit
              ? employeeData.map((employee) => (
                  <tr key={employee.id}>
                    {/* Editable Text Fields */}
                    <td>
                      <Form.Control
                        value={employee.name}
                        onChange={(e) => {
                          setEditable(true);
                          onchangeHandler(employee.id, e.target.value, "name");
                        }}
                        className={"alertBorder"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={employee.department}
                        onChange={(e) => {
                          setEditable(true);
                          onchangeHandler(
                            employee.id,
                            e.target.value,
                            "department"
                          );
                        }}
                        className={"alertBorder"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={employee.position}
                        onChange={(e) => {
                          setEditable(true);
                          onchangeHandler(
                            employee.id,
                            e.target.value,
                            "position"
                          );
                        }}
                        className={"alertBorder"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={employee.agreementDate}
                        type="date"
                        onChange={(e) => {
                          setEditable(true);
                          onchangeHandler(
                            employee.id,
                            e.target.value,
                            "agreementDate"
                          );
                        }}
                        className={"alertBorder"}
                      />
                    </td>

                    {/* Action Buttons */}
                    <td>
                      <Link to={"/view-agreement/" + employee.id}>
                        <Button variant="info" size="sm" className="mr-2">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant={"secondary"}
                        size="sm"
                        onClick={() => handleEdit(employee.id)}
                      >
                        Edit Details
                      </Button>
                    </td>
                  </tr>
                ))
              : employeeData.map((employee) => (
                  <tr key={employee.id}>
                    {/* Non-Editable Fields */}
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>{employee.agreementDate}</td>

                    {/* Action Buttons */}
                    <td>
                      <Link to={"/view-agreement/" + employee.id}>
                        <Button variant="info" size="sm" className="mr-2">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant={"danger"}
                        size="sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete Details
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>

        {/* Additional Notes */}
        <h5 className="text-secondary">
          {toggleEdit ? "*Click on text to edit Employee Details" : ""}
        </h5>

        {/* Controls */}
        <div style={{ marginTop: "40px" }}>
          <Link to="/create-agreement">
            <Button>Add Agreement</Button>
          </Link>
          <Button
            variant={toggleEdit ? "danger" : "warning"}
            className="ms-3"
            onClick={() => setToggleEdit(!toggleEdit)}
          >
            {toggleEdit ? "Delete" : "Edit"} Agreement
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
