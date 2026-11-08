import { useState } from "react";
import { NotebookPen, Trash2, Plus, CalendarDays } from "lucide-react";
import { useShop } from "../context/ShopContext";
import EmptyState from "../components/EmptyState";

export default function MyNotes() {
  const { notes, addNote, deleteNote } = useShop();
  const [form, setForm] = useState({ title: "", product: "", content: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setErrors((current) => ({ ...current, [event.target.name]: "" }));
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Judul catatan wajib diisi.";
    else if (form.title.trim().length < 3) nextErrors.title = "Judul minimal 3 karakter.";
    if (!form.content.trim()) nextErrors.content = "Isi catatan wajib diisi.";
    else if (form.content.trim().length < 10) nextErrors.content = "Isi catatan minimal 10 karakter.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    addNote({ title: form.title.trim(), product: form.product.trim(), content: form.content.trim() });
    setForm({ title: "", product: "", content: "" });
    setSuccess("Catatan berhasil ditambahkan.");
  };

  return (
    <section className="page-section">
      <div className="page-title-row"><div><span className="eyebrow">RUANG PRIBADI</span><h1>Catatan saya</h1><p>Simpan ide atau catatan tentang produk yang menarik perhatianmu.</p></div><span className="result-count"><NotebookPen size={15} /> {notes.length} catatan</span></div>
      <div className="notes-layout">
        <form className="note-form" onSubmit={handleSubmit} noValidate>
          <div className="form-heading"><span className="form-icon"><Plus size={18} /></span><div><h2>Buat catatan baru</h2><p>Isi formulir di bawah ini.</p></div></div>
          <label htmlFor="note-title">Judul catatan <span>*</span></label>
          <input id="note-title" name="title" value={form.title} onChange={handleChange} placeholder="Contoh: Produk yang ingin dibeli" />
          {errors.title && <small className="field-error">{errors.title}</small>}
          <label htmlFor="note-product">Nama produk <small>(opsional)</small></label>
          <input id="note-product" name="product" value={form.product} onChange={handleChange} placeholder="Nama produk" />
          <label htmlFor="note-content">Isi catatan <span>*</span></label>
          <textarea id="note-content" name="content" value={form.content} onChange={handleChange} rows="5" placeholder="Tulis catatanmu di sini..." />
          {errors.content && <small className="field-error">{errors.content}</small>}
          {success && <p className="success-message">{success}</p>}
          <button className="button button-primary submit-note" type="submit"><Plus size={17} /> Simpan catatan</button>
        </form>
        <div className="notes-list">
          <div className="notes-list-heading"><h2>Daftar catatan</h2><span>{notes.length} tersimpan</span></div>
          {notes.length === 0 ? <EmptyState title="Belum ada catatan" description="Catatan yang kamu buat akan tampil di sini." /> : notes.map((note) => (
            <article className="note-card" key={note.id}>
              <div className="note-card-top"><span className="note-dot"><NotebookPen size={16} /></span><button className="delete-note" onClick={() => deleteNote(note.id)} aria-label="Hapus catatan"><Trash2 size={16} /></button></div>
              <h3>{note.title}</h3>
              {note.product && <span className="note-product">{note.product}</span>}
              <p>{note.content}</p>
              <small><CalendarDays size={13} /> {new Date(note.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}