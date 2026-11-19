import RefreshIcon from "@mui/icons-material/Refresh";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunkError =
        this.state.error?.message?.includes("Failed to fetch dynamically imported module") ||
        this.state.error?.message?.includes("Importing a module script failed") ||
        this.state.error?.message?.includes("Unexpected token '<'") ||
        this.state.error?.name === "ChunkLoadError";

      return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3.5,
              textAlign: "center",
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.12)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                mx: "auto",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                color: "#f59e0b",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              <WarningAmberIcon sx={{ fontSize: 32 }} />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                mb: 1,
              }}
            >
              {isChunkError ? "App Update Available" : "Something Went Wrong"}
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              {isChunkError
                ? "A new version of the Market Indices catalog was deployed. Please reload the page to load the latest benchmark components."
                : "An unexpected error occurred while rendering this page. You can reload or return to the directory."}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={this.handleReload}
                startIcon={<RefreshIcon />}
                sx={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  backgroundColor: "#00DD94",
                  color: "#050D0A",
                  "&:hover": {
                    backgroundColor: "#34e5aa",
                  },
                }}
              >
                Reload Page
              </Button>

              <Button
                variant="outlined"
                onClick={this.handleReset}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  color: "text.secondary",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "text.primary",
                  },
                }}
              >
                Try Again
              </Button>
            </Stack>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
