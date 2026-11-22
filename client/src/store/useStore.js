import { create } from "zustand";
const API = "http://localhost:5000";
export const useStore = create((set, get) => ({
  products: [],
  cart: [],
  wishlist: [],
  loading: false,
  searchQuery: "",
  fetchProducts: async () => {
    set({ loading: true });
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    set({ products: data, loading: false });
  },
  searchProducts: async (q) => {
    set({ searchQuery: q, loading: true });
    if (!q.trim()) {
      get().fetchProducts();
      return;
    }
    const res = await fetch(`${API}/api/products/search?q=${q}`);
    const data = await res.json();
    set({ products: data, loading: false });
  },
  addToCart: (p) => set((s) => ({ cart: [...s.cart, p] })),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((i) => i._id !== id) })),
  toggleWishlist: (p) => set((s) => {
    const exists = s.wishlist.find((i) => i._id === p._id);
    return { wishlist: exists ? s.wishlist.filter((i) => i._id !== p._id) : [...s.wishlist, p] };
  }),
}));
