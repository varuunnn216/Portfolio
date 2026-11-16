import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import "@fontsource/plus-jakarta-sans/latin-400.css";
import "@fontsource/plus-jakarta-sans/latin-500.css";
import "@fontsource/plus-jakarta-sans/latin-600.css";
import "@fontsource/plus-jakarta-sans/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";

import "./index.css";
import App from "./App.jsx";

const rootEl = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootEl.hasChildNodes() && rootEl.innerHTML.trim() !== "<!--app-html-->") {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
