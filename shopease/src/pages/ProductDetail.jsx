import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Star, ShoppingBag, ShieldCheck } from "lucide-react";
import { getProductById } from "../services/productService";
import { useShop } from "../context/ShopContext";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const money = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "USD" }).format(value);

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { favorites, toggleFavorite } = useShop();
  const favorite = favorites.some((item) => item.id === product?.id);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getProductById(id)
      .then((data) => { if (active) setProduct(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <section className="page-section"><Loading text="Memuat detail produk..." /></section>;
  if (error || !product || !product.id) return <section className="page-section"><ErrorMessage message={error || "Produk tidak ditemukan."} /><Link to="/products" className="button button-light back-button"><ArrowLeft size={16} /> Kembali ke produk</Link></section>;

  return (
    <section className="page-section">
      <Link to="/products" className="back-link"><ArrowLeft size={16} /> Kembali ke katalog</Link>
      <div className="detail-layout">
        <div className="detail-image"><img src={product.image} alt={product.title} /></div>
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="detail-rating"><Star size={17} fill="currentColor" /> <b>{product.rating?.rate ?? "—"}</b><span>({product.rating?.count ?? 0} ulasan)</span></div>
          <div className="detail-price">{money(product.price)}</div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-meta"><span><ShieldCheck size={17} /> Informasi produk dari API</span><span><ShoppingBag size={17} /> Katalog ShopEase</span></div>
          <button className={`button ${favorite ? "button-favorite" : "button-primary"}`} onClick={() => toggleFavorite(product)}>
            <Heart size={17} fill={favorite ? "currentColor" : "none"} /> {favorite ? "Hapus dari favorit" : "Tambah ke favorit"}
          </button>
        </div>
      </div>
    </section>
  );
}