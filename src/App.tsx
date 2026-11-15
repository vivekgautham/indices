import { Box, CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/layout/AppNavbar";
import { usePageTracking } from "./hooks/usePageTracking";
import HomePage from "./pages/HomePage";
import IndexDetailPage from "./pages/IndexDetailPage";
import IndexListPage from "./pages/IndexListPage";

const BenchmarkTrackerPage = lazy(
  () => import("./pages/BenchmarkTrackerPage"),
);

const EventsCalendarPage = lazy(
  () => import("./pages/EventsCalendarPage"),
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
  usePageTracking();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppNavbar />
      <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/indices" element={<IndexListPage />} />
            <Route path="/tracker" element={<BenchmarkTrackerPage />} />
            <Route
              path="/benchmark-tracker"
              element={<Navigate to="/tracker" replace />}
            />
            <Route path="/events" element={<EventsCalendarPage />} />
            <Route
              path="/calendar"
              element={<Navigate to="/events" replace />}
            />
            <Route path="/index/:indexId" element={<IndexDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
}
