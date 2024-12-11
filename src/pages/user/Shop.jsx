import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as categoryServie from "../../services/CategoryService";
import * as brandService from "../../services/BrandService";
import * as productService from "../../services/ProductService";
import ModalAddToCart from "../../components/ModalAddToCart";

const Shop = () => {
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);
  const [size, setSize] = useState(null);
  const [productPagination, setProductPagination] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isTypeOpen, setIsTypeOpen] = useState(true);

  const listSize = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  const priceRanges = {
    "under-500000": { min: 0, max: 500000 },
    "500000-1000000": { min: 500000, max: 1000000 },
    "1000000-2000000": { min: 1000000, max: 2000000 },
    "2000000-3000000": { min: 2000000, max: 3000000 },
    "above-3000000": { min: 3000000, max: 10000000 },
  };

  const { min, max } = priceRanges[selectedPriceRange] || {
    min: null,
    max: null,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryServie.getAllCategory();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await brandService.getAllBrands();
        setBrands(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrands();
  }, []);

  // useEffect(() => {
  // 	// Khi `selectedSortOption` thay đổi, đặt lại số trang về 0 nếu lớn hơn 0
  // 	if (page > 0) {
  // 		setPage(0);
  // 	}
  // }, [selectedSortOption, selectedPriceRange, selectedCategory]);

  useEffect(() => {
    const fetchProductPagination = async () => {
      setLoading(true);
      try {
        console.log(selectedSize);
        const data = await productService.filterProduct(
          selectedCategory,
          selectedBrand,
          selectedSize,
          min,
          max,
          selectedSortOption,
          page,
          12
        );
        console.log(data);
        setProductPagination(data);
        // setProducts((prev) =>
        // 	page === 0 ? data.content : [...prev, ...data.content]
        // );
        setProducts(data.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductPagination();
  }, [
    page,
    selectedCategory,
    selectedBrand,
    selectedSize,
    selectedSortOption,
    selectedPriceRange,
  ]);

  if (!categories || !productPagination) {
    return <div className="fs-1 text-danger">Loading...</div>;
  }

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <ModalAddToCart
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="shop-detail pb-5" style={{ background: "#f5f5f5" }}>
        <div className="container-fluid">
          <div className="breadcrumb-shop" style={{ padding: "9px 0" }}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link
                    to="/home"
                    style={{ color: "darkgray", fontWeight: "400" }}
                  >
                    Trang Chủ
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active"
                  style={{ color: "darkgray", fontWeight: "400" }}
                  aria-current="page"
                >
                  Tất cả sản phẩm
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-lg-3 col-3 shop-layout-filter">
              <div className="shop-filter-content">
                <div
                  className="filter-type"
                  style={{
                    background: "#fff",
                    marginRight: "12px",
                    marginBottom: "12px",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="filter-title">Danh mục sản phẩm</div>
                    {isBrandOpen ? (
                      <i
                        className="bi bi-dash fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsTypeOpen((prev) => !prev)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-plus fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsTypeOpen((prev) => !prev)}
                      ></i>
                    )}
                  </div>
                  {isTypeOpen && (
                    <div>
                      <hr />
                      <div style={{ padding: "10px" }}>
                        <ul className="checkbox-list">
                          {categories.map((category, index) => (
                            <li key={index}>
                              <input
                                type="checkbox"
                                className="checkbox-item"
                                name="category"
                                value={category.category_Name}
                                checked={
                                  selectedCategory === category.category_Name
                                }
                                onChange={(e) =>
                                  setSelectedCategory(e.target.value)
                                }
                              ></input>
                              <label htmlFor="">{category.category_Name}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="filter-bard"
                  style={{
                    background: "#fff",
                    marginRight: "12px",
                    marginBottom: "12px",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="filter-title">Thương hiệu</div>
                    {isBrandOpen ? (
                      <i
                        className="bi bi-dash fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsBrandOpen((prev) => !prev)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-plus fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsBrandOpen((prev) => !prev)}
                      ></i>
                    )}
                  </div>
                  {isBrandOpen && (
                    <div>
                      <hr />
                      <div style={{ padding: "10px" }}>
                        <ul className="checkbox-list">
                          {brands.map((brand, index) => (
                            <li key={index}>
                              <input
                                type="checkbox"
                                className="checkbox-item"
                                name="brand"
                                value={brand.brand_name}
                                checked={selectedBrand === brand.brand_name}
                                onChange={(e) =>
                                  setSelectedBrand(e.target.value)
                                }
                              ></input>
                              <label htmlFor="">{brand.brand_name}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="filter-price"
                  style={{
                    background: "#fff",
                    marginRight: "12px",
                    marginBottom: "12px",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="filter-title">Lọc giá</div>
                    {isPriceOpen ? (
                      <i
                        className="bi bi-dash fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPriceOpen((prev) => !prev)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-plus fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPriceOpen((prev) => !prev)}
                      ></i>
                    )}
                  </div>
                  {isPriceOpen && (
                    <div>
                      <hr />
                      <div style={{ padding: "10px" }}>
                        <ul className="checkbox-list">
                          <li>
                            <input
                              type="checkbox"
                              className="checkbox-item"
                              name="priceRange"
                              value="under-500000"
                              checked={selectedPriceRange === "under-500000"}
                              onChange={(e) =>
                                setSelectedPriceRange(e.target.value)
                              }
                            />
                            <label>Dưới 500.000₫</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              className="checkbox-item"
                              name="priceRange"
                              value="500000-1000000"
                              checked={selectedPriceRange === "500000-1000000"}
                              onChange={(e) =>
                                setSelectedPriceRange(e.target.value)
                              }
                            />
                            <label>500.000₫ - 1.000.000₫</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              className="checkbox-item"
                              name="priceRange"
                              value="1000000-2000000"
                              checked={selectedPriceRange === "1000000-2000000"}
                              onChange={(e) =>
                                setSelectedPriceRange(e.target.value)
                              }
                            />
                            <label>1.000.000₫ - 2.000.000₫</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              className="checkbox-item"
                              name="priceRange"
                              value="2000000-3000000"
                              checked={selectedPriceRange === "2000000-3000000"}
                              onChange={(e) =>
                                setSelectedPriceRange(e.target.value)
                              }
                            />
                            <label>2.000.000₫ - 3.000.000₫</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              className="checkbox-item"
                              name="priceRange"
                              value="above-3000000"
                              checked={selectedPriceRange === "above-3000000"}
                              onChange={(e) =>
                                setSelectedPriceRange(e.target.value)
                              }
                            />
                            <label>Trên 3.000.000₫</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="filter-size"
                  style={{
                    background: "#fff",
                    marginRight: "12px",
                    marginBottom: "12px",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="filter-title">Kích thước</div>
                    {isSizeOpen ? (
                      <i
                        className="bi bi-dash fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsSizeOpen((prev) => !prev)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-plus fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsSizeOpen((prev) => !prev)}
                      ></i>
                    )}
                  </div>
                  {isSizeOpen && (
                    <div>
                      <hr />
                      <div
                        style={{
                          padding: "10px",
                          maxHeight: "250px",
                          overflowY: "auto",
                        }}
                      >
                        <ul className="checkbox-list">
                          {listSize?.map((size, index) => (
                            <li key={index}>
                              <input
                                type="checkbox"
                                className="checkbox-item"
                                name="size"
                                value={size}
                                checked={selectedSize === size}
                                onChange={(e) =>
                                  setSelectedSize(Number(e.target.value))
                                }
                              ></input>
                              <label htmlFor="">{size}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="filter-arrange"
                  style={{
                    background: "#fff",
                    marginRight: "12px",
                    marginBottom: "12px",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="filter-title">Sắp xếp</div>
                    {isSortOpen ? (
                      <i
                        className="bi bi-dash fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsSortOpen((prev) => !prev)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-plus fs-3 pe-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsSortOpen((prev) => !prev)}
                      ></i>
                    )}
                  </div>
                  {isSortOpen && (
                    <div>
                      <hr />
                      <div style={{ padding: "10px" }}>
                        <ul className="checkbox-list">
                          <li>
                            <input
                              type="checkbox"
                              className="checkbox-item"
                              name="sortOrder"
                              value="asc"
                              checked={selectedSortOption === "asc"}
                              onChange={(e) =>
                                setSelectedSortOption(e.target.value)
                              }
                            />
                            <label>Giá: Tăng dần</label>
                          </li>
                          <li>
                            <input
                              type="checkbox"
                              className="checkbox-item"
                              name="sortOrder"
                              value="desc"
                              checked={selectedSortOption === "desc"}
                              onChange={(e) =>
                                setSelectedSortOption(e.target.value)
                              }
                            />
                            <label>Giá: Giảm dần</label>
                          </li>

                          {/* <li>
														<input
															type="checkbox"
															className="checkbox-item"
															name="sortOrder"
															value="asc"
															checked={selectedSortOption === "asc"}
															onChange={(e) =>
																setSelectedSortOption(e.target.value)
															}
														/>
														<label>Tên: A-Z</label>
													</li>
													<li>
														<input
															type="checkbox"
															className="checkbox-item"
															name="sortOrder"
															value="asc"
															checked={selectedSortOption === "asc"}
															onChange={(e) =>
																setSelectedSortOption(e.target.value)
															}
														/>
														<label>Tên: Z-A</label>
													</li>
													<li>
														<input
															type="checkbox"
															className="checkbox-item"
															name="sortOrder"
															value="asc"
															checked={selectedSortOption === "asc"}
															onChange={(e) =>
																setSelectedSortOption(e.target.value)
															}
														/>
														<label>Bán chạy nhất</label>
													</li> */}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                    setSelectedSize(null);
                    setSelectedPriceRange(null);
                    setSelectedSortOption(null);
                  }}
                  className="btn btn-info text-light py-2"
                  style={{ width: "301.25px" }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
            <div className="col-lg-9 col-9">
              <div className="shop-main-content">
                <div
                  className="heading-content"
                  style={{ paddingBottom: "15px", paddingLeft: "12px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="heading-box d-flex align-items-center">
                      <h3 className="title fw-bold">Tất cả sản phẩm</h3>
                      <div className="title-count ps-5">
                        <span>
                          <strong>{productPagination.totalElements}</strong> sản
                          phẩm
                        </span>
                      </div>
                    </div>
                    {productPagination.totalElements === 0 && (
                      <p>Không tìm thấy kết quả. Vui lòng thử lại!</p>
                    )}
                  </div>
                </div>
                <div className="container-fluid list-product">
                  <div className="row">
                    {products.map((product, index) => (
                      <div className="col-md-3" key={index}>
                        <div
                          className="product-loop card"
                          style={{
                            width: "234.94px",
                            marginBottom: "12px",
                          }}
                        >
                          <Link to={`/products/${product.id}`}>
                            <img
                              src={product.productImage[0].url_Image}
                              className="card-img-top"
                              alt="product-image"
                              style={{
                                padding: "30px 3px 20px",
                                height: "276px",
                                width: "100%",
                              }}
                            />
                          </Link>
                          <div
                            className="card-details"
                            style={{ padding: "0 14px 10px 14px" }}
                          >
                            <div>
                              <span
                                className="category"
                                style={{ fontSize: "13px" }}
                              >
                                {product.categoryName}
                              </span>
                              <br />
                              <Link to={`/products/${product.id}`}>
                                <div
                                  style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    color: "black",
                                  }}
                                >
                                  <span className="product-name">
                                    {product.product_Name}
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center"
                              style={{ height: "43.5px", margin: "10px 0" }}
                            >
                              {product.promotion_Item &&
                              product.promotion_Item.length > 0 &&
                              product.promotion_Item[0].discount ? (
                                <div className="product-price d-flex flex-column">
                                  <span
                                    className="price-sale fw-bold"
                                    style={{ color: "#d0021c" }}
                                  >
                                    {`${new Intl.NumberFormat("vi-VN").format(
                                      product.price -
                                        product.price *
                                          (product.promotion_Item[0].discount /
                                            100)
                                    )}₫`}
                                  </span>
                                  <span
                                    className="price text-decoration-line-through text-black-50"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {`${new Intl.NumberFormat("vi-VN").format(
                                      product.price
                                    )}₫`}
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <span className="price fw-bold">
                                    {`${new Intl.NumberFormat("vi-VN").format(
                                      product.price
                                    )}₫`}
                                  </span>
                                </div>
                              )}

                              <div className="d-flex justify-content-end align-items-center">
                                {product.promotion_Item &&
                                  product.promotion_Item.length > 0 &&
                                  product.promotion_Item[0].discount && (
                                    <div className="discount">
                                      <span
                                        className="rounded-1 p-2 fw-bold"
                                        style={{
                                          fontSize: "13px",
                                          background: "#ff0000",
                                          color: "#fff",
                                        }}
                                      >
                                        -{product.promotion_Item[0].discount}%
                                      </span>
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div
                              className="add-to-cart d-flex align-items-center justify-content-start"
                              onClick={() => {
                                setIsModalOpen(true);
                                setProduct(product);
                              }}
                            >
                              <div
                                className="cart-icon rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  background: "#263b96",
                                  width: "32px",
                                  height: "32px",
                                }}
                              >
                                <span>
                                  <i
                                    className="bi bi-cart3"
                                    style={{ color: "#fff" }}
                                  ></i>
                                </span>
                              </div>
                              <div className="text-add-cart">
                                <span
                                  className="fw-bold ps-2"
                                  style={{ fontSize: "12px" }}
                                >
                                  THÊM VÀO GIỎ HÀNG
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* {page < productPagination.totalPages - 1 && (
									<div className="d-flex justify-content-center align-items-center pt-2">
										<button
											className="btn-loadmore"
											onClick={() => setPage(page + 1)}
										>
											Xem Thêm Sản Phẩm
										</button>
										{loading && (
											<div
												class="spinner-border text-warning"
												role="status"
												style={{
													width: "20px",
													height: "20px",
													marginLeft: "10px",
												}}
											>
												<span class="visually-hidden">Loading...</span>
											</div>
										)}
									</div>
								)} */}
                <div className="page d-flex justify-content-center align-items-center mt-3">
                  <nav
                    aria-label="Page navigation example"
                    style={{ cursor: "pointer" }}
                  >
                    <ul className="pagination">
                      <li className="page-item" onClick={handlePrev}>
                        <div className="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </div>
                      </li>
                      <li className="page-item">
                        <div className="page-link">{page + 1}</div>
                      </li>
                      <li
                        className="page-item"
                        onClick={() => setPage(page + 1)}
                      >
                        <div className="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
