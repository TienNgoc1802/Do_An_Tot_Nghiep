import React from "react";
import { Link } from "react-router-dom";

const ShippingAndInspectionPolicy = () => {
	return (
		<div
			className="shipping-inspention-policy pb-5"
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
								Chính Sách Vận Chuyển và Kiểm Hàng
							</li>
						</ol>
					</nav>
				</div>
				<div
					className="wrapper-pageDetail"
					style={{ background: "#fff", padding: "10px 15px" }}
				>
					<div className="heading-pageDetail">
						<h4 className="fw-bold pb-3">Chính sách vận chuyển và kiểm hàng</h4>
					</div>
					<div className="content-pageDetail typeList-style">
						<p>
							<span style={{ fontSize: "16px" }}>
								<strong>
									Chính sách vận chuyển và giao nhận tại TTGShop.vn là một phần
									của quy chế hoạt động thương mại điện tử của Công ty CP Mocato
									Việt Nam, tuân thủ Nghị định 52/2013/NĐ-CP của chính phủ nước
									Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam và các quy định của pháp
									luật có liên quan.
								</strong>
							</span>
						</p>
						<h2 style={{ textAlign: "center" }}>
							<span style={{ fontSize: "24px" }}>
								<strong>Chính sách vận chuyển</strong>
							</span>
						</h2>
						<h3>
							<span style={{ fontSize: "16px" }}>
								1. Quy trình giao vận, chuyển hàng
							</span>
						</h3>
						<p>
							<span style={{ fontSize: "16px" }}>
								Tất cả các đơn hàng được đặt hàng trên website TTGShop.vn sẽ
								được xử lý trong vòng 24 giờ khi bạn đăng ký. Bạn sẽ nhận được
								cuộc gọi của Tổng đài viên để xác nhận đơn hàng và được tư vấn
								thêm về sản phẩm.
							</span>
						</p>
						<p>
							<span style={{ fontSize: "16px" }}>
								Sau khi nhận đơn hàng từ người mua và đã xác thực thông tin mua
								hàng qua điện thoại, chúng tôi sẽ tiến hành giao hàng theo yêu
								cầu của quý khách hàng. Chúng tôi thực hiện giao hàng đến tận
								tay khách hàng qua công ty vận chuyển.
							</span>
						</p>
						<h3>
							<span style={{ fontSize: "16px" }}>2. Phạm vi áp dụng</span>
						</h3>
						<p>
							<span style={{ fontSize: "16px" }}>
								Chúng tôi thực hiện giao hàng trên 63 tỉnh thành trong cả nước.
								Bất kỳ lúc nào khách hàng cũng có thể tra cứu, kiểm tra lộ trình
								hay tình trạng của những đơn hàng đã đặt mua qua các công cụ của
								đối tác vận chuyển
							</span>
						</p>
						<h2 style={{ textAlign: "center" }}>
							<span style={{ fontSize: "24px" }}>
								<strong>Quy định kiểm hàng</strong>
							</span>
						</h2>
						<h3>
							<span style={{ fontSize: "16px" }}>
								1. Giao nhận và kiểm hàng
							</span>
						</h3>
						<p>
							<span style={{ fontSize: "16px" }}>
								Khách hàng sẽ nhận được hàng chậm nhất là bảy (07) ngày sau khi
								hoàn tất đơn hàng của mình. Thời gian luân chuyển và giao hàng
								nhanh hay chậm tùy theo đơn vị chuyển phát tại địa chỉ mà khách
								hàng đã cung cấp khi đặt hàng.
							</span>
						</p>
						<p>
							<span style={{ fontSize: "16px" }}>
								Khách hàng sẽ nhận và kiểm tra hàng hóa trước khi thanh toán.
								Các khiếu nại về sản phẩm, chứng từ sẽ được giải quyết theo
								<Link to="https://espharma.vn/co-che-tiep-nhan-giai-quyet-khieu-nai/">
									{" "}
								</Link>
								<strong>
									<Link to="qui-dinh-bao-hanh">qui định bảo hành</Link>
								</strong>{" "}
								và
								<strong>
									<Link to="chinh-sach-doi-tra">
										{" "}
										chính sách đổi trả, hoàn tiền
									</Link>
								</strong>
								.
							</span>
						</p>
						<h3>
							<span style={{ fontSize: "16px" }}>
								2. Trách nhiệm với hàng hóa vận chuyển
							</span>
						</h3>
						<p>
							<span style={{ fontSize: "16px" }}>
								Việc cung cấp chứng từ hàng hóa sẽ do công ty chúng tôi cung
								cấp. Công ty sẽ chịu trách nhiệm với hàng hóa và các rủi ro như
								mất mát hoặc hư hại của hàng hóa trong suốt quá trình vận chuyển
								hàng từ kho hàng chúng tôi đến quý khách.
							</span>
						</p>
						<p>
							<span style={{ fontSize: "16px" }}>
								Quý khách có trách nhiệm kiểm tra hàng hóa khi nhận hàng, đề
								nghị Quý khách quay video khi mở hàng. Khi phát hiện hàng hóa bị
								hư hại, trầy xước, bể vỡ, móp méo, hoặc sai hàng hóa thì ký xác
								nhận tình trạng hàng hóa với Nhân viên giao nhận và thông báo
								ngay cho chúng tôi qua số điện thoại 0968 239 497. Chúng tôi chỉ
								xử lý những đơn hàng hư hại có video quay lại quá trình mở hàng.
							</span>
						</p>
						<p>
							<span style={{ fontSize: "16px" }}>
								Trong vòng 24 giờ sau khi quý khách ký nhận hàng mà không có ý
								kiến về hàng hóa, công ty sẽ không chịu trách nhiệm với những
								yêu cầu đổi trả do hư hỏng, trầy xước, bể vỡ, móp méo, sai hàng
								hóa,… từ Quý khách sau này (Trừ trường hợp lỗi do nhà sản xuất).
							</span>
						</p>
						<p>
							<span style={{ fontSize: "16px" }}>
								Nếu dịch vụ vận chuyển do quý khách chỉ định và lựa chọn thì quý
								khách sẽ chịu trách nhiệm với hàng hóa và các rủi ro như mất mát
								hoặc hư hại của hàng hóa trong suốt quá trình vận chuyển hàng từ
								kho hàng của công ty đến quý khách. Khách hàng sẽ chịu trách
								nhiệm cước phí và tổn thất liên quan.
							</span>
						</p>
						<h3>
							<span style={{ fontSize: "16px" }}>3. Phí giao hàng</span>
						</h3>
						<p>
							<span style={{ fontSize: "16px" }}>
								Chúng tôi giao hàng miễn phí đối với những đơn hàng có giá trị
								từ 1.000.000 đồng trở lên.
							</span>
						</p>
						<p>
							<span style={{ fontSize: "16px" }}>
								Với những đơn hàng dưới 1.000.000 đồng, khách hàng sẽ thanh toán
								phí vận chuyển. Phí vận chuyển giao động từ 18.000 đồng đến
								90.000 đồng, tùy thuộc vào địa phương nhận hàng.
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShippingAndInspectionPolicy;
