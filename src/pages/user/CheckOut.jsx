import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo_shop.png";
import shipper from "../../assets/image/shipper.png";
import COD from "../../assets/image/delivery.png";
import tranfer from "../../assets/image/mobile-transfer.png";
import success from "../../assets/image/success.png";
import * as cartService from "../../services/CartService";
import * as orderService from "../../services/OrderService";
import toast from "react-hot-toast";

const ModalSuccess = ({ isOpen }) => {
	useEffect(() => {
		if (isOpen) {
			// Thêm lớp phủ mờ
			document.body.classList.add("modal-open");
			const backdrop = document.createElement("div");
			backdrop.className = "modal-backdrop fade show";
			document.body.appendChild(backdrop);
		} else {
			// Xóa lớp phủ mờ
			document.body.classList.remove("modal-open");
			const backdrop = document.querySelector(".modal-backdrop");
			if (backdrop) {
				backdrop.remove();
			}
		}

		return () => {
			// Đảm bảo lớp phủ mờ được xóa khi component bị unmount
			document.body.classList.remove("modal-open");
			const backdrop = document.querySelector(".modal-backdrop");
			if (backdrop) {
				backdrop.remove();
			}
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className="modal fade show"
			style={{ display: "block" }}
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div
						className="modal-body"
						style={{ padding: "20px", textAlign: "center" }}
					>
						<img src={success} alt="Success Icon"></img>
						<h3 className="fw-bold my-3" style={{ color: "#FF6600" }}>
							Đặt hàng thành công
						</h3>
						<p>
							Chúng tôi sẽ liên hệ Quý khách <br />
							để xác nhận đơn hàng trong thời gian sớm nhất.
						</p>
						<Link to="/home">
							<button className="btn btn-info text-light mt-3 px-4 py-2 fw-bold">Về trang chủ</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

const CheckOut = () => {
	const { user, totalProductInCart, setTotalProductInCart } =
		useContext(AppContext);
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState("");
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [selectedWard, setSelectWard] = useState("");
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState("Pay On Delivery");
	const [listCart, setListCart] = useState([]);
	const [message, setMessage] = useState(false);
	const [total, setTotal] = useState(0);
	const [fullName, setFullName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [transportFee, setTransportFee] = useState(30000);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchListCart = async () => {
		try {
			const data = await cartService.cartOfUser(user.id);
			setListCart(data);
			calculateTotal(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchListCart();
	}, [totalProductInCart]);

	const calculateTotal = (items) => {
		let totalPrice = 0;
		items.forEach((item) => {
			if (
				item.product.promotion_Item &&
				item.product.promotion_Item.length > 0 &&
				item.product.promotion_Item[0].discount > 0
			) {
				const discount = item.product.promotion_Item[0].discount;
				totalPrice +=
					(item.product.price - (item.product.price * discount) / 100) *
					item.count;
			} else {
				totalPrice += item.product.price * item.count;
			}
		});
		setTotal(totalPrice);
	};

	const handlePaymentMethodChange = (event) => {
		setSelectedPaymentMethod(event.target.id);
	};

	// Hàm để tải danh sách tỉnh/thành
	useEffect(() => {
		const loadProvinces = async () => {
			try {
				const response = await fetch("http://localhost:8090/api/v1/provinces");
				const data = await response.json();
				setProvinces(data.data);
			} catch (error) {
				console.error("Error loading provinces:", error);
			}
		};
		loadProvinces();
	}, []);

	// Hàm để tải danh sách quận/huyện dựa vào tỉnh/thành đã chọn
	useEffect(() => {
		if (selectedProvince) {
			const loadDistricts = async () => {
				try {
					const response = await fetch(
						`http://localhost:8090/api/v1/districts/${selectedProvince}`
					);
					const data = await response.json();
					setDistricts(data.data);
					setWards([]); // Reset wards khi chọn tỉnh/thành khác
				} catch (error) {
					console.error("Error loading districts:", error);
				}
			};
			loadDistricts();
		} else {
			setDistricts([]);
			setWards([]);
		}
	}, [selectedProvince]);

	// Hàm để tải danh sách phường/xã dựa vào quận/huyện đã chọn
	useEffect(() => {
		if (selectedDistrict) {
			const loadWards = async () => {
				try {
					const response = await fetch(
						`http://localhost:8090/api/v1/wards/${selectedDistrict}`
					);
					const data = await response.json();
					setWards(data.data);
				} catch (error) {
					console.error("Error loading wards:", error);
				}
			};
			loadWards();
		} else {
			setWards([]);
		}
	}, [selectedDistrict]);

	const getSelectedProvinceName = () => {
		const selectedProvinceObject = provinces.find(
			(province) => province.id === selectedProvince
		);
		return selectedProvinceObject
			? selectedProvinceObject.full_name
			: console.log("Chưa chọn tỉnh thành");
	};

	const getSelectedDistrictName = () => {
		const selectedDistrictObject = districts.find(
			(district) => district.id === selectedDistrict
		);
		return selectedDistrictObject
			? selectedDistrictObject.full_name
			: console.log("Chưa chọn quận huyện");
	};

	const getSelectedWardName = () => {
		const selectedWardObject = wards.find((ward) => ward.id === selectedWard);
		return selectedWardObject
			? selectedWardObject.full_name
			: console.log("Chưa chọn phường xã");
	};

	const handleSubmitCheckOut = async (e) => {
		e.preventDefault();
		let finalAddress = `${address}, ${getSelectedWardName()}, ${getSelectedDistrictName()}, ${getSelectedProvinceName()}`;
		let finalTotal = total + transportFee;

		try {
			const data = await orderService.placeOrder(
				user.id,
				fullName,
				phone,
				finalAddress,
				selectedPaymentMethod,
				finalTotal
			);
			if (data) {
				toast.success("Đã thanh toán thành công.");
				setTotalProductInCart(0);
				setIsModalOpen(true);
			}
		} catch (error) {
			console.log("Check out fail: ", error);
		}
	};

	return (
		<div>
			<ModalSuccess isOpen={isModalOpen} />
			<div className="checkout">
				<div className="container">
					<div className="row">
						<div className="col-7 col-lg-7">
							<div className="main">
								<div className="main-header">
									<Link to="/">
										<div className="logo-shop d-flex align-items-center">
											<img
												src={logo}
												alt="Logo"
												style={{
													width: "90px",
													height: "auto",
												}}
											/>
											<span className="h1 fw-bold text-black-50">
												Shoes Shop
											</span>
										</div>
									</Link>
									<nav
										className="breadcrumb-divider mt-2 mb-3"
										aria-label="breadcrumb"
									>
										<ol className="breadcrumb">
											<li className="breadcrumb-item">
												<Link to="/cart" className="text-black">
													Giỏ hàng
												</Link>
											</li>
											<li
												className="breadcrumb-item active"
												aria-current="page"
											>
												Thông tin giao hàng
											</li>
										</ol>
									</nav>
									<h4 className="fw-bold mb-3">Thông tin giao hàng</h4>
								</div>
								<div className="main-content">
									<form
										className="form form-checkout"
										onSubmit={handleSubmitCheckOut}
									>
										<div className="row">
											<div className="col-7 col-lg-7">
												<label
													htmlFor="fullname"
													className="form-label fw-bold"
												>
													Họ và tên
												</label>
												<input
													name="fullname"
													type="text"
													className="form-control"
													placeholder="Họ và tên"
													required
													value={fullName}
													onChange={(e) => setFullName(e.target.value)}
												/>
											</div>
											<div className="col-5 col-lg-5">
												<label htmlFor="phone" className="form-label fw-bold">
													Số điện thoại
												</label>
												<input
													name="phone"
													type="text"
													className="form-control"
													placeholder="Số điện thoại"
													required
													value={phone}
													onChange={(e) => setPhone(e.target.value)}
												/>
											</div>
											<div className="col-12 col-lg-12 mt-3">
												<label htmlFor="address" className="form-label fw-bold">
													Địa chỉ
												</label>
												<input
													name="address"
													type="text"
													className="form-control"
													placeholder="Địa chỉ"
													required
													value={address}
													onChange={(e) => setAddress(e.target.value)}
												/>
											</div>
											<div className="col-4 col-lg-4 mt-3">
												<label
													htmlFor="province"
													className="form-label fw-bold"
												>
													Tỉnh/Thành:
												</label>
												<select
													id="province"
													className="form-select"
													value={selectedProvince}
													onChange={(e) => setSelectedProvince(e.target.value)}
													required
												>
													<option value="">Chọn Tỉnh/Thành</option>
													{provinces.map((province) => (
														<option key={province.id} value={province.id}>
															{province.full_name}
														</option>
													))}
												</select>
											</div>
											<div className="col-4 col-lg-4 mt-3">
												<label
													htmlFor="district"
													className="form-label fw-bold"
												>
													Quận/Huyện:
												</label>
												<select
													id="district"
													className="form-select"
													value={selectedDistrict}
													onChange={(e) => setSelectedDistrict(e.target.value)}
													required
												>
													<option value="">Chọn Quận/Huyện</option>
													{districts.map((district) => (
														<option key={district.id} value={district.id}>
															{district.full_name}
														</option>
													))}
												</select>
											</div>
											<div className="col-4 col-lg-4 mt-3">
												<label htmlFor="ward" className="form-label fw-bold">
													Phường/Xã:
												</label>
												<select
													className="form-select"
													id="ward"
													value={selectedWard}
													onChange={(e) => setSelectWard(e.target.value)}
													required
												>
													<option value="">Chọn Phường/Xã</option>
													{wards.map((ward) => (
														<option key={ward.id} value={ward.id}>
															{ward.full_name}
														</option>
													))}
												</select>
											</div>
										</div>
										<div className="section-convert mt-3">
											<h4 className="fw-bold">Phương thức vận chuyển</h4>
											<div
												className="d-flex justify-content-between align-items-center mt-2"
												style={{
													border: "1px solid darkgrey",
													borderRadius: "3px",
												}}
											>
												<div className="d-flex justify-content-start align-items-center p-2">
													<input
														type="radio"
														id="shipping-rate"
														className="mx-3"
														checked
													/>
													<img src={shipper} alt="Shipper Icon"></img>
													<span className="ms-3">Giao hàng tận nơi</span>
												</div>
												<span className="me-4">{`${new Intl.NumberFormat(
													"vi-VN"
												).format(30000)}₫`}</span>
											</div>
										</div>
										<div className="section-payment-method mt-4">
											<h4 className="fw-bold">Phương thức thanh toán</h4>
											<div
												className=" mt-2"
												style={{
													border: "1px solid darkgrey",
													borderRadius: "3px",
												}}
											>
												<div className="d-flex justify-content-start align-items-center p-2">
													<input
														type="radio"
														id="Pay On Delivery"
														className="mx-3"
														checked={
															selectedPaymentMethod === "Pay On Delivery"
														}
														onChange={handlePaymentMethodChange}
													/>
													<img src={COD} alt="COD Icon"></img>
													<span className="ms-3">
														Thanh toán khi giao hàng (COD)
													</span>
												</div>
											</div>
											<div
												className="mt-1"
												style={{
													border: "1px solid darkgrey",
													borderRadius: "3px",
												}}
											>
												<div className="d-flex justify-content-start align-items-center p-2">
													<input
														type="radio"
														id="Pay On Bank"
														className="mx-3"
														checked={selectedPaymentMethod === "Pay On Bank"}
														onChange={handlePaymentMethodChange}
													/>
													<img src={tranfer} alt="Bank Tranfer Icon"></img>
													<span className="ms-3">
														Chuyển khoản qua ngân hàng
													</span>
												</div>
												{selectedPaymentMethod === "Pay On Bank" && (
													<>
														<hr />
														<div
															style={{ textAlign: "center", padding: "20px" }}
														>
															Quí khách chuyển khoản qua ngân hàng với nội dung:{" "}
															<br />
															Số điện thoại + Họ Tên <br />
															<br />
															Ngân hàng TPBank <br />
															Số tài khoản: 0000 1762 871 <br />
															Chủ tài khoản: Nguyễn Tiến Ngọc
														</div>
													</>
												)}
											</div>
											<div className="d-flex justify-content-between align-items-center mt-4">
												<Link to="/cart">
													<span className="text-info">
														<i className="bi bi-chevron-double-left"></i> Giỏ
														hàng
													</span>
												</Link>
												<button
													type="submit"
													style={{
														color: "#fff",
														background: "#338dbc",
														border: "1px solid #338dbc",
														borderRadius: "4px",
														padding: "10px 20px",
													}}
												>
													Hoàn tất đơn hàng
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-5 col-lg-5">
							<div className="sidebar">
								<div className="list-product">
									{listCart.map((item, index) => (
										<div
											className="product-thumbnail d-flex justify-content-between align-items-center mb-3"
											key={index}
										>
											<div className="product-thumbnail-left d-flex justify-content-start align-items-center">
												<div
													className="product-image position-relative"
													style={{
														width: "70px",
														height: "70px",
														border: "1px solid darkgray",
														borderRadius: "5px",
													}}
												>
													<Link to={`/products/${item.product.id}`}>
														<img
															src={item.product.productImage[0].url_Image}
															alt="Product Image"
															style={{
																width: "68.5px",
																height: "67.5px",
																padding: "0 5px",
															}}
														></img>
													</Link>

													<span
														className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
														style={{ background: "#999999E6" }}
													>
														{item.count}
													</span>
												</div>
												<div className="ms-3">
													<div className="product-name">
														<Link to={`/products/${item.product.id}`}>
															<p
																style={{
																	overflow: "hidden",
																	fontWeight: "500",
																	color: "#111111",
																	width: "220px",
																}}
															>
																{item.product.product_Name}
															</p>
														</Link>
													</div>
													<div className="produuct-size">
														<span>Size: {item.size}</span>
													</div>
												</div>
											</div>
											<div className="product-price">
												{item.product.promotion_Item &&
												item.product.promotion_Item.length > 0 &&
												item.product.promotion_Item[0].discount > 0 ? (
													<div className="product-price d-flex align-items-center">
														<span className="price-sale fw-bold">
															{`${new Intl.NumberFormat("vi-VN").format(
																item.product.price -
																	(item.product.price *
																		item.product.promotion_Item[0].discount) /
																		100
															)}₫`}
														</span>
													</div>
												) : (
													<div>
														<span className="price fw-bold">
															{`${new Intl.NumberFormat("vi-VN").format(
																item.product.price
															)}₫`}
														</span>
													</div>
												)}
											</div>
										</div>
									))}
								</div>
								<hr />
								<div className="voucher row my-3">
									<div className="col-6">
										<input
											type="text"
											id="voucher"
											className="form-control"
											placeholder="Mã giảm giá"
											required
										></input>
									</div>
									<div className="col-6 d-flex justify-content-end">
										<button className="btn btn-info btn-huy text-light me-3">
											Hủy
										</button>
										<button className="btn btn-info btn-ap-dung text-light">
											Áp dụng
										</button>
									</div>
								</div>
								<hr />
								<div class="order-summary-section my-3">
									<div className="d-flex justify-content-between align-items-center">
										<span className="total-line-name">Tạm tính</span>
										<span className="total-line-price">
											{`${new Intl.NumberFormat("vi-VN").format(total)}₫`}
										</span>
									</div>
									<div className="d-flex justify-content-between align-items-center mt-2">
										<span className="total-line-name">Phí vận chuyển</span>
										<span className="total-line-price">
											{`${new Intl.NumberFormat("vi-VN").format(
												transportFee
											)}₫`}
										</span>
									</div>
								</div>
								<hr />
								<div className="d-flex justify-content-between align-items-center mt-4">
									<span className="payment-due-label-total">Tổng cộng</span>
									<div className="d-flex align-items-center">
										<span
											className="payment-due-currency me-3"
											style={{
												fontSize: "13px",
												fontWeight: "600",
												color: "darkgray",
											}}
										>
											VND
										</span>
										<span className="payment-due-price fs-4 fw-medium">
											{`${new Intl.NumberFormat("vi-VN").format(
												total + 30000
											)}₫`}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckOut;
