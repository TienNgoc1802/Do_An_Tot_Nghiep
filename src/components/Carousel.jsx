import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Carousel = () => {
	return (
		<div
			id="carouselExampleAutoplaying"
			className="carousel slide"
			data-bs-ride="carousel"
		>
			<div className="carousel-indicators">
				<button
					type="button"
					data-bs-target="#carouselExampleAutoplaying"
					data-bs-slide-to="0"
					className="active"
					aria-current="true"
					aria-label="Slide 1"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleAutoplaying"
					data-bs-slide-to="1"
					aria-label="Slide 2"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleAutoplaying"
					data-bs-slide-to="2"
					aria-label="Slide 3"
				></button>
			</div>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img
						src="https://img.pikbest.com/origin/06/39/82/47ppIkbEsT7dJ.jpg!sw800"
						className="d-block rounded-3"
						alt="First slide"
						style={{ width: "100%", height: "640px" }}
					/>
				</div>
				<div className="carousel-item">
					<img
						src="https://intphcm.com/data/upload/poster-giay-just-do-it.jpg"
						className="d-block rounded-3"
						alt="Second slide"
						style={{ width: "100%", height: "640px" }}
					/>
				</div>
				<div className="carousel-item">
					<img
						src="https://intphcm.com/data/upload/poster-giay-ad.jpg"
						className="d-block rounded-3"
						alt="Third slide"
						style={{ width: "100%", height: "640px" }}
					/>
				</div>
			</div>
			<button
				className="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleAutoplaying"
				data-bs-slide="prev"
			>
				<span
					className="carousel-control-prev-icon "
					style={{
						width: "45px",
						height: "45px",
					}}
					aria-hidden="true"
				></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleAutoplaying"
				data-bs-slide="next"
			>
				<span
					className="carousel-control-next-icon"
					style={{
						width: "45px",
						height: "45px",
					}}
					aria-hidden="true"
				></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};

export default Carousel;
