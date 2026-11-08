import { Link } from "react-router-dom";
import { Heart, Star, ArrowUpRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

const money = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "USD" }).format(value);

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useShop();
  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <article className="product-card">
      <button
        className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
        onClick={() => toggleFavorite(product)}
        aria-label={isFavorite ? "Hapus dari favorit" : "Tambahkan ke favorit"}
        title={isFavorite ? "Hapus dari favorit" : "Tambahkan ke favorit"}
      >
        <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
      </button>
      <Link className="product-image-wrap" to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`} className="product-title">{product.title}</Link>
        <div className="product-card-bottom">
          <strong>{money(product.price)}</strong>
          <span className="rating"><Star size={14} fill="currentColor" /> {product.rating?.rate ?? "—"}</span>
        </div>
        <Link className="detail-link" to={`/products/${product.id}`}>Lihat detail <ArrowUpRight size={14} /></Link>
      </div>
    </article>
  );
}