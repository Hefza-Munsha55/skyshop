import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
export default function Home() {
  const { products, loading, fetchProducts, searchProducts, searchQuery } = useStore();
  useEffect(() => { fetchProducts(); }, []);
  return (
    <main className="container">
      <header className="hero">
        <span className="pill">? BRIGHT SKY COLLECTION</span>
        <h1>Shop in the <span>Sky.</span><br/>Feel Light & Bright.</h1>
        <p>Curated fashion, tech and essentials — managed with global state, no prop drilling.</p>
        <input className="search" placeholder="Search products... try watch" value={searchQuery} onChange={(e) => searchProducts(e.target.value)} />
      </header>
      <div className="section-head"><h2>Featured Products</h2><p>{products.length} items found</p></div>
      {loading ? <Skeleton /> : products.length === 0 ? (
        <EmptyState title="No products found" subtitle={`No results for "${searchQuery}". Try another word.`} onReset={() => fetchProducts()} />
      ) : (
        <div className="grid">{products.map(p => <ProductCard key={p._id} product={p} />)}</div>
      )}
    </main>
  );
}

