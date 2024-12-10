import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Header,
  Dashboard,
  ViewAgreement,
  CreateAgreement,
} from "./components";

function App() {
  return (
    <>
      {/* Wrapping the application in BrowserRouter to enable routing */}
      <BrowserRouter>
        {/* Header component visible at routes */}
        <Header />
        {/* Defining Routes */}
        <Routes>
          {/* Dashboard is the default route */}
          <Route path="/" element={<Dashboard />} />

          {/* Route to createAgreement */}
          <Route path="create-agreement" element={<CreateAgreement />} />

          {/* Route to viewAgreement of single employee  */}
          <Route path="view-agreement/:empId" element={<ViewAgreement />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
