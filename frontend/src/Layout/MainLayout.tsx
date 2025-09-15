import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* No Suspense here — handled at App.tsx and per-page */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
