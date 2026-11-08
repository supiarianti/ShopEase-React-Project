import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ShopContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readStorage("shopease-favorites", []));
  const [notes, setNotes] = useState(() => readStorage("shopease-notes", []));

  useEffect(() => localStorage.setItem("shopease-favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("shopease-notes", JSON.stringify(notes)), [notes]);

  const toggleFavorite = (product) => {
    setFavorites((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  };

  const addNote = (note) => setNotes((current) => [
    { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, createdAt: new Date().toISOString(), ...note },
    ...current
  ]);

  const deleteNote = (id) => setNotes((current) => current.filter((note) => note.id !== id));

  const value = useMemo(
    () => ({ favorites, notes, toggleFavorite, addNote, deleteNote }),
    [favorites, notes]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop harus digunakan di dalam ShopProvider");
  return context;
}