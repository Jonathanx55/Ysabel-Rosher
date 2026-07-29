/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { UserLayout } from "./layouts/UserLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Faq } from "./pages/Faq";
import { Checkout } from "./pages/Checkout";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminControl } from "./pages/AdminControl";
import { AdminConfig } from "./pages/AdminConfig";
import { AdminClients } from "./pages/AdminClients";
import { AdminOrders } from "./pages/AdminOrders";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/control" element={<AdminControl />} />
              <Route path="/admin/config" element={<AdminConfig />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </OrderProvider>
  );
}
