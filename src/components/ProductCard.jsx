import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} width="150" height="150" />
        <h3>{product.title}</h3>
      </Link>
      <p className="muted">{product.category}</p>
      <p>${product.price}</p>
      <button type="button" onClick={() => addItem(product)}>Add to cart</button>
    </div>
  );
}