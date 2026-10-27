import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import WhyChooseUs from "./pages/WhyChooseUs.jsx";
import Leadership from "./pages/Leadership.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import AccountIndex from "./pages/account/AccountIndex.jsx";
import SignIn from "./pages/account/SignIn.jsx";
import VerifyOtp from "./pages/account/VerifyOtp.jsx";
import AccountLayout from "./pages/account/AccountLayout.jsx";
import Profile from "./pages/account/Profile.jsx";
import OrderHistory from "./pages/account/OrderHistory.jsx";
import PageStub from "./pages/PageStub.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="why-choose-us" element={<WhyChooseUs />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />

        <Route path="account">
          <Route index element={<AccountIndex />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="verify-email" element={<VerifyOtp channel="email" />} />
          <Route path="verify-phone" element={<VerifyOtp channel="phone" />} />
          <Route element={<AccountLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<OrderHistory />} />
          </Route>
        </Route>

        <Route path="*" element={<PageStub title="Page not found" />} />
      </Route>
    </Routes>
  );
}