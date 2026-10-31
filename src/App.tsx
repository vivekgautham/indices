import { Box, CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/layout/AppNavbar";
import IndexDetailPage from "./pages/IndexDetailPage";
import IndexListPage from "./pages/IndexListPage";

const BenchmarkTrackerPage = lazy(
  () => import("./pages/BenchmarkTrackerPage"),
);

function PageLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppNavbar />
      <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<IndexListPage />} />
            <Route path="/tracker" element={<BenchmarkTrackerPage />} />
            <Route
              path="/benchmark-tracker"
              element={<Navigate to="/tracker" replace />}
            />
            <Route path="/index/:indexId" element={<IndexDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
}
