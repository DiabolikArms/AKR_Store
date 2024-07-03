import { useContext, useState, useEffect } from "react";
import ProductCard from '../components/ProductCard';

export default function ProductContext(){

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:4000/products/active-products`)
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
