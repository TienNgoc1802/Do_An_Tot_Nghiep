import { createContext, useState, useEffect } from "react";
import * as cartService from "../services/CartService";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
	const [totalProductInCart, setTotalProductInCart] = useState(0);
	const [user, setUser] = useState(null);
	const [admin, setAdmin] = useState(null);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [searchContent, setSearchContent] = useState("");
	const [order, setOrder] = useState(null);
	const [copiedCode, setCopiedCode] = useState(null);

	const fetchListCart = async (id) => {
		try {
			const data = await cartService.cartOfUser(id);
			setTotalProductInCart(data.length);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const storedUser = sessionStorage.getItem("user");
		if (storedUser) {
			const userData = JSON.parse(storedUser);
			setUser(userData);
			fetchListCart(userData.id);
		}
	}, [setUser, setTotalProductInCart]);

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				totalProductInCart,
				setTotalProductInCart,
				searchContent,
				setSearchContent,
				admin,
				setAdmin,
				selectedProducts,
				setSelectedProducts,
				copiedCode,
				setCopiedCode,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
