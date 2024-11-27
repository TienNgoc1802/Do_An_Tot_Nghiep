import React, { useState, useEffect } from "react";
import SideBar from "../../components/AdminSideBar";

const Delivery = () => {
	return (
		<div className="order" style={{ display: "flex", background: "#f5f5f5" }}>
			<SideBar />
			<div
				className="order-content"
				style={{ padding: "15px 20px", flex: "1" }}
			>
				<h3 className="fw-bold mb-4">Quản lý giao hàng</h3>
                <div>
                    
                </div>
			</div>
		</div>
	);
};

export default Delivery;
