import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import IndexListPage from "./pages/IndexListPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexListPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
