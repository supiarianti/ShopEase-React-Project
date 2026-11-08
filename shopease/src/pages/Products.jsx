import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

const PAGE_SIZE = 8;

export default function Products() {
  const { products, loading, error } = useProducts();
  const [params, setParams] = useSearchParams();
  const search = params.get("q") || "";
  const category = params.get("category") || "all";
  const sort = params.get("sort") || "default";
  const pageFromUrl = Math.max(1, Number(params.get("page")) || 1);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => [...new Set(products.map((item) => item.category))], [products]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all" || value === "default") next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.delete("page");
    setParams(next);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (search.trim()) result = result.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== "all") result = result.filter((item) => item.category === category);
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "rating") result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    return result;
  }, [products, search, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(pageFromUrl, totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => setParams({});
  const retry = () => window.location.reload();

  return (
    <section className="page-section">
      <div className="page-title-row">
        <div><span className="eyebrow">KOLEKSI PRODUK</span><h1>Semua produk</h1><p>Temukan produk yang sesuai dengan kebutuhanmu.</p></div>
        <span className="result-count">{products.length} produk tersedia</span>
      </div>

      <div className="catalog-toolbar">
        <SearchBar value={search} onChange={(value) => updateParam("q", value)} />
        <button className={`button button-light filter-toggle${showFilters ? " selected" : ""}`} onClick={() => setShowFilters((value) => !value)}><SlidersHorizontal size={17} /> Filter & urutkan</button>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <label>Kategori
            <select value={category} onChange={(e) => updateParam("category", e.target.value)}>
              <option value="all">Semua kategori</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>Urutkan berdasarkan
            <select value={sort} onChange={(e) => updateParam("sort", e.target.value)}>
              <option value="default">Rekomendasi</option>
              <option value="name">Nama produk (A-Z)</option>
              <option value="price-low">Harga terendah</option>
              <option value="price-high">Harga tertinggi</option>
              <option value="rating">Rating tertinggi</option>
            </select>
          </label>
          <button className="reset-button" onClick={reset}><RotateCcw size={15} /> Reset filter</button>
        </div>
      )}

      <div className="active-filters">
        <span>{filtered.length} hasil ditemukan</span>
        {(search || category !== "all" || sort !== "default") && <button onClick={reset}>Hapus semua filter ×</button>}
      </div>

      {loading ? <Loading /> : error ? <ErrorMessage message={error} onRetry={retry} /> : visible.length === 0 ? <EmptyState /> : (
        <>
          <div className="product-grid">
            {visible.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <div className="pagination">
            <button disabled={page <= 1} onClick={() => updateParam("page", String(page - 1))}><ChevronLeft size={17} /> Sebelumnya</button>
            <span>Halaman <b>{page}</b> dari <b>{totalPages}</b></span>
            <button disabled={page >= totalPages} onClick={() => updateParam("page", String(page + 1))}>Selanjutnya <ChevronRight size={17} /></button>
          </div>
        </>
      )}
    </section>
  );
}