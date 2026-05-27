import React from "react";
import ReactDOM from "react-dom/client";
import StableApp from "./StableApp.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./styles.css";

function bootMedEase() {
  const rootElement = document.getElementById("root");
  if (!rootElement || rootElement.dataset.medeaseBooted === "true") return;

  rootElement.dataset.medeaseBooted = "true";
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <StableApp />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootMedEase);
} else {
  bootMedEase();
}
