import React, { useContext, useState, useEffect } from "react";
import ProductCard from '../components/ProductCard';
import API_URL from "../constants";

export default function ProductContext(){

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const url = API_URL + "/products/active-products";
		fetch(url)
			.then(res => res.json())
			.then(data => {
				setProducts(data);
			})
	}, []);

	return (
		<>
			{products.map(product => (
				<ProductCard key={product._id} product={product} />
			))}
		</>
	);
};
