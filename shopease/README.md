# ShopEase — React Product Catalog

Aplikasi katalog produk menggunakan React, Vite, JavaScript, React Router, Context API, dan Fake Store API.

## Menjalankan aplikasi
1. Install Node.js versi LTS.
2. Ekstrak ZIP ini.
3. Buka folder `shopease` di VS Code.
4. Buka terminal pada folder project, lalu jalankan:

```bash
npm install
npm run dev
```

5. Buka URL yang muncul (biasanya http://localhost:5173).

## Build untuk publikasi
```bash
npm run build
npm run preview
```
Hasil build berada di folder `dist`.

## Fitur
- Home, katalog produk, detail produk berdasarkan ID, favorit, catatan, dan halaman 404.
- React Router dengan nested route: seluruh halaman berada di dalam layout `App` yang memuat Navbar dan Footer.
- Dynamic route `/products/:id`.
- Search, filter kategori, sorting, pagination, dan URL state menggunakan query parameters.
- Data fetching dari Fake Store API dengan loading, error, dan empty state.
- Context API untuk global state favorit dan catatan.
- Local state untuk kontrol filter dan form state menggunakan controlled components.
- Validasi form catatan.
- Custom hook `useProducts`.
- Reusable components di folder `components`.
- Favorit dan catatan disimpan menggunakan localStorage.

## API
https://fakestoreapi.com/

## Struktur folder
- `src/components`: komponen reusable.
- `src/pages`: halaman aplikasi.
- `src/context`: global state.
- `src/hooks`: custom hooks.
- `src/services`: akses API.

## Deployment
Build aplikasi dengan `npm run build`. Untuk GitHub Pages, Netlify, atau Vercel, unggah repository dan atur build command `npm run build`, output directory `dist`.
