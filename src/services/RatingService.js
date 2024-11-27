import { Await } from "react-router-dom";
import { ratingRequest } from "../utils/request";

export const getAllRating = async () => {
	const res = await ratingRequest.get();
	return res.data;
};

export const addRating = async (
	user_id,
	product_id,
	ratingValue,
	review,
	ratingImg
) => {
	const params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("product_id", product_id);
	const formData = new FormData();
	formData.append("ratingValue", ratingValue);
	formData.append("review", review);

	if (ratingImg) {
		const response = await fetch(ratingImg);
		const blob = await response.blob();
		formData.append(`ratingImg`, blob, `${ratingImg}.jpg`);
	}

	const res = await ratingRequest.post("/add", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
};

export const getRatingsByProductId = async (id) => {
	const res = await ratingRequest.get(`/product/${id}`);
	return res.data;
};

// export const editRating = async (
// 	id,
// 	user_id,
// 	product_id,
// 	ratingValue,
// 	review,
// 	ratingImg
// ) => {
// 	const params = new URLSearchParams();
// 	params.append("user_id", user_id);
// 	params.append("product_id", product_id);
// 	const formData = new FormData();
// 	formData.append("ratingValue", ratingValue);
// 	formData.append("review", review);
// 	for (let index = 0; index < ratingImg.length; index++) {
// 		const image = ratingImg[index];
// 		if (image) {
// 			const response = await fetch(image);
// 			const blob = await response.blob();
// 			const compressedBlob = await compressImage(blob);
// 			formData.append(`ratingImg`, compressedBlob, `${index}.jpg`);
// 		}
// 	}

// 	const res = await ratingRequest.put(`/edit/${id}`, formData, {
// 		headers: {
// 			"Content-Type": "multipart/form-data",
// 		},
// 	});

// 	return res.data;
// };

// export const deleteRating = async (id) => {
// 	const res = await ratingRequest.delete(`/delete/${id}`);
// 	return res.data;
// };
