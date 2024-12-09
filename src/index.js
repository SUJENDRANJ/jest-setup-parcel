import { StrictMode } from "react"; // React utility for highlighting potential issues in the app
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  //   <StrictMode>
  <App />
  //   </StrictMode>
);
