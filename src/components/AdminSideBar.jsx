import React, { useContext, useState } from "react";
import logo from "../assets/image/logo_shop.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SideBar = () => {
	const { admin, setAdmin } = useContext(AppContext);
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("admin");
		setAdmin(null);
		navigate("/admin/logout");
	}

	return (
		<div className="menu">
			<div className="logo">
				<img src={logo} alt="Logo Shop" style={{ maxWidth: "70px" }} />
				<h3 className="fw-bold">Shoes Shop</h3>
			</div>

			<div
				class="dropdown mb-4"
				style={{ marginLeft: "10px", cursor: "pointer" }}
			>
				<button
					className="btn dropdown-toggle d-flex align-items-center"
					type="button"
					style={{ border: "none" }}
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<img
						src={admin?.avatar}
						className="rounded-circle"
						alt="Avatar User"
						style={{ width: "40px" }}
					/>
					<span className="ms-2 text-info fw-bold">Hello, admin</span>
				</button>

				<ul class="dropdown-menu">
					<li>
						<Link className="dropdown-item" to="/admin/profile">
							Thông tin cá nhân
						</Link>
					</li>
					<li>
						<span className="dropdown-item" onClick={handleLogout}>
							Đăng xuất
						</span>
					</li>
				</ul>
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
						location.pathname.startsWith("/admin/statistical") ? "active" : ""
					}`}
				>
					<i className="bi bi-bar-chart-line-fill"></i>
					Thống kê
				</Link>
				<Link
					to="/admin/delivery"
					className={`item ${
						location.pathname.startsWith("/admin/delivery") ? "active" : ""
					}`}
				>
					<i className="bi bi-truck-flatbed"></i>
					Giao hàng
				</Link>
				<Link
					to="/admin/vouchers"
					className={`item ${
						location.pathname.startsWith("/admin/vouchers") ? "active" : ""
					}`}
				>
					<i className="bi bi-percent"></i>
					Mã giảm giá
				</Link>
			</div>
		</div>
	);
};

export default SideBar;
