const BASE_URL = "https://dummyjson.com/products";

// fetch()
async function request(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// "products"
export async function fetchProducts(signal) {
  const data = await request(`${BASE_URL}?limit=100`, signal);
  return data.products;
}

// one item
export function fetchProduct(id, signal) {
  return request(`${BASE_URL}/${id}`, signal);
}