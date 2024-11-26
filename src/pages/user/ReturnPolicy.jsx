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
						<h4 className="fw-bold pb-4">Chính Sách Đổi Trả</h4>{" "}
						<div className="content-pageDetail typeList-style">
							<div className="more-description">
								<p>
									<strong>
										ShoesShop.vn luôn trân trọng sự tín nhiệm của quý khách
										giành cho chúng tôi. Chính vì vậy, chúng tôi luôn cố gắng để
										mang đến quý khách hàng những sản phẩm chất lượng cao và
										tiết kiệm chi phí.
									</strong>
								</p>
								<p>
									Thay cho cam kết về chất lượng sản phẩm, ShoesShop.vn thực
									hiện chính sách đổi trả hàng hóa. Theo đó, tất cả các sản phẩm
									được mua tại ShoesShop.vn đều có thể đổi size và mẫu trong
									vòng 07 ngày sau khi nhận hàng.
								</p>
								<p>
									Để được thực hiện đổi hàng hoá, Quý khách cần giữ lại Hóa đơn
									mua hàng tại ShoesShop.vn. Sản phẩm được đổi là những sản phẩm
									đáp ứng được những điều kiện trong Chính sách đổi trả hàng
									hóa.
								</p>
								<p>&nbsp;</p>
								<p>
									<strong>
										ShoesShop.vn thực hiện đổi hàng/trả lại tiền cho Quý khách,
										nhưng không hoàn lại phí vận chuyển hoặc lệ phí giao hàng,
										trừ những trường hợp sau:
									</strong>
								</p>
								<ul className="ps-4">
									<li>Không đúng chủng loại, mẫu mã như quý khách đặt hàng.</li>
									<li>
										Tình trạng bên ngoài bị ảnh hưởng như bong tróc, bể vỡ xảy
										ra trong quá trình vận chuyển,…
									</li>
									<li>
										Không đạt chất lượng như: phát hiện hàng fake, hàng kém chất
										lượng, không phải hàng chính hãng.
									</li>
								</ul>
								<p>
									Quý khách vui lòng kiểm tra hàng hóa và ký nhận tình trạng với
									nhân viên giao hàng ngay khi nhận được hàng. Khi phát hiện một
									trong các trường hợp trên, quý khách có thể trao đổi trực tiếp
									với nhân viên giao hàng hoặc phản hồi cho chúng tôi trong vòng
									24h theo số Hotline: 084. 850. 6666
								</p>
								<p>&nbsp;</p>
								<p>
									<strong>
										ShoesShop.vn sẽ không chấp nhận đổi/trả hàng khi:
									</strong>
								</p>
								<ul className="ps-4">
									<li>Hàng hoá là hàng order.</li>
									<li>
										Thời điểm thông báo đổi trả quá 07 ngày kể từ khi Quý khách
										nhận hàng.
									</li>
									<li>
										Quý khách tự làm ảnh hưởng tình trạng bên ngoài như rách bao
										bì, bong tróc, bể vỡ, bị bẩn, hư hại (không còn như nguyên
										vẹn ban đầu),...
									</li>
									<li>
										Quý khách vận hành không đúng chỉ dẫn gây hỏng hóc hàng hóa.
									</li>
									<li>
										Quý khách đã kiểm tra và ký nhận tình trạng hàng hóa nhưng
										không có phản hồi trong vòng 24h kể từ lúc ký nhận hàng.
									</li>
									<li>Không còn size/mẫu mà khách hàng muốn đổi.</li>
									<li>Không đổi từ hàng hóa có sẵn sang hàng phải order.</li>
									<li>Sản phẩm đã cắt tag/mác.</li>
									<li>Sản phẩm đã qua sử dụng.</li>
								</ul>
								<p>&nbsp;</p>
								<p>
									<strong>
										ShoesShop thực hiện đổi trả theo quy trình sau:
									</strong>
								</p>
								<ul className="ps-4">
									<li>
										<strong>Bước 1:</strong> Quý khách liên hệ trực tiếp với
										ShoesShop qua số Hotline: 084. 850. 6666 để thông báo tình
										trạng hàng hoá cần đổi/trả trong vòng 07 ngày kể từ khi nhận
										hàng.
									</li>
									<li>
										<strong>Bước 2:</strong> Nhân viên ShoesShop sẽ tiếp nhận
										phản hồi và hướng dẫn bạn cung cấp thông tin đơn hàng để
										chúng tôi truy soát.
									</li>
									<li>
										<strong>Bước 3:</strong> Quý khách ship hàng cần đổi/trả kèm
										hoá đơn lại về địa chỉ của ShoesShop để chúng tôi kiểm tra.
									</li>
									<li>
										<strong>Bước 4:</strong> Sau khi kiểm tra hàng và xác nhận
										đủ sản phẩm đủ điều kiện đổi/trả, ShoesShop sẽ liên hệ lại
										xác nhận với bạn và gửi hàng về cho bạn theo địa chỉ bạn
										cung cấp.
									</li>
								</ul>
								<p>&nbsp;</p>
								<p>
									<em>
										Lưu ý: Quý khách sẽ phải chịu phí ship 2 chiều khi đổi/trả.
										Chỉ hỗ trợ đổi sản phẩm một lần duy nhất.
									</em>
								</p>
								<p>&nbsp;</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReturnPolicy;
