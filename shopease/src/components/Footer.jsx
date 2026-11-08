export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-brand">shopease</span>
        <span>Katalog produk sederhana untuk pengalaman belanja yang mudah.</span>
        <span>© {new Date().getFullYear()} ShopEase</span>
      </div>
    </footer>
  );
}