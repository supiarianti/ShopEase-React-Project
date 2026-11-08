import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-card error-state">
      <AlertCircle size={30} />
      <strong>Oops, terjadi kendala</strong>
      <p>{message || "Data belum bisa dimuat. Periksa koneksi internet kamu."}</p>
      {onRetry && <button className="button button-primary" onClick={onRetry}><RefreshCw size={16} /> Coba lagi</button>}
    </div>
  );
}