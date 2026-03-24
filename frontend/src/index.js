import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// Add error handler for debugging
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('GLOBAL ERROR:', msg, url, lineNo, columnNo, error);
  return false;
};

window.onunhandledrejection = function(event) {
  console.error('UNHANDLED REJECTION:', event.reason);
};

try {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (error) {
  console.error('ROOT RENDER ERROR:', error);
  document.getElementById("root").innerHTML = '<h1 style="color:red;">Error: ' + error.message + '</h1>';
}
