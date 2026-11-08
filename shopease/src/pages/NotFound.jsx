import { Link } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return <section className="not-found"><SearchX size={54} /><span className="eyebrow">404 ERROR</span><h1>Halaman tidak ditemukan</h1><p>Maaf, halaman yang kamu cari tidak tersedia.</p><Link to="/" className="button button-primary"><ArrowLeft size={16} /> Kembali ke beranda</Link></section>;
}