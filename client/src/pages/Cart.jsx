import { useStore } from '../store/useStore';
import EmptyState from '../components/EmptyState';
export default function Cart() {
  const { cart, removeFromCart, clearCart } = useStore();
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  if (cart.length === 0) return <EmptyState title="Your cart is empty" subtitle="Add some bright products to get started." />;
  return (
    <main className="container">
      <h1 className="page-title">Your Cart <span>({cart.length})</span></h1>
      <div className="cart-layout">
        <div className="cart-list">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div><h3>{item.title}</h3><p>${item.price}</p></div>
              <button onClick={() => removeFromCart(item._id)}>Remove ?</button>
            </div>
          ))}
        </div>
        <aside className="summary-box"><h3>Summary</h3><p>Total <b>${total}</b></p><button className="btn-primary" onClick={clearCart}>Checkout Now ?</button></aside>
      </div>
    </main>
  );
}

