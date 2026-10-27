import { NavLink, Navigate, Outlet } from "react-router-dom";
import { LogOut, Package, User } from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import DemoAuthBanner from "../../components/DemoAuthBanner.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export default function AccountLayout() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Navigate to="/account/sign-in" replace />;
  }

  return (
    <>
      <PageHeader
        eyebrow="My account"
        title={`Welcome, ${user.name}`}
        text="A preview of the proposed customer account area."
      />

      <section className="section">
        <div className="container">
          <DemoAuthBanner />
          <div className="account-layout">
            <nav className="account-nav" aria-label="Account navigation">
              <NavLink to="/account/profile">
                <User size={18} aria-hidden="true" /> Profile
              </NavLink>
              <NavLink to="/account/orders">
                <Package size={18} aria-hidden="true" /> Order history
              </NavLink>
              <button type="button" onClick={signOut}>
                <LogOut size={18} aria-hidden="true" /> Sign out
              </button>
            </nav>

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}