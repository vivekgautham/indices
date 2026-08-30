import { Box, Container, Typography } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 800 }}
        >
          📊 Indices Catalog
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore major index providers and their index offerings.
        </Typography>
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
