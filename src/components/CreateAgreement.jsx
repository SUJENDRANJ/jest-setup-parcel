import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEmployee } from "../contexts/Context";

const CreateAgreement = () => {
  // State to add new employee agreement
  const [addedEmployee, setAddedEmployee] = useState({
    name: "",
    department: "",
    position: "",
    agreementDate: "",
    imgURL: "",
  });

  // State for validation messages
  const [validateForm, setValidateForm] = useState("");

  const { employeeData, setEmployeeData } = useEmployee();

  // Hook to navigate routes from the component
  const navigate = useNavigate();

  // Handles form submission for creating a new agreement
  function handleSubmit() {
    // Validate that all fields are filled or not
    if (
      addedEmployee.name &&
      addedEmployee.department &&
      addedEmployee.position &&
      addedEmployee.agreementDate
    ) {
      // Make POST request
      fetch("http://localhost:3000/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(addedEmployee), // Convert employee data to JSON format
      })
        .then((res) => res.json())
        .then((data) => {
          setEmployeeData([...employeeData, data]);
          navigate("/"); // Redirect to the dashboard upon success
          alert("✔ Successfully Added Employee"); // Notify the user
        });
    } else {
      // Display validation error if fields are missing
      setValidateForm("*All fields instead of image are required");
    }
  }

  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    if (file) {
      setAddedEmployee({ ...addedEmployee, imgURL: file });
    } else return;
  };

  return (
    <Container className="mt-5">
      <h2>Add Employee Agreement</h2>

      {/* Validation Message */}
      <span className="text-danger">{validateForm}</span>

      {/* Form for adding an employee agreement */}
      <Form>
        {/* Employee Name Field */}
        <Form.Group className="mb-3" controlId="employeeName">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter employee name"
            required
            onChange={(e) =>
              setAddedEmployee({ ...addedEmployee, name: e.target.value })
            }
          />
        </Form.Group>

        {/* Department Field */}
        <Form.Group className="mb-3" controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            required
            onChange={(e) =>
              setAddedEmployee({ ...addedEmployee, department: e.target.value })
            }
          />
        </Form.Group>

        {/* Position Field */}
        <Form.Group className="mb-3" controlId="position">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter position"
            required
            onChange={(e) =>
              setAddedEmployee({ ...addedEmployee, position: e.target.value })
            }
          />
        </Form.Group>

        {/* Agreement Date Field */}
        <Form.Group className="mb-3" controlId="agreementDate">
          <Form.Label>Agreement Date</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) =>
              setAddedEmployee({
                ...addedEmployee,
                agreementDate: e.target.value,
              })
            }
          />
        </Form.Group>

        {/* Add image */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose an Image File</Form.Label>
          <Form.Control type="file" onChange={(e) => handleFileChange(e)} />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" onClick={handleSubmit}>
          Add Agreement
        </Button>

        {/* Back Button to return to dashboard */}
        <Link to="/">
          <Button variant="secondary" className="ms-4">
            Back
          </Button>
        </Link>
      </Form>
    </Container>
  );
};

export default CreateAgreement;
