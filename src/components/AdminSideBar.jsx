import React from "react";
import logo from "../assets/image/logo_shop.png";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
	const location = useLocation();

	return (
		<div className="menu">
			<div className="logo">
				<img src={logo} alt="Logo Shop" style={{ maxWidth: "70px" }} />
				<h3 className="fw-bold">Shoes Shop</h3>
			</div>
			
			<div className="menu-list">
				<Link
					to="/admin/dashboard"
					className={`item ${
						location.pathname.startsWith("/admin/dashboard") ? "active" : ""
					}`}
				>
					<i className="bi bi-houses-fill"></i>
					Dashboard
				</Link>
				<Link
					to="/admin/category"
					className={`item ${
						location.pathname.startsWith("/admin/category") ? "active" : ""
					}`}
				>
					<i className="bi bi-grid-1x2-fill"></i>
					Nhãn hàng
				</Link>
				<Link
					to="/admin/products"
					className={`item ${
						location.pathname.startsWith("/admin/products") ? "active" : ""
					}`}
				>
					<i className="bi bi-box-seam-fill"></i>
					Sản phẩm
				</Link>
				<Link
					to="/admin/order"
					className={`item ${
						location.pathname.startsWith("/admin/order") ? "active" : ""
					}`}
				>
					<i className="bi bi-cart3"></i>
					Đơn hàng
				</Link>
				<Link
					to="/admin/users"
					className={`item ${
						location.pathname.startsWith("/admin/users") ? "active" : ""
					}`}
				>
					<i className="bi bi-person-bounding-box"></i>
					Người dùng
				</Link>
				<Link
					to="/admin/promotion"
					className={`item ${
						location.pathname.startsWith("/admin/promotion") ? "active" : ""
					}`}
				>
					<i className="bi bi-fire"></i>
					Khuyến mãi
				</Link>
				<Link
					to="/admin/statistical"
					className={`item ${
						location.pathname.startsWith("/admin/statistical")
							? "active"
							: ""
					}`}
				>
					<i className="bi bi-bar-chart-line-fill"></i>
					Thống kê
				</Link>
			</div>
		</div>
	);
};

export default SideBar;
