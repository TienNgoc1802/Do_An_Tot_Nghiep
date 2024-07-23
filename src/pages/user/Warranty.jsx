import React from "react";
import { Link } from "react-router-dom";

const Warranty = () => {
	return (
		<div
			className="warranty-regulations pb-5"
			style={{ background: "#f5f5f5" }}
		>
			<div className="container-fluid">
				<div className="breadcrumb-shop" style={{ padding: "9px 0" }}>
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item">
								<Link
									to="/home"
									style={{ color: "darkgray", fontWeight: "400" }}
								>
									Trang Chủ
								</Link>
							</li>
							<li
								class="breadcrumb-item active"
								style={{ color: "darkgray", fontWeight: "400" }}
								aria-current="page"
							>
								Qui Định Bảo Hành
							</li>
						</ol>
					</nav>
				</div>
				<div
					className="wrapper-pageDetail"
					style={{ background: "#fff", padding: "10px 15px" }}
				>
					<div className="heading-pageDetail">
						<h4 className="fw-bold pb-3">Qui Định Bảo Hành</h4>
					</div>
					<div className="content-pageDetail typeList-style">
						<p>
							<span>
								Trong thời gian sử dụng nếu gặp bất kỳ trục trặc, lỗi sản phẩm
								nào. Khách hàng mang trực tiếp sản phẩm đến trung tâm bảo hành
								của hãng.
							</span>
						</p>
						<p>
							<span>
								<b>1. Điều kiện bảo hành hợp lệ:</b>
							</span>
						</p>
						<ul className="ps-4">
							<li>
								<span>
									Sản phẩm còn nguyên vẹn, không bị nứt vỡ, không bị biến dạng
									do tác động của ngoại lực.
								</span>
							</li>
							<li>
								<span>
									Sản phẩm không có dấu hiệu bị ẩm, vô nước dẫn đến gây chạm
									mạch.
								</span>
							</li>
							<li>
								<span>
									Sản phẩm phải còn nguyên vẹn thông tin S/N và tem của nhà phân
									phối còn nguyên vẹn với đầy đủ thông tin thời gian bảo hành.
								</span>
							</li>
							<li>
								<span>Sản phẩm phải còn trong thời gian bảo hành.</span>
							</li>
						</ul>
						<p>
							<span>
								<b>2. Điều kiện từ chối bảo hành</b>
							</span>
						</p>
						<ul className="ps-4">
							<li>
								<span>
									Sản phẩm bị hư do thiên tai, hỏa hoạn, lụt lội, sét đánh, côn
									trùng, động vật vào.
								</span>
							</li>
							<li>
								<span>
									Sản phẩm được đặt nơi bụi bẩn, ẩm ướt, bị vào nước, bị thấm
									nước.
								</span>
							</li>
							<li>
								Sản phẩm bị biến dạng do tác động nhiệt, tác động bên ngoài.
							</li>
							<li>
								Sản phẩm có vết mốc, rỉ sét hoặc bị ăn mòn, oxy hóa bởi hóa
								chất.
							</li>
							<li>
								<span>
									Sản phẩm bị hư do dùng sai điện thế và dòng điện chỉ định.
								</span>
							</li>
							<li>
								<span>
									Khách hàng gây nên những khuyết tật như biến dạng, nứt vỡ,
									trầy xước.
								</span>
							</li>
							<li>
								<span>Sản phẩm hết hạn bảo hành.</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Warranty;
