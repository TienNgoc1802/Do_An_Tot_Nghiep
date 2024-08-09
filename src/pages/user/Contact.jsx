import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
	const [selectedLocation, setSelectedLocation] = useState("coSo1");

	return (
		<div>
			<div className="shop-detail pb-5" style={{ background: "#f5f5f5" }}>
				<div className="container-fluid">
					<div className="breadcrumb-shop" style={{ padding: "9px 0" }}>
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<Link
										to="/home"
										style={{ color: "darkgray", fontWeight: "400" }}
									>
										Trang Chủ
									</Link>
								</li>
								<li
									className="breadcrumb-item active"
									style={{ color: "darkgray", fontWeight: "400" }}
									aria-current="page"
								>
									Liên hệ
								</li>
							</ol>
						</nav>
					</div>
					<div className="d-flex justify-content-center align-items-center mb-3">
						<p className="fw-bold me-2">Chọn địa điểm:</p>
						<select
							id="location-select"
							className="form-control-sm fs-6"
							value={selectedLocation}
							onChange={(e) => setSelectedLocation(e.target.value)}
						>
							<option value="coSo1">Cơ sở 1</option>
							<option value="coSo2">Cơ sở 2</option>
						</select>
					</div>
					{selectedLocation === "coSo1" ? (
						<div>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4407109923327!2d106.65312867583842!3d10.777518759171967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec70272e349%3A0x8ad96775ab043226!2zMzE5IEzDvSBUaMaw4budbmcgS2nhu4d0LCBQaMaw4budbmcgMTUsIFF14bqtbiAxMSwgSOG7kyBDaMOtIE1pbmggNzAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1722829688288!5m2!1svi!2s"
								width="100%"
								height="600"
								style={{ border: 0 }}
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Google Maps"
							></iframe>
						</div>
					) : (
						<div>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.521541680384!2d106.78436437401814!3d10.847880157873735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCQ1ZUIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1723093984281!5m2!1svi!2s"
								width="100%"
								height="600"
								style={{ border: 0 }}
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Google Maps"
							></iframe>
						</div>
					)}
				</div>
				<div className="container mt-4">
					<div className="d-flex" style={{ gap: "20px" }}>
						<div
							style={{
								background: "#fff",
								flex: "1",
								borderRadius: "10px",
								padding: "15px",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							}}
						>
							<p style={{ fontSize: "20px", fontWeight: "bold" }}>
								SHOES SHOP TRANG THÔNG TIN CHÍNH THỨC
							</p>
							<p
								style={{
									fontWeight: "600",
									color: "grey",
									fontStyle: "italic",
								}}
							>
								Thông tin liên hệ
							</p>
							<hr className="my-3" />
							<p>
								⛪ <strong>Cơ sở 1: </strong>97 Đường Man Thiện, Phường Hiệp
								Phú, Quận 9, Thành phố Hồ Chí Minh
							</p>
							<p>
								⛪ <strong>Cơ sở 2: </strong>319 Đường Lý Thường Kiệt, Phường
								15, Quận 11, Thành phố Hồ Chí Minh
							</p>
							<p className="my-2">
								<strong>Email: </strong>nguyentienngoc18002@gmail.com
							</p>
							<p
								style={{
									fontSize: "18px",
									color: "#f39c12",
									paddingBottom: "10px",
									fontWeight: "700",
								}}
							>
								https://www.facebook.com/ngoc.t.nguyen.1042
							</p>
							<p>
								☎️ <strong>Hotline Bán Hàng: </strong>0833449178
							</p>
						</div>
						<div
							style={{
								flex: "1",
								padding: "15px",
							}}
						>
							<h3 className="fw-bold">LIÊN HỆ VỚI CHÚNG TÔI</h3>
							<div className="row">
								<div className="col-12 mt-4">
									<textarea
										className="form-control"
										placeholder="Nội dung"
										required
									/>
								</div>
								<div className="col-6 mt-3">
									<input
										className="form-control"
										placeholder="Họ tên"
										required
									/>
								</div>
								<div className="col-6 mt-3">
									<input
										className="form-control"
										placeholder="Số điện thoại"
										required
									/>
								</div>
								<div className="col-12 mt-3">
									<input
										className="form-control"
										placeholder="Email"
										required
									/>
								</div>
							</div>
							<button className="btn btn-warning mt-4 fw-bold px-3 py-2">
								GỬI NGAY
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
