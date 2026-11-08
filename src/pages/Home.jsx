import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Shop</h1>
      <p>Browse our catalogue, filter it, and add products to your cart.</p>
      <Link to="/products">Go to products</Link>
    </div>
  );
}