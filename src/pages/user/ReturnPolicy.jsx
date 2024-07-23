import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
	return (
		<div className="return-policy pb-5" style={{ background: "#f5f5f5" }}>
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
								Chính Sách Đổi Trả
							</li>
						</ol>
					</nav>
				</div>
				<div
					className="wrapper-pageDetail"
					style={{ background: "#fff", padding: "10px 15px" }}
				>
					<div className="heading-pageDetail">
						<h4 className="fw-bold pb-3">Chính Sách Đổi Trả</h4>{" "}
						<div className="content-pageDetail typeList-style">
							<p>
								<span>
									ShoesShop chỉ tiến hành đổi trả đối với sản phẩm bị lỗi, trục
									trặc của nhà sản xuất.
								</span>
							</p>
							<p>
								<br />
							</p>
							<p>
								<span>
									<b>+ Điều kiện đổi trả:</b>
								</span>
							</p>
							<p>
								<span>- Sản phẩm bị trục trặc, lỗi do nhà sản xuất.</span>
							</p>
							<p>
								<span>
									- Sản phẩm còn nguyên vẹn, không bị nứt vỡ, không bị biến dạng
									do tác động của ngoại lực.
								</span>
							</p>
							<p>
								<span>
									- Sản phẩm không có dấu hiệu bị ẩm, vô nước dẫn đến gây chạm
									mạch.
								</span>
							</p>
							<p>
								<span>
									- Sản phẩm phải còn nguyên vẹn thông tin S/N và tem của nhà
									phân phối còn nguyên vẹn với đầy đủ thông tin thời gian bảo
									hành.
								</span>
							</p>
							<p>
								<span>- Sản phẩm phải còn trong thời gian bảo hành.</span>
							</p>
							<p>
								<span>
									<b>
										- Vì sản phẩm được đổi mới nguyên hộp nên sản phẩm đổi trả
										cũng phải được gởi lại với tình trạng nguyên hộp với đầy đủ
										phụ kiện, sản phẩm ban đầu. Nếu chỉ mang đến sản phẩm bị
										lỗi, không có phụ kiện & hộp thì chỉ được đổi mới 1 sản phẩm
										tương đương sản phẩm bị lỗi (ko gồm hộp, phụ kiện đi kèm)
										sau khi kiểm tra đúng lỗi được bảo hành.
									</b>
								</span>
							</p>
							<p>
								<br />
							</p>
							<p>
								<span>
									<b>+ Thời hạn đổi trả:</b>
								</span>
							</p>
							<p>
								<span>
									Sản phẩm còn trong thời gian bảo hành của nhà sản xuất.
								</span>
							</p>
							<p>
								<br />
							</p>
							<p>
								<span>
									+ <b>Phương thức đổi trả</b>: Sẽ đổi hàng ngay lập tức ngay
									khi đại lý hoặc người tiêu dùng gởi hàng và kỹ thuật{" "}
									<b>kiểm tra đúng là lỗi nhà sản xuất</b>. Nếu trường hợp mặt
									hàng này trong kho không có sẵn thì thời gian chờ hàng về để
									đổi là tối đa 2-3 tuần (sẽ cố gắng giảm thiểu thời gian bảo
									hành trong trường hợp không còn hàng có sẵn để đổi nhưng ngay
									cả Apple US cũng áp dụng chính sách này khi họ không còn hàng
									có sẵn).
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReturnPolicy;
