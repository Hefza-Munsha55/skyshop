import { useEffect, useState } from "react";
import { useStore } from "./store/useStore";
import Skeleton from "./components/Skeleton";
import EmptyState from "./components/EmptyState";

export default function App() {
  const { products, loading, fetchProducts, searchProducts, addToCart,removeFromCart,  toggleWishlist, cart, wishlist } = useStore();
  const [q, setQ] = useState("");
  const [view, setView] = useState("home");

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f0f7ff" }}>
      <header style={{ background: "#2563eb", color: "white", padding: "15px 30px", display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>SKYSHOP ☁️</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setView("home")} style={{ padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}>Home</button>
          <button onClick={() => setView("cart")} style={{ padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}>Cart ({cart.length})</button>
          <button onClick={() => setView("wishlist")} style={{ padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}>Wishlist ({wishlist.length})</button>
        </div>
      </header>

      {view === "home" && (
        <div style={{ padding: "30px", maxWidth: "1100px", margin: "0 auto" }}>
          <h1>Discover Your Next Favorite Thing</h1>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); searchProducts(e.target.value); }}
            placeholder="Search products... e.g. watch, hoodie"
            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }}
          />
          <p>{products.length} items found</p>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton />
            </div>
          ) : products.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {products.map((p) => (
                <div key={p._id} style={{ background: "white", borderRadius: "15px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div style={{ padding: "15px" }}>
                    <h3>{p.title}</h3>
                    <p style={{ color: "#2563eb", fontWeight: "bold" }}>${p.price} - {p.category}</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => addToCart(p)} style={{ flex: 1, background: "#2563eb", color: "white", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer" }}>Add to Cart</button>
                      <button onClick={() => toggleWishlist(p)} style={{ background: "#ffe4e6", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer" }}>♡</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === "cart" && (
  <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
    <h1>Your Cart</h1>
    {cart.length === 0 ? <EmptyState /> : (
      <>
        {cart.map((p, i) => (
          <div key={i} style={{ background: "white", padding: "15px", marginBottom: "10px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{p.title} - ${p.price}</span>
            <button onClick={() => removeFromCart(p._id)} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}>Remove ✕</button>
          </div>
        ))}
        <div style={{ background: "white", padding: "15px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
          <b>Total: ${cart.reduce((sum, p) => sum + p.price, 0)}</b>
          <button onClick={() => { alert("Order Placed! 🎉"); }} style={{ background: "#16a34a", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>Checkout</button>
        </div>
      </>
    )}
  </div>
)}
      {view === "wishlist" && (
  <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
    <h1>Your Wishlist</h1>
    {wishlist.length === 0 ? <EmptyState /> : wishlist.map((p) => (
      <div key={p._id} style={{ background: "white", padding: "15px", marginBottom: "10px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{p.title} - ${p.price}</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => addToCart(p)} style={{ background: "#2563eb", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}>Move to Cart</button>
          <button onClick={() => toggleWishlist(p)} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}>Remove ✕</button>
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}