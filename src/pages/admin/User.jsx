import React, { useEffect, useState } from "react";
import SideBar from "../../components/AdminSideBar";
import { Link } from "react-router-dom";
import * as userService from "../../services/UserService";
import ModalDelete from "../../components/ModalDelete";
import toast from "react-hot-toast";

const User = () => {
	const [users, setUsers] = useState(null);
	const [user, setUser] = useState({});
	const [page, setPage] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchGetAllUser = async () => {
		try {
			const data = await userService.getAllUser(page, 10);
			setUsers(data.content);
		} catch (error) {
			console.log("Fetch all user fail: ", error);
		}
	};

	useEffect(() => {
		fetchGetAllUser();
	}, [page]);

	const handlePrev = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const handleDeleteUser = async () => {
		if (user.order.length !== 0) {
			toast.error("Bạn không thể xóa bỏ người dùng đang có đơn hàng.");
			setIsModalOpen(false);
			return;
		} else {
			try {
				await userService.deleteUser(user.id);
				fetchGetAllUser(page, 10);
				toast.success("Xóa người dùng thành công.");
				setIsModalOpen(false);
			} catch (error) {
				toast.error("Xóa người dùng thất bại.");
				console.log("Delete user fail: ", error);
			}
		}
	};

	return (
		<div>
			<ModalDelete
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleDelete={handleDeleteUser}
				text={"Bạn có chắc chắn muốn xóa người dùng này?"}
			/>
			<div className="user" style={{ display: "flex", background: "#f5f5f5" }}>
				<SideBar />
				<div
					className="user-content"
					style={{ padding: "15px 20px", flex: "1" }}
				>
					<h3 className="fw-bold">Quản Lý Người Dùng</h3>
					<button className="btn btn-info fw-bold mt-4">
						<Link to="/admin/users/add-user" className="text-light">
							Thêm người dùng
						</Link>
					</button>
					<div
						className="mt-3"
						style={{
							background: "#fff",
							padding: "15px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							borderRadius: "10px",
						}}
					>
						<div className="table-user">
							<table className="table table-striped">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Người dùng</th>
										<th scope="col">Họ tên</th>
										<th scope="col">Email</th>
										<th scope="col">Số điện thoại</th>
										<th scope="col">Loại đăng nhập</th>
										<th scope="col">Quyền</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{users?.map((item, index) => (
										<tr key={index}>
											<th scope="row">#{page * 10 + index + 1}</th>
											<td>{item.id}</td>
											<td>{item.user_Name}</td>
											<td>{item.email}</td>
											<td>{item.phone_Number}</td>
											<td>{item.login_Type === "default" ? "Mặc định" : ""}</td>
											<td>{item.role}</td>
											<td>
												<button className="btn">
													<Link to = {`/admin/users/edit-user/${item.id}`}>
														<i className="bi bi-pencil-square text-info fs-5"></i>
													</Link>
												</button>
												<button
													onClick={() => {
														setIsModalOpen(true);
														setUser(item);
													}}
													className="btn"
												>
													<i className="bi bi-trash3-fill text-danger fs-5"></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="page d-flex justify-content-center align-items-center">
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
										<li className="page-item" onClick={() => setPage(page + 1)}>
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
	);
};

export default User;
