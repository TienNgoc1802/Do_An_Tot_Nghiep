import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/swiper-bundle.css";
import "swiper/css";

SwiperCore.use([Navigation, Thumbs]);

const ProductImagesSlider = ({ productImages }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<div style={{ width: "474.83px", padding: "12px", background: "#fff" }}>
			<Swiper
				loop={true}
				slidesPerView={1}
				navigation={true}
				modules={[Navigation, Thumbs]}
				grabCursor={true}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				className="product-images-slider"
			>
				{productImages.map((item, index) => (
					<SwiperSlide key={index}>
						<img
							src={item.url_Image}
							alt="Test Image"
							className="image-slide"
							style={{
								width:"100%",
								height: "451px",
							}}
						></img>
					</SwiperSlide>
				))}

				{/* <SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906411/ud2bkontyyzgrvfgs3ax.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906412/lrmufybhauydqk9ro1gn.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906415/m1efsu51h4q0tmk10r93.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906411/ud2bkontyyzgrvfgs3ax.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide> */}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				watchSlidesProgress={true}
				loop={true}
				spaceBetween={10}
				slidesPerView={5}
				modules={[Navigation, Thumbs]}
				className="product-images-slider-thumbs"
			>
				{productImages.map((item, index) => (
					<SwiperSlide key={index}>
						<img
							src={item.url_Image}
							alt="Test Image"
							className="image-slide"
						></img>
					</SwiperSlide>
				))}
				{/* <SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906409/onsusk9oecvvauzd73qw.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906411/ud2bkontyyzgrvfgs3ax.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906412/lrmufybhauydqk9ro1gn.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906414/vuj6gfdgrcuo5hqjpbjx.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://res.cloudinary.com/dedqzbz5c/image/upload/v1719906411/ud2bkontyyzgrvfgs3ax.jpg"
						alt="Test Image"
						className="image-slide"
					></img>
				</SwiperSlide> */}
			</Swiper>
		</div>
	);
};

export default ProductImagesSlider;
