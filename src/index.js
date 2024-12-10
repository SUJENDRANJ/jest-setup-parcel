import { StrictMode } from "react"; // React utility for highlighting potential issues in the app
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Context } from "./contexts/Context"; // Context provider for global state management

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    {/* Wrap app in StrictMode for development checks */}
    <Context>
      {" "}
      {/* Provide the global context to the entire app */}
      <App /> {/* Main application component */}
    </Context>
  </StrictMode>
);
