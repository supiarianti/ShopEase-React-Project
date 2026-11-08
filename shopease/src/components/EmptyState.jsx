import { PackageSearch } from "lucide-react";

export default function EmptyState({ title = "Data tidak ditemukan", description = "Coba ubah kata kunci atau filter pencarian." }) {
  return <div className="state-card"><PackageSearch size={34} /><strong>{title}</strong><p>{description}</p></div>;
}