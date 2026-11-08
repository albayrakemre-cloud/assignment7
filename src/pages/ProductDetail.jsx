import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { fetchProduct } from "../api/productsApi.js";
import { useCartStore } from "../store/cartStore.js";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const { loading, error, data: product } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const numericId = Number(id);
  const canGoNext = Number.isInteger(numericId);

  if (loading) return <p>Loading product...</p>;

  if (error) {
    const notFound = error.status === 404 || error.status === 400;
    return (
      <div>
        <p className="error">
          {notFound ? "Product not found." : `Could not load the product: ${error.message}`}
        </p>
        <button type="button" onClick={() => navigate("/products")}>Back to products</button>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => navigate("/products")}>Back</button>

      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} width="250" height="250" />
      <p>{product.description}</p>
      <p className="muted">Category: {product.category}</p>
      <p>Price: ${product.price}</p>

      <button type="button" onClick={() => addItem(product)}>Add to cart</button>

      {canGoNext && (
        <p>
          {numericId > 1 && <Link to={`/products/${numericId - 1}`}>Previous product</Link>}{" "}
          <Link to={`/products/${numericId + 1}`}>Next product</Link>
        </p>
      )}
    </div>
  );
}