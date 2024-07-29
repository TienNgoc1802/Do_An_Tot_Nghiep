import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import ProductSlider from "../../components/ProductSlider";
import * as productService from "../../services/ProductService";
import { Link } from "react-router-dom";
import car from "../../assets/image/fast-delivery.png";
import wallet from "../../assets/image/wallet.png";
import hours from "../../assets/image/support.png";

const Home = () => {
	const [newArrivals, setNewArrivals] = useState(null);
	const [bestSellers, setBestSellers] = useState(null);
	const [productIsOnSale, setProductIsOnSale] = useState(null);

	const fetchNewArriavls = async () => {
		try {
			const data = await productService.newArrivals();
			setNewArrivals(data);
		} catch (error) {
			console.log("fetch new arrivals fail!", error);
		}
	};

	const fetchBestSellers = async () => {
		try {
			const data = await productService.bestSellers();
			setBestSellers(data);
		} catch (error) {
			console.log("fetch best seller fail!", error);
		}
	};

	const fetchProductIsOnSale = async () => {
		try {
			const data = await productService.productIsOnSale();
			setProductIsOnSale(data);
		} catch (error) {
			console.log("fetch product is on sale fail!", error);
		}
	};

	useEffect(() => {
		fetchNewArriavls();
		fetchBestSellers();
		fetchProductIsOnSale();
	}, []);

	if (!newArrivals || !bestSellers || !productIsOnSale) {
		return <div className="fs-1 text-danger">Loading...</div>;
	}

	return (
		<div style={{ background: "#f5f5f5" }} className="pb-5">
			<div className="slide-bar">
				<div className="container-fluid">
					<Carousel />
				</div>
			</div>
			<div className="features">
				<div className="container pt-5">
					<div className="row">
						<div className="col-lg-4">
							<div
								className="d-flex flex-column align-items-center justify-content-center rounded-2 py-3"
								style={{ backgroundColor: "#e2e2e2" }}
							>
								<img src={wallet} alt="Wallet Icon" />
								<h4
									style={{
										color: "#f9bb01",
										fontWeight: "bold",
										padding: "10px 0",
									}}
								>
									CAM KẾT CHÍNH HÃNG
								</h4>
								<p className="fw-bold">100% Authentic</p>
								<p style={{ fontSize: "14px" }}>
									Cam kết sản phẩm chính hãng từ Châu Âu, Châu Mỹ...
								</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div
								className="d-flex flex-column align-items-center justify-content-center rounded-2 py-3"
								style={{ backgroundColor: "#e2e2e2" }}
							>
								<img src={car} alt="Car Icon" />
								<h4
									style={{
										color: "#f9bb01",
										fontWeight: "bold",
										padding: "10px 0",
									}}
								>
									GIAO HÀNG HỎA TỐC
								</h4>
								<p className="fw-bold">Express delivery</p>
								<p style={{ fontSize: "14px" }}>
									Ship hỏa tốc 1h nhận hàng trong nội thành TP.HCM
								</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div
								className="d-flex flex-column align-items-center justify-content-center rounded-2 py-3"
								style={{ backgroundColor: "#e2e2e2" }}
							>
								<img src={hours} alt="24 hours Icon" />
								<h4
									style={{
										color: "#f9bb01",
										fontWeight: "bold",
										padding: "10px 0",
									}}
								>
									HỖ TRỢ 24/7
								</h4>
								<p className="fw-bold">Supporting 24/7</p>
								<p style={{ fontSize: "14px" }}>Gọi ngay 0833449178</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="new-arrival">
				<div className="container-fluid pt-5">
					<div className="mb-3">
						<h3 className="fw-bold">SẢN PHẨM MỚI NHẤT</h3>
					</div>
					<div className="list-new-arrival">
						<ProductSlider products={newArrivals} type="new" />
					</div>
				</div>
			</div>
			<div className="best-seller">
				<div className="container-fluid pt-5">
					<div className="mb-3">
						<h3 className="fw-bold">TOP SẢN PHẨM BÁN CHẠY</h3>
					</div>
					<div className="list-best-seller">
						<ProductSlider products={bestSellers} />
					</div>
				</div>
			</div>
			<div className="product-sale">
				<div className="container-fluid pt-5">
					<div
						className="rounded-3"
						style={{ padding: "20px 15px", background: "#d0021b" }}
					>
						<div className="sale-title d-flex justify-content-lg-start align-items-center">
							<div className="animation">
								<i class="bi bi-circle-fill"></i>
							</div>
							<h3 className="fw-bold text-light ms-2">
								⚡️ KHUYẾN MẠI SHOCK NHẤT 🔥
							</h3>
						</div>
						<div className="list-best-seller pt-3">
							<ProductSlider products={productIsOnSale} />
						</div>
						{/* <div className="d-flex">
							<div className="box-link">
								<Link to="">
									<span>Xem tất cả ⚡️ KHUYẾN MẠI SHOCK NHẤT 🔥</span>
									<span style={{ marginLeft: "5px" }}>
										<i class="bi bi-caret-right-fill"></i>
									</span>
								</Link>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
