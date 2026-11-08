const BASE_URL = "https://fakestoreapi.com";

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Permintaan gagal (${response.status}). Silakan coba lagi.`);
  return response.json();
}

export const getProducts = () => request(`${BASE_URL}/products`);
export const getProductById = (id) => request(`${BASE_URL}/products/${id}`);
export const getCategories = () => request(`${BASE_URL}/products/categories`);