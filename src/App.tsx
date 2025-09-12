import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "@/router/Index";
import "leaflet/dist/leaflet.css";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
