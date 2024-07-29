import React, { useContext, useState } from "react";
import logo from "../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
	const navigate = useNavigate();
	const [inputSearch, setInputSearch] = useState("   ");
	const {
		user,
		setUser,
		totalProductInCart,
		setTotalProductInCart,
		setSearchContent,
	} = useContext(AppContext);

	const handleSignOut = () => {
		sessionStorage.removeItem("user");
		setUser(null);
		setTotalProductInCart(0);
		navigate("/home");
	};

	const handleClickSearch = () => {
		setSearchContent(inputSearch);
		navigate("/search");
	}

	return (
		<header className="header">
			<div className="header__top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-2">
							<div className="header__logo">
								<Link to="/home" className="ms-3 ps-4">
									<img src={logo} alt="Shoes Shop Logo" />
								</Link>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="header__search">
								<div className="pt-3 mt-1 ms-4">
									<input
										type="text"
										className="form-control"
										placeholder="Tìm kiếm sản phẩm..."
										value={inputSearch}
										onChange={(event) => setInputSearch(event.target.value)}
									></input>
									<button className="btn" onClick={handleClickSearch}>
										<i className="bi bi-search"></i>
									</button>
								</div>
							</div>
						</div>
						<div className="col-lg-3">
							<div className="header__user ps-4">
								<div className="row">
									{user ? (
										<>
											<div className="col-2 pt-3 ps-2">
												<Link to="/account">
													<img
														src={user.avatar}
														className="rounded-circle avatar"
														alt="Avatar User"
													></img>
												</Link>
											</div>
											<div className="col-10 pt-3">
												<span className="text-info fw-bold">
													{user.user_Name}
												</span>
												<br></br>
												<Link
													to="/#"
													className="fw-bold text-dark"
													onClick={handleSignOut}
												>
													Đăng xuất
												</Link>
											</div>
										</>
									) : (
										<>
											<div className="col-2 pt-2 mt-1 ps-3">
												<i className="bi bi-person-circle fs-1 text-info"></i>
											</div>
											<div className="col-10 pt-3">
												<span className="text-info fw-bold">Xin chào,</span>
												<br></br>
												<Link to="/signin" className="fw-bold text-dark">
													Đăng nhập
												</Link>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<div className="col-lg-2">
							<div className="header__option pt-3">
								<Link to="/cart" className="position-relative">
									<i className="bi bi-cart3 text-dark fs-2"></i>
									<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
										{totalProductInCart}
									</span>
								</Link>
								<span className="ps-3 fw-bold">Giỏ hàng</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="header__bottom">
				<nav className="header__menu mb-2">
					<ul>
						<li>
							<Link to="/home">Trang chủ</Link>
						</li>
						<li>
							<Link to="/collections/all">Cửa hàng</Link>
						</li>
						<li>
							<Link to="/about">Giới thiệu</Link>
						</li>
						<li>
							<Link to="/contact">Liên hệ</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
