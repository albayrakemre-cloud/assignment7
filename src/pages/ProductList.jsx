import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { fetchProducts } from "../api/productsApi.js";

export default function ProductList() {
  //(?q=...&category=...)
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const { loading, error, data: products } = useFetch(fetchProducts, []);

  function updateParam(key, value) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        return next;
      },
      { replace: true }
    );
  }

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">Could not load products: {error.message}</p>;

  const categories = [...new Set(products.map((product) => product.category))].sort();
  const filtered = products.filter(
    (product) =>
      product.title.toLowerCase().includes(q.toLowerCase()) &&
      (category === "" || product.category === category)
  );

  return (
    <div>
      <h1>Products</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={q}
          onChange={(e) => updateParam("q", e.target.value)}
        />
        <select value={category} onChange={(e) => updateParam("category", e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <div className="grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}