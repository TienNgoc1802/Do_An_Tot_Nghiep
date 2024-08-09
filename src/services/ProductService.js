import { productRequest } from "../utils/request";
import imageCompression from "browser-image-compression";

async function compressImage(imageFile) {
	const options = {
		maxSizeMB: 1, // Kích thước tối đa của file nén (MB)
		maxWidthOrHeight: 1024, // Kích thước tối đa của chiều rộng hoặc chiều cao
		useWebWorker: true, // Sử dụng web worker để tăng tốc quá trình nén
	};

	try {
		const compressedFile = await imageCompression(imageFile, options);
		return compressedFile;
	} catch (error) {
		console.error("Error during image compression", error);
	}
}

export const getAllProduct = async () => {
	const res = await productRequest.get();
	return res.data;
};

export const newArrivals = async () => {
	const res = await productRequest.get("/newarrivals");
	return res.data;
};

export const bestSellers = async () => {
	const res = await productRequest.get("/bestsellers");
	return res.data;
};

export const getProductById = async (id) => {
	const res = await productRequest.get(`/${id}`);
	return res.data;
};

export const getProductsWithPagination = async (page, pageSize) => {
	const res = await productRequest.get(`/pagination/${page}/${pageSize}`);
	return res.data;
};

export const productIsOnSale = async () => {
	const res = await productRequest.get("/isOnSale");
	return res.data;
};

export const search = async (content, page, pageSize) => {
	const res = await productRequest.get("/search", {
		params: {
			searchContent: content,
			page: page,
			pageSize: pageSize,
		},
	});
	return res.data;
};

export const filterProduct = async (
	categoryName,
	minPrice,
	maxPrice,
	sortOrder,
	page,
	size
) => {
	const res = await productRequest.get("/filter", {
		params: {
			categoryName,
			minPrice,
			maxPrice,
			sortOrder,
			page,
			size,
		},
	});
	return res.data;
};

export const productNotInPromotion = async () => {
	const res = await productRequest.get("/notinpromotion");
	return res.data;
};

export const productByPromotionID = async (id) => {
	const res = await productRequest.get(`/getbypromoid/${id}`);
	return res.data;
};

export const addProduct = async (
	name,
	description,
	price,
	categoryID,
	isActive,
	images,
	sizes
) => {
	const formData = new FormData();
	formData.append("product_name", name);
	formData.append("product_decription", description);
	formData.append("product_price", price);
	formData.append("product_category", categoryID);
	formData.append("product_is_active", isActive);

	// const imagePromises = images.map(async (image, index) => {
	// 	if (image) {
	// 		const response = await fetch(image);
	// 		const blob = await response.blob();
	// 		const compressedBlob = await compressImage(blob);
	// 		formData.append(`product_images`, compressedBlob, `${index}.jpg`);
	// 	}
	// });

	// await Promise.all(imagePromises);

	for (let index = 0; index < images.length; index++) {
		const image = images[index];
		if (image) {
			const response = await fetch(image);
			const blob = await response.blob();
			const compressedBlob = await compressImage(blob);
			formData.append(`product_images`, compressedBlob, `${index}.jpg`);
		}
	}

	formData.append("product_sizes", JSON.stringify(sizes));

	const res = await productRequest.post("/add", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
};

export const deleteProduct = async (id) => {
	const res = await productRequest.delete(`/delete/${id}`);
	return res.data;
};

export const editProduct = async (
	id,
	name,
	description,
	price,
	categoryID,
	isActive,
	images,
	sizes
) => {
	const formData = new FormData();
	formData.append("id", id);
	formData.append("product_name", name);
	formData.append("product_decription", description);
	formData.append('product_price', price || '0');
	formData.append("product_category", categoryID);
	formData.append('product_is_active', isActive || '0');

	// const imagePromises = images.map(async (image, index) => {
	// 	if (image) {
	// 		const response = await fetch(image);
	// 		const blob = await response.blob();
	// 		const compressedBlob = await compressImage(blob);
	// 		formData.append(`product_images`, compressedBlob, `${index}.jpg`);
	// 	}
	// });

	// await Promise.all(imagePromises);

	for (let index = 0; index < images.length; index++) {
		const image = images[index];
		if (image) {
			const response = await fetch(image);
			const blob = await response.blob();
			const compressedBlob = await compressImage(blob);
			formData.append(`product_images`, compressedBlob, `${index}.jpg`);
		}
	}

	formData.append("product_sizes", JSON.stringify(sizes));

	const res = await productRequest.post("/update", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return res.data;
};
