// Layout.tsx
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main">
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <Footer />
    </div>
  );
}
