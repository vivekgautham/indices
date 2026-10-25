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
