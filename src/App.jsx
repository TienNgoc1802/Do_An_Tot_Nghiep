import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import { AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import Search from "./pages/user/Search";
import CheckOut from "./pages/user/CheckOut";
import Account from "./pages/user/Account";

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
	const location = useLocation();
	const isSignInPage =
		location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/checkout";

	return (
		<>
			{window.scrollTo(0, 0)}
			{!isSignInPage && <Header currentPage="home" />}
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
			</Routes>
			{!isSignInPage && <Footer />}
		</>
	);
};

export default App;
