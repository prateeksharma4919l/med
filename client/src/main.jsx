import React from "react";
import ReactDOM from "react-dom/client";
import StableApp from "./StableApp.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./styles.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <StableApp />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
