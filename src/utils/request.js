import axios from "axios";

export const userRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/users",
	timeout: 5000,
});

export const productRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/products",
	timeout: 30000,
});

export const categroyRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/categories",
	timeout: 5000,
});

export const cartRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/cart",
	timeout: 5000,
});

export const promotionRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/promotion",
	timeout: 5000,
});

export const orderRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/order",
	timeout: 5000,
});

export const statisticalRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/statistical",
	timeout: 5000,
});

export const paymentRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/payment",
	timeout: 5000,
});

export const brandRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/brands",
	timeout: 5000,
});

export const ratingRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/ratings",
	timeout: 5000,
});

export const voucherRequest = axios.create({
	baseURL: "http://localhost:8090/api/v1/vouchers",
	timeout: 5000,
});