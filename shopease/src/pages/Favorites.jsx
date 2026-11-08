import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

export default function Favorites() {
  const { favorites } = useShop();
  return (
    <section className="page-section">
      <div className="page-title-row"><div><span className="eyebrow">KOLEKSI PRIBADI</span><h1>Produk favorit</h1><p>Produk yang kamu simpan untuk dilihat kembali.</p></div><span className="result-count"><Heart size={15} /> {favorites.length} produk</span></div>
      {favorites.length === 0 ? <><EmptyState title="Belum ada produk favorit" description="Tekan ikon hati pada produk untuk menyimpannya di sini." /><div className="center-action"><Link to="/products" className="button button-primary">Jelajahi produk</Link></div></> : <div className="product-grid">{favorites.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
    </section>
  );
}