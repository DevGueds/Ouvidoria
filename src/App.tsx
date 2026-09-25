import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PublicApp from "./PublicApp";
import AdminApp from "./AdminApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicWrapper />} />
        <Route path="/admin" element={<AdminWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

function PublicWrapper() {
  const navigate = useNavigate();
  return <PublicApp onAdmin={() => navigate("/admin")} />;
}

function AdminWrapper() {
  const navigate = useNavigate();
  return <AdminApp onPublic={() => navigate("/")} />;
}
