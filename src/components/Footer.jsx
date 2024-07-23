import React from "react";
import send from "../assets/image/send.png";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-top py-4" style={{ background: "#009dde" }}>
				<div className="container-fluid d-flex justify-content-center align-items-center">
					<div className="newsletter-title me-4">
						<div className="d-flex justify-content-end">
							<img
								src={send}
								alt="Send Icon"
								style={{ marginRight: "20px", width: "30px" }}
							/>
							<h4 className="text-light fw-bold">Đăng ký nhận bản tin</h4>
						</div>
						<p className="text-light mt-2">
							Đế nhận các thông tin mới từ Shoes Shop cũng như các chương trình
							khuyến mãi
						</p>
					</div>
					<div className="newsletter-form">
						<i className="bi bi-envelope"></i>
						<input
							required
							type="email"
							className="form-control"
							placeholder="Vui lòng nhập email của bạn..."
						></input>
						<button className="btn">ĐĂNG KÝ</button>
					</div>
				</div>
			</div>
			<div className="footer-center">
				<div className="container-fluid py-4">
					<div className="row">
						<div className="col-lg-3 widget-footer">
							<h5 className="title-footer">Về Shoes Shop</h5>
							<p style={{ padding: "10px 0" }}>
								Trang thương mại chính thức của Tiến Ngọc - TienNgoc.1.8.002.
								Luôn tìm kiếm những sản phẩm chất lượng vì khách hàng.
							</p>
							<div
								className="d-flex justify-content-start align-items-center"
								style={{ padding: "10px 0" }}
							>
								<Link to="https://www.facebook.com/ngoc.t.nguyen.1042/">
									<i className="bi bi-facebook link"></i>
								</Link>
								<Link to="https://www.facebook.com/ngoc.t.nguyen.1042/">
									<i className="bi bi-twitter link"></i>
								</Link>
								<Link to="https://www.facebook.com/ngoc.t.nguyen.1042/">
									<i className="bi bi-instagram link"></i>
								</Link>
								<Link to="https://www.facebook.com/ngoc.t.nguyen.1042/">
									<i className="bi bi-google link"></i>
								</Link>
								<Link to="https://www.facebook.com/ngoc.t.nguyen.1042/">
									<i className="bi bi-youtube link"></i>
								</Link>
							</div>
						</div>
						<div className="col-lg-3 widget-footer">
							<h5 className="title-footer">Thông tin liên hệ</h5>
							<div className="address-footer" style={{ padding: "10px 0" }}>
								<div>
									<i className="bi bi-geo-alt-fill me-3"></i>
									<span>CS1: 97 Man Thiện - Hiệp Phú - Q9 - TP.HCM</span>
									<br></br>
									<span>CS2: 319 Lý Thường Kiệt - P15 - Q10 - TP.HCM</span>
								</div>
							</div>
							<div className="phone-footer">
								<i className="bi bi-telephone-fill me-3"></i>
								<span>0833 449 178 - 0123 456 789</span>
							</div>
							<div className="gmail-footer" style={{ paddingTop: "10px" }}>
								<i className="bi bi-envelope-fill me-3"></i>
								<span>nguyentienngoc18002@gmail.com</span>
							</div>
						</div>
						<div className="col-lg-3 widget-footer">
							<h5 className="title-footer">Tài khoản ngân hàng</h5>
							<div style={{ padding: "10px 0 10px 20px" }}>
								<ul className="footer-nav-link">
									<li className="item">
										<Link to="" className="link-li">
											Tài Khoản Ngân Hàng
										</Link>
									</li>
									<li className="item">
										<Link to="/search" className="link-li">
											Tìm Kiếm
										</Link>
									</li>
									<li className="item">
										<Link to="" className="link-li">
											Phương Thức Thanh Toán
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 widget-footer">
							<h5 className="title-footer">Chính sách</h5>
							<div style={{ padding: "10px 0 10px 19px" }}>
								<ul className="footer-nav-link">
									<li className="item">
										<Link to="/chinh-sach-bao-mat" className="link-li">
											Chính Sách Bảo Mật
										</Link>
									</li>
									<li className="item">
										<Link to="/qui-dinh-bao-hanh" className="link-li">
											Quy Định Bảo Hành
										</Link>
									</li>
									<li className="item">
										<Link to="/chinh-sach-doi-tra" className="link-li">
											Chính sách Đổi Trả
										</Link>
									</li>
									<li className="item">
										<Link to="/chinh-sach-van-chuyen-va-kiem-hang" className="link-li">
											Chính sách vận chuyển & kiểm hàng
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
            <hr></hr>
			<div className="footer-copyright">
				<div className="container d-flex justify-content-center py-2">
					<p>
						Copyright © 2024 Bản quyền của cá nhân - Nguyễn Tiến Ngọc - Địa chỉ:
						319 Lý Thường Kiệt - P15 - Q10 - TP.HCM - Thực hiện vào tháng 7/2024
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
