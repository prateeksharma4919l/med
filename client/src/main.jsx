import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./styles.css";

function bootMedEase() {
  const rootElement = document.getElementById("root");
  if (!rootElement || rootElement.dataset.medeaseBooted === "true") return;

  rootElement.dataset.medeaseBooted = "true";
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <HashRouter>
          <App />
        </HashRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootMedEase);
} else {
  bootMedEase();
}
