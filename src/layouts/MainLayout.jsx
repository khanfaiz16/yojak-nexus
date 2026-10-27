import { Outlet } from "react-router-dom";
import DemoStrip from "../components/DemoStrip.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <DemoStrip />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}