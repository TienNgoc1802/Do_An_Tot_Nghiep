import { statisticalRequest } from "../utils/request";

export const getRevenueLast7DaysWithAllDates = async () => {
	const res = await statisticalRequest.get("/revenue-last-7day");
	return res.data;
};

export const getMonthlyRevenueByYear = async (year) => {
	const res = await statisticalRequest.get("/monthly-revenue-by-year", {
		params: { year },
	});
	return res.data;
};

export const getOrderByMonthAndYear = async (month, year) => {
	const res = await statisticalRequest.get("/order-by-month-year", {
		params: { month, year },
	});
	return res.data;
};

export const getDailyRevenueByMonth = async (month, year) => {
	const res = await statisticalRequest.get("/daily-revenue-by-month", {
		params: { month, year },
	});
	return res.data;
};
