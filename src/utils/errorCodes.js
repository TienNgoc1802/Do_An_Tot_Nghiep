const ERROR_CODES = {
	// Thêm mới khuyến mãi (AddPromotion.jsx)

	DATE_INVALID: {
		code: "DATE_INVALID",
		message: "Ngày kết thúc không được nhỏ hơn ngày bắt đầu.",
	},
	DISCOUNT_INVALID: {
		code: "DISCOUNT_INVALID",
		message: "Phần trăm giảm giá phải trong khoảng từ 0 đến 100.",
	},
	NO_SELECTED_PRODUCTS: {
		code: "NO_SELECTED_PRODUCTS",
		message: "Bạn cần chọn ít nhất một sản phẩm cho khuyến mãi.",
	},
	ADD_PROMOTION_SUCCESS: {
		code: "ADD_PROMOTION_SUCCESS",
		message: "Thêm mới khuyến mãi thành công.",
	},
	ADD_PROMOTION_FAIL: {
		code: "ADD_PROMOTION_FAIL",
		message: "Thêm mới khuyến mãi thất bại.",
	},

	// Thêm mới sản phẩm

	PRICE_INVALID: {
		code: "PRICE_INVALID",
		message: "Giá sản phẩm phải lớn hớn 0",
	},
	IMAGES_EMPTY: {
		code: "IMAGES_EMPTY",
		message: "Vui lòng thêm ít nhất một ảnh cho sản phẩm",
	},
    SIZES_EMPTY: {
		code: "SIZE_EMPTY",
		message: "Vui lòng thêm ít nhất một kích thuớc & số lượng cho sản phẩm",
	},
	INVALID_SIZE_QUANTITY_INPUT: {
		code: "INVALID_INPUT",
		message: "Vui lòng nhập đầy đủ kích thước và số lượng.",
	},
	QUANTITY_INVALID: {
		code: "QUANTITY_INVALID",
		message: "Số lượng phải là một số lớn hơn 0.",
	},
	ADD_PRODUCT_SUCCESS: {
		code: "ADD_PRODUCT_SUCCESS",
		message: "Thêm mới sản phẩm thành công.",
	},
	ADD_PRODUCT_FAIL: {
		code: "ADD_PRODUCT_FAIL",
		message: "Thêm mới sản phẩm thất bại.",
	},

	FIELD_REQUIRED: {
		code: "FIELD_REQUIRED",
		message: "Trường này là bắt buộc.",
	},
	SERVER_ERROR: {
		code: "SERVER_ERROR",
		message: "Đã xảy ra lỗi từ phía máy chủ. Vui lòng thử lại sau.",
	},
};

export default ERROR_CODES;
