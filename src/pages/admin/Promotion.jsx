import React from "react";
import SideBar from "../../components/AdminSideBar";

const Promotion = () => {
	return (
		<div
			className="dashboard"
			style={{ display: "flex", background: "#f5f5f5" }}
		>
			<SideBar />
			<div
				className="dashboard-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<h3 className="fw-bold mb-4">Khuyến mãi</h3>
			</div>
		</div>
	);
};

export default Promotion;
