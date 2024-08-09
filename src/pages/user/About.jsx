import React, { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<div className="privacy-policy pb-5" style={{ background: "#f5f5f5" }}>
			<div className="container">
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
								Giới Thiệu
							</li>
						</ol>
					</nav>
				</div>
				<div>
					<h4
						style={{
							textAlign: "center",
							fontWeight: "bold",
							paddingBottom: "10px",
						}}
					>
						Giới Thiệu
					</h4>
					<p>
						Chào mừng bạn đến với cửa hàng giày của chúng tôi! Chúng tôi tự hào
						là một trong những nhà cung cấp giày chất lượng hàng đầu, mang đến
						cho khách hàng những đôi giày thời trang, bền đẹp, và thoải mái.
					</p>

					<img
						src="https://pendecor.vn/uploads/files/2021/07/29/thiet-ke-shop-giay-1.jpg"
						alt="Cửa hàng của chúng tôi"
						style={{ width: "100%", height: "600px", marginTop: "20px" }}
					/>

					<h4
						style={{
							textAlign: "center",
							fontWeight: "bold",
							paddingBottom: "10px",
							paddingTop: "20px",
						}}
					>
						Lịch Sử
					</h4>
					<p>
						Cửa hàng của chúng tôi được thành lập vào năm 2024 với mong muốn
						mang đến những sản phẩm giày chất lượng nhất cho khách hàng. Từ đó
						đến nay, chúng tôi đã phát triển không ngừng và trở thành một thương
						hiệu uy tín trong ngành giày dép.
					</p>

					<img
						src="your-image-url-here"
						alt="Lịch sử phát triển"
						style={{ width: "100%", height: "auto", marginTop: "20px" }}
					/>

					<h4
						style={{
							textAlign: "center",
							fontWeight: "bold",
							paddingBottom: "10px",
							paddingTop: "20px",
						}}
					>
						Sứ Mệnh
					</h4>
					<p>
						Sứ mệnh của chúng tôi là mang đến cho khách hàng những sản phẩm giày
						tốt nhất, với phong cách đa dạng, phù hợp với nhiều sở thích và nhu
						cầu khác nhau. Chúng tôi luôn nỗ lực không ngừng để nâng cao chất
						lượng sản phẩm và dịch vụ của mình.
					</p>

					<img
						src="your-image-url-here"
						alt="Sứ mệnh"
						style={{ width: "100%", height: "auto", marginTop: "20px" }}
					/>

					<h4
						style={{
							textAlign: "center",
							fontWeight: "bold",
							paddingBottom: "10px",
							paddingTop: "20px",
						}}
					>
						Giá Trị Cốt Lõi
					</h4>
					<div style={{ textAlign: "center" }}>
						<p>Chất lượng hàng đầu</p>
						<p>Uy tín và tin cậy</p>
						<p>Khách hàng là trung tâm</p>
						<p>Đổi mới và sáng tạo</p>
					</div>

					<img
						src="https://didongmoi.com.vn/upload/images/content/van-hoa-doanh-nghiep%20(1).jpg"
						alt="Giá trị cốt lõi"
						style={{
							width: "75%",
							height: "450px",
							marginTop: "20px",
							display: "block",
							margin: "20px auto",
						  }}
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
