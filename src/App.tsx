import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "@/router/PublicRoutes";
import Layout from "@/layout/Layout";
import { AuthProvider } from "./hooks/useAuth";
function PublicRoutes() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <PublicRoutes />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
