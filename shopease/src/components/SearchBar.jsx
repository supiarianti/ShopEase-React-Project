import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Cari produk..." }) {
  return (
    <div className="search-box">
      <Search size={18} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Cari produk"
      />
      {value && <button type="button" className="clear-search" onClick={() => onChange("")} aria-label="Hapus pencarian"><X size={16} /></button>}
    </div>
  );
}