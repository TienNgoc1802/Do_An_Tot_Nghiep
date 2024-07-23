import { productRequest } from "../utils/request";

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
