import { NavLink } from "react-router-dom";
import { ShoppingBag, Heart, NotebookPen, House, Store } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const { favorites } = useShop();
  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <NavLink to="/" className="brand" aria-label="ShopEase beranda">
          <span className="brand-icon"><ShoppingBag size={20} /></span>
          <span>shop<span className="brand-accent">ease</span></span>
        </NavLink>
        <nav className="nav-links" aria-label="Navigasi utama">
          <NavLink to="/" end className={linkClass}><House size={16} />Home</NavLink>
          <NavLink to="/products" className={linkClass}><Store size={16} />Produk</NavLink>
          <NavLink to="/favorites" className={linkClass}><Heart size={16} />Favorit <span className="nav-count">{favorites.length}</span></NavLink>
          <NavLink to="/notes" className={linkClass}><NotebookPen size={16} />Catatan</NavLink>
        </nav>
      </div>
    </header>
  );
}