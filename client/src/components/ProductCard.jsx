import { useStore } from '../store/useStore';
export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, cart } = useStore();
  const inCart = cart.find(i => i._id === product._id);
  const liked = wishlist.find(i => i._id === product._id);
  return (
    <article className="card">
      <div className="img-wrap">
        <img src={product.image} alt={product.title} />
        <span className="badge">{product.category}</span>
        <button className={`heart ${liked ? 'active' : ''}`} onClick={() => toggleWishlist(product)}>
          {liked ? '?' : '?'}
        </button>
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <button className={inCart ? 'btn-added' : 'btn-primary'} onClick={() => addToCart(product)}>
          {inCart ? '? Added to Cart' : '+ Add to Cart'}
        </button>
      </div>
    </article>
  );
}

