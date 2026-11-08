import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Search, Truck, Sparkles } from "lucide-react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15} /> TEMUKAN PRODUK FAVORITMU</span>
          <h1>Belanja lebih mudah,<br /><span>pilihan lebih banyak.</span></h1>
          <p>Jelajahi berbagai pilihan produk dalam satu katalog. Temukan barang yang kamu cari dengan cepat dan praktis.</p>
          <div className="hero-actions">
            <Link to="/products" className="button button-primary">Jelajahi produk <ArrowRight size={17} /></Link>
            <Link to="/favorites" className="button button-light">Lihat favorit</Link>
          </div>
          <div className="hero-trust"><span><ShieldCheck size={16} /> Katalog praktis</span><span><Truck size={16} /> Pilihan beragam</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-bag"><span>shop</span><b>ease</b><ShoppingBagIcon /></div>
          <div className="float-tag tag-top">✦ Find your style</div>
          <div className="float-tag tag-bottom">Simple. Smart. Easy.</div>
        </div>
      </section>

      <section className="benefit-strip">
        <div><span className="benefit-icon"><Search size={19} /></span><div><b>Mudah ditemukan</b><small>Pencarian produk praktis</small></div></div>
        <div><span className="benefit-icon"><ShieldCheck size={19} /></span><div><b>Informasi lengkap</b><small>Detail dan rating produk</small></div></div>
        <div><span className="benefit-icon"><Truck size={19} /></span><div><b>Banyak pilihan</b><small>Beragam kategori produk</small></div></div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">PILIHAN UNTUKMU</span><h2>Produk pilihan</h2><p>Beberapa produk yang bisa kamu jelajahi.</p></div>
          <Link to="/products" className="text-link">Lihat semua <ArrowRight size={16} /></Link>
        </div>
        {loading ? <Loading /> : error ? <ErrorMessage message={error} /> : (
          <div className="product-grid">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>
    </>
  );
}

function ShoppingBagIcon() {
  return <span className="bag-mark">S</span>;
}