import React, { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Home from "./pages/user/Home";
import ProductDetail from "./pages/user/ProductDetail";
import Cart from "./pages/user/Cart";
import Shop from "./pages/user/Shop";
import PolicySecurity from "./pages/user/PolicySecurity";
import Warranty from "./pages/user/Warranty";
import ReturnPolicy from "./pages/user/ReturnPolicy";
import ShippingAndInspectionPolicy from "./pages/user/ShippingInspectionPolicy";
import { AppContext, AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import Search from "./pages/user/Search";
import CheckOut from "./pages/user/CheckOut";
import Account from "./pages/user/Account";
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/Category";
import Order from "./pages/admin/Order";
import OrderDetail from "./pages/admin/OrderDetail";
import User from "./pages/admin/User";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import Promotion from "./pages/admin/Promotion";
import AddPromotion from "./pages/admin/AddPromotion";
import EditPromotion from "./pages/admin/EditPromotion";
import Statistical from "./pages/admin/Statistical";
import Product from "./pages/admin/Product";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Profile from "./pages/admin/Profile";
import Contact from "./pages/user/Contact";
import About from "./pages/user/About";
import VNPayResponsive from "./pages/user/VNPayResponsive";
import Delivery from "./pages/admin/Shipper";
import Voucher from "./pages/admin/Voucher";
import AddVoucher from "./pages/admin/AddVoucher";
import EditVoucher from "./pages/admin/EditVoucher";
import ShippingType from "./pages/admin/ShippingType";
import Shipper from "./pages/admin/Shipper";
import MoMoResponsive from "./pages/user/MoMoResponsive";
import Brand from "./pages/admin/Brand";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
};

const AppContent = () => {
  const { admin, setAdmin } = useContext(AppContext);
  const location = useLocation();
  const isSignInPage =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/checkout";
  const isAdminPage = location.pathname.startsWith("/admin");
  const isVNPayResponsive = location.pathname.startsWith("/paywithvnpay");
  const isMomoResponsive = location.pathname.startsWith("/paywithmomo");
  const navigate = useNavigate();

  useEffect(() => {
    {
      window.scrollTo(0, 0);
    }
    const storedAdmin = sessionStorage.getItem("admin");
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      setAdmin(adminData);
    } else if (isAdminPage && !admin) {
      navigate("/admin/login");
    }
  }, [isAdminPage, setAdmin, location.pathname]);

<<<<<<< HEAD
  return (
    <>
      {!isSignInPage &&
        !isAdminPage &&
        !isVNPayResponsive &&
        !isMomoResponsive && <Header currentPage="home" />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products/:product_id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collections/all" element={<Shop />} />
        <Route path="/chinh-sach-bao-mat" element={<PolicySecurity />} />
        <Route path="/qui-dinh-bao-hanh" element={<Warranty />} />
        <Route path="/chinh-sach-doi-tra" element={<ReturnPolicy />} />
        <Route
          path="/chinh-sach-van-chuyen-va-kiem-hang"
          element={<ShippingAndInspectionPolicy />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/paywithvnpay" element={<VNPayResponsive />} />
        <Route path="/paywithmomo" element={<MoMoResponsive />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="order" element={<Order />} />
          <Route path="order-detail/:order_id" element={<OrderDetail />} />
          <Route path="order" element={<Order />} />
          <Route path="users" element={<User />} />
          <Route path="users/add-user" element={<AddUser />} />
          <Route path="users/edit-user/:user_id" element={<EditUser />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="promotion/add-promotion" element={<AddPromotion />} />
          <Route
            path="promotion/edit-promotion/:id"
            element={<EditPromotion />}
          />
          <Route path="statistical" element={<Statistical />} />
          <Route path="products" element={<Product />} />
          <Route path="products/add-product" element={<AddProduct />} />
          <Route path="products/edit-product/:id" element={<EditProduct />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shippers" element={<Shipper />} />
          <Route path="vouchers" element={<Voucher />} />
          <Route path="vouchers/add-voucher" element={<AddVoucher />} />
          <Route path="vouchers/edit-voucher/:id" element={<EditVoucher />} />
          <Route path="shippingType" element={<ShippingType />} />
        </Route>
      </Routes>
      {!isSignInPage &&
        !isAdminPage &&
        !isVNPayResponsive &&
        !isMomoResponsive && <Footer />}
    </>
  );
=======
		else if(isAdminPage && !admin) {
			navigate("/admin/login");
		}
	}, [isAdminPage, setAdmin, location.pathname]);

	return (
		<>
			{!isSignInPage && !isAdminPage && !isVNPayResponsive && !isMomoResponsive && <Header currentPage="home" />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/products/:product_id" element={<ProductDetail />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/collections/all" element={<Shop />} />
				<Route path="/chinh-sach-bao-mat" element={<PolicySecurity />} />
				<Route path="/qui-dinh-bao-hanh" element={<Warranty />} />
				<Route path="/chinh-sach-doi-tra" element={<ReturnPolicy />} />
				<Route
					path="/chinh-sach-van-chuyen-va-kiem-hang"
					element={<ShippingAndInspectionPolicy />}
				/>
				<Route path="/search" element={<Search />} />
				<Route path="/checkout" element={<CheckOut />} />
				<Route path="/account" element={<Account />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About/>} />
				<Route path="/paywithvnpay" element={<VNPayResponsive />} />
				<Route path="/paywithmomo" element={<MoMoResponsive />} />
				<Route path="/admin/login" element={<LoginAdmin />} />
				<Route path="/admin">
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="category" element={<Category />} />
					<Route path="brand" element={<Brand />} />
					<Route path="order" element={<Order />} />
					<Route path="order-detail/:order_id" element={<OrderDetail />} />
					<Route path="order" element={<Order />} />
					<Route path="users" element={<User />} />
					<Route path="users/add-user" element={<AddUser />} />
					<Route path="users/edit-user/:user_id" element={<EditUser />} />
					<Route path="promotion" element={<Promotion />} />
					<Route path="promotion/add-promotion" element={<AddPromotion />} />
					<Route
						path="promotion/edit-promotion/:id"
						element={<EditPromotion />}
					/>
					<Route path="statistical" element={<Statistical />} />
					<Route path="products" element={<Product />} />
					<Route path="products/add-product" element={<AddProduct />} />
					<Route path="products/edit-product/:id" element={<EditProduct />} />
					<Route path="profile" element={<Profile />} />
					<Route path="shippers" element={<Shipper />} />
					<Route path="vouchers" element={<Voucher />} />
					<Route path="vouchers/add-voucher" element={<AddVoucher />} />
					<Route path="vouchers/edit-voucher/:id" element={<EditVoucher />} />
					<Route path="shippingType" element={<ShippingType />} />
				</Route>
			</Routes>
			{!isSignInPage && !isAdminPage && !isVNPayResponsive && !isMomoResponsive && <Footer />}
		</>
	);
>>>>>>> 699ef57 (9 update)
};

export default App;
