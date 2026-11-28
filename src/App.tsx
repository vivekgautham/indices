import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/common/ErrorBoundary";
import AppNavbar from "./components/layout/AppNavbar";
import { usePageTracking } from "./hooks/usePageTracking";
import HomePage from "./pages/HomePage";
import IndexDetailPage from "./pages/IndexDetailPage";
import IndexListPage from "./pages/IndexListPage";
import { lazyWithRetry } from "./utils/lazyWithRetry";

const BenchmarkTrackerPage = lazyWithRetry(
  () => import("./pages/BenchmarkTrackerPage"),
);

const InstitutionalHoldings13FPage = lazyWithRetry(
  () => import("./pages/InstitutionalHoldings13FPage"),
);

const InvestorDetailPage = lazyWithRetry(
  () => import("./pages/InvestorDetailPage"),
);

const EventsCalendarPage = lazyWithRetry(
  () => import("./pages/EventsCalendarPage"),
);

const ExchangesPage = lazyWithRetry(() => import("./pages/ExchangesPage"));
const TermsPage = lazyWithRetry(() => import("./pages/TermsPage"));

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
      <Box
        component="main"
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <ErrorBoundary>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/indices" element={<IndexListPage />} />
              <Route path="/tracker" element={<BenchmarkTrackerPage />} />
              <Route
                path="/benchmark-tracker"
                element={<Navigate to="/tracker" replace />}
              />
              <Route path="/13f" element={<InstitutionalHoldings13FPage />} />
              <Route path="/13f/:investorId" element={<InvestorDetailPage />} />
              <Route
                path="/filings"
                element={<Navigate to="/13f" replace />}
              />
              <Route
                path="/institutional"
                element={<Navigate to="/13f" replace />}
              />
              <Route path="/events" element={<EventsCalendarPage />} />
              <Route
                path="/calendar"
                element={<Navigate to="/events" replace />}
              />
              <Route path="/markets" element={<ExchangesPage />} />
              <Route
                path="/exchanges"
                element={<Navigate to="/markets" replace />}
              />
              <Route path="/index/:indexId" element={<IndexDetailPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route
                path="/terms-of-use"
                element={<Navigate to="/terms" replace />}
              />
              <Route
                path="/disclaimer"
                element={<Navigate to="/terms" replace />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}
