import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ColorThemeProvider } from "./theme/ThemeContext";

// Seamlessly rewrite legacy hash-based URLs (e.g. /#/index/sp-500 -> /index/sp-500)
if (window.location.hash.startsWith("#/")) {
  const cleanPath = window.location.hash.slice(1);
  window.history.replaceState(null, "", cleanPath);
}

// Automatically reload when new deployments update chunk hashes, preventing blank screens (guarded against infinite loops)
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  const reloadKey = "vite_preload_error_reload";
  const lastReload = Number(sessionStorage.getItem(reloadKey) || "0");
  const now = Date.now();
  // Allow at most 1 reload within 15 seconds to prevent rapid infinite reload loops
  if (now - lastReload > 15000) {
    sessionStorage.setItem(reloadKey, String(now));
    window.location.reload();
  } else {
    console.error(
      "Vite chunk preload error detected repeatedly; halting reload to prevent loop:",
      event,
    );
  }
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ColorThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
