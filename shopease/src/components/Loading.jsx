export default function Loading({ text = "Sedang memuat data produk..." }) {
  return <div className="state-card"><span className="spinner" /><strong>{text}</strong><p>Tunggu sebentar, kami sedang mengambil data.</p></div>;
}