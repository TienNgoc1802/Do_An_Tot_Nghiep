import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import * as userService from "../../services/UserService";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import * as orderService from "../../services/OrderService";

const Account = () => {
	const [stage, setStage] = useState("UserInfo");
	const { user, setUser, setTotalProductInCart } = useContext(AppContext);
	const [selectedImage, setSelectedImage] = useState(null);
	const [fullname, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [passwordOld, setPasswordOld] = useState("");
	const [passwordNew, setPasswordNew] = useState("");
	const [confirmPasswordNew, setConfirmPasswordNew] = useState("");
	const [orders, setOrders] = useState(null);
	const [showDetails, setShowDetails] = useState({});
	const navigate = useNavigate();

	const toggleDetails = (index) => {
		setShowDetails((prevState) => ({
			...prevState,
			[index]: !prevState[index],
		}));
	};

	const fetchOrderByUserID = async () => {
		try {
			const data = await orderService.getOrderByUserID(user.id);
			setOrders(data);
		} catch (error) {
			console.log("Fetch order by user_id fail: ", error);
		}
	};

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmitInfo = async (e) => {
		e.preventDefault();
		try {
			const data = await userService.updateProfile(
				user.id,
				selectedImage,
				fullname,
				email,
				phone,
				address
			);
			setUser(data);
			sessionStorage.setItem("user", JSON.stringify(data));
			toast.success("Cập nhật thông tin tài khoản thành công.");
		} catch (error) {
			toast.error("Cập nhật thông tin tài khoản thất bại.");
			console.log("Updata user informtion fail: ", error);
		}
	};

	const handldeSubmitChangePassword = async (e) => {
		e.preventDefault();
		if (passwordOld !== user.password) {
			toast.error("Mật khẩu hiện tại không chính xác.");
			return;
		}

		if (passwordNew !== confirmPasswordNew) {
			toast.error("Vui lòng xác nhận lại mật khẩu mới.");
			return;
		}

		try {
			await userService.ChangePassword(user.id, passwordNew);
			toast.success("Thay đổi mật khẩu thành công.");
			setTimeout(() => {
				sessionStorage.removeItem("user");
				setUser(null);
				setTotalProductInCart(0);
				navigate("/signin");
			}, 2000);
		} catch (error) {
			toast.error("Thay đổi mật khẩu thất bại.");
			console.log("Updata user informtion fail: ", error);
		}
	};

	const formatBookingDate = (milliseconds) => {
		const date = new Date(milliseconds);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const handleHuyDon = async (order_id) => {
		try {
			await orderService.updateStatus(order_id, "Canceled");
			toast.success("Hủy đơn hàng thành công.");
			fetchOrderByUserID();
		} catch (error) {
			toast.error("Hủy đơn hàng thất bại.");
			console.log("Update status order fail: ", error);
		}
	};

	useEffect(() => {
		if (user) {
			setFullName(user.user_Name || "");
			setEmail(user.email || "");
			setPhone(user.phone_Number || "");
			setAddress(user.address || "");
		}
		fetchOrderByUserID();
	}, [user]);

	if (!user || !orders) {
		return <div>Loading...</div>; // or any placeholder UI
	}

	return (
		<div className="account-content pb-5" style={{ background: "#f5f5f5" }}>
			<div className="container">
				<div
					className="account-content-header"
					style={{
						paddingTop: "20px",
						marginBottom: "30px",
						textAlign: "center",
					}}
				>
					<h3 className="fw-bold mb-3">Tài khoản của bạn</h3>
					<div
						style={{
							margin: "20px auto 30px",
							display: "block",
							width: "60px",
							height: "4px",
							background: "black",
						}}
					></div>
				</div>
				<div className="row">
					<div className="col-3 col-lg-3 sidebar-account">
						<h5 className="fw-bold mb-3">Tài khoản</h5>
						<ul className="list-select">
							<li onClick={() => setStage("UserInfo")}>Thông tin tài khoản</li>
							<li onClick={() => setStage("MyOrder")}>Đơn hàng của tôi</li>
							<li onClick={() => setStage("ChangePassword")}>Đổi mật khẩu</li>
						</ul>
					</div>
					<div className="col-9 col-lg-9">
						{stage === "UserInfo" && (
							<div className="account-infomation">
								<h5 className="fw-bold mb-3">
									Thông tin tài khoản (id: {user.id})
								</h5>
								<form className="form-info" onSubmit={handleSubmitInfo}>
									<div className="row d-flex align-items-center">
										<div className="col-2">
											<label className="fw-bold" htmlFor="fullname">
												Họ và tên:
											</label>
										</div>
										<div className="col-10">
											<input
												name="fullname"
												className="form-control"
												value={fullname}
												type="text"
												onChange={(e) => setFullName(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-2">
											<label className="fw-bold" htmlFor="email">
												Email:
											</label>
										</div>
										<div className="col-10">
											<input
												name="email"
												className="form-control"
												value={email}
												type="text"
												onChange={(e) => setEmail(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-2">
											<label className="fw-bold" htmlFor="phone">
												Số điện thoại:
											</label>
										</div>
										<div className="col-10">
											<input
												name="phone"
												className="form-control"
												value={phone}
												type="text"
												onChange={(e) => setPhone(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-2">
											<label className="fw-bold" htmlFor="address">
												Địa chỉ:
											</label>
										</div>
										<div className="col-10">
											<input
												name="address"
												className="form-control"
												value={address}
												type="text"
												onChange={(e) => setAddress(e.target.value)}
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-2">
											<label className="fw-bold" htmlFor="avatar">
												Ảnh đại diện:
											</label>
										</div>
										<div className="col-10">
											<div className="d-flex align-items-center">
												<div className="col-6 col-lg-6">
													<input
														type="file"
														name="avatar"
														className="form-control"
														id="inputGroupFile04"
														aria-describedby="inputGroupFileAddon04"
														aria-label="Upload"
														onChange={handleImageUpload}
													/>
												</div>
												<div className="ms-4">
													{selectedImage ? (
														<img
															src={selectedImage}
															alt="Selected"
															accept="image/*"
															style={{ maxWidth: "60px", borderRadius: "50%" }}
														/>
													) : (
														<img
															src={user.avatar}
															alt="Selected"
															style={{ maxWidth: "60px", borderRadius: "50%" }}
														/>
													)}
												</div>
											</div>
										</div>
									</div>
									<button
										type="submit"
										className="btn btn-info text-light fw-bold mt-3 py-2 px-3"
									>
										Cập nhật thông tin
									</button>
								</form>
							</div>
						)}

						{stage === "MyOrder" && (
							<div className="account-myorder">
								<h5 className="fw-bold mb-3">
									Đơn hàng của tôi ({orders.length})
								</h5>
								<div className="list-order">
									{orders.map((order, index) => (
										<div className="order-item mb-3" key={index}>
											<div className="status d-flex justify-content-between mb-2">
												<p className="fw-bold">Đơn hàng #{index + 1}:</p>
												<p
													style={{
														color: "#FF6600",
														fontWeight: "bold",
													}}
												>
													{order.status === "Pending"
														? "Chờ xác nhận"
														: order.status === "Delivering"
														? "Đang giao hàng"
														: order.status === "Completed"
														? "Đã giao hàng"
														: "Đơn hàng bị hủy"}{" "}
												</p>
											</div>
											<hr />
											<div className="order-info my-2">
												<div className="d-flex justify-content-between align-items-center mb-3">
													<p className="fw-bold">Thông tin đơn hàng</p>
													<p>
														<strong>Ngày đặt hàng: </strong>
														{formatBookingDate(order.booking_Date)}
													</p>
												</div>
												<p>
													<strong>Tên người nhận: </strong>
													{order.fullname}
												</p>
												<p>
													<strong>Số điện thoại: </strong>
													{order.phone}
												</p>
												<p>
													<strong>Đia chỉ nhận hàng: </strong>
													{order.address}
												</p>
											</div>
											<hr />
											<div className="my-2">
												<div className="d-flex justify-content-between align-items-center">
													<p>
														<strong>Tổng số sản phẩm: </strong>
														{order.order_Item.length}
													</p>
													<div className="d-flex">
														<p style={{ color: "#FF6600", fontWeight: "bold" }}>
															Tổng tiền:
														</p>
														<p className="fw-bold ms-1">
															{`${new Intl.NumberFormat("vi-VN").format(
																order.total
															)}₫`}
														</p>
													</div>
												</div>
												{showDetails[index] && (
													<div className="list-product-order mt-3">
														{order.order_Item.map((item, index) => (
															<div
																className="product-item d-flex justify-content-between align-items-center mb-2"
																key={index}
															>
																<div className="d-flex">
																	<Link to={`/products/${item.product.id}`}>
																		<img
																			src={
																				item.product.productImage[0].url_Image
																			}
																			alt="Product Image"
																			style={{
																				width: "80px",
																				height: "85px",
																			}}
																		></img>
																	</Link>
																	<div className="ms-3">
																		<div className="product-name">
																			<Link to={`/products/${item.product.id}`}>
																				<p
																					style={{
																						overflow: "hidden",
																						fontWeight: "bold",
																						color: "#111111",
																					}}
																				>
																					{item.product.product_Name}
																				</p>
																			</Link>
																		</div>
																		<div className="product-size">
																			<span>Size: {item.size}</span>
																		</div>
																		<div className="product-count">
																			<span>Số lượng: x{item.count}</span>
																		</div>
																	</div>
																</div>
																<div className="product-price">
																	{item.product.promotion_Item &&
																	item.product.promotion_Item.length > 0 &&
																	item.product.promotion_Item[0].discount >
																		0 ? (
																		<div className="product-price d-flex align-items-center">
																			<span className="price-sale fw-bold">
																				{`${new Intl.NumberFormat(
																					"vi-VN"
																				).format(
																					item.product.price -
																						(item.product.price *
																							item.product.promotion_Item[0]
																								.discount) /
																							100
																				)}₫`}
																			</span>
																		</div>
																	) : (
																		<div>
																			<span className="price fw-bold">
																				{`${new Intl.NumberFormat(
																					"vi-VN"
																				).format(item.product.price)}₫`}
																			</span>
																		</div>
																	)}
																</div>
															</div>
														))}
													</div>
												)}
											</div>
											<hr />
											<div className="d-flex justify-content-end align-items-center mt-2">
												{(order.status !== "Completed" && order.status !== "Canceled") && (
													<button
														onClick={() => handleHuyDon(order.id)}
														className="btn btn-danger px-3 py-2"
													>
														Hủy đơn hàng
													</button>
												)}
												<button
													onClick={() => toggleDetails(index)}
													className="btn btn-info px-3 py-2 ms-2 text-light"
												>
													{showDetails[index] ? "Ẩn bớt" : "Xem chi tiết"}
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{stage === "ChangePassword" && (
							<div className="account-changepass">
								<h5 className="fw-bold mb-3">Thay đổi mật khẩu</h5>
								<form
									className="form-changepassword"
									onSubmit={handldeSubmitChangePassword}
								>
									<div className="row d-flex align-items-center">
										<div className="col-3">
											<label className="fw-bold" htmlFor="fullname">
												Mật khẩu hiện tại:
											</label>
										</div>
										<div className="col-9">
											<input
												name="passwordOld"
												className="form-control"
												type="password"
												onChange={(e) => setPasswordOld(e.target.value)}
												required
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-3">
											<label className="fw-bold" htmlFor="email">
												Mật khẩu mới:
											</label>
										</div>
										<div className="col-9">
											<input
												name="passwordNew"
												className="form-control"
												type="password"
												onChange={(e) => setPasswordNew(e.target.value)}
												required
											></input>
										</div>
									</div>
									<div className="row d-flex align-items-center mt-3">
										<div className="col-3">
											<label className="fw-bold" htmlFor="email">
												Nhập lại mật khẩu mới:
											</label>
										</div>
										<div className="col-9">
											<input
												name="confirmPasswordNew"
												className="form-control"
												type="password"
												onChange={(e) => setConfirmPasswordNew(e.target.value)}
												required
											></input>
										</div>
									</div>

									<button
										type="submit"
										className="btn btn-info text-light fw-bold mt-3 py-2 px-3"
									>
										Xác nhận thay đổi
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
