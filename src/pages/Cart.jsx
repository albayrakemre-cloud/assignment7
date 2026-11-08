import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your cart</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.title} - ${item.price}</span>
            <span>
              <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
              {" "}{item.quantity}{" "}
              <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
              {" "}
              <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
            </span>
          </li>
        ))}
      </ul>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
      <button type="button" onClick={clear}>Clear cart</button>
    </div>
  );
}