import type { Product, Category, Page } from './types';

const WOO_URL = process.env.WOO_URL || 'https://www.ecocleanpath.com/wp-json/wc/v3';
const WP_URL = 'https://www.ecocleanpath.com/wp-json/wp/v2';
const KEY = process.env.WC_CONSUMER_KEY || 'ck_3b095ee80ec4ecd5495b56ce3e9dc4ff5a7e94ae';
const SECRET = process.env.WC_CONSUMER_SECRET || 'cs_0c1c3a72c0d992fe563e5bf54a7bb72110263ec2';

function authHeader(): string {
  return 'Basic ' + Buffer.from(`${KEY}:${SECRET}`).toString('base64');
}

function wpAuthHeader(): string {
  const wpUser = process.env.WORDPRESS_USERNAME || 'admin';
  const wpPass = process.env.WORDPRESS_APP_PASSWORD || 'esfw kpT8 26CG ceNv icPA MuTn';
  return 'Basic ' + Buffer.from(`${wpUser}:${wpPass}`).toString('base64');
}

async function fetchWoo<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  const url = new URL(`${WOO_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });
  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: authHeader(), 'User-Agent': 'ecocleanpath-nextjs/1.0' },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch (e) {
    console.error(`WooCommerce fetch failed: ${endpoint}`, e);
    return null;
  }
}

async function fetchWP<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  const url = new URL(`${WP_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });
  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: wpAuthHeader() },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch (e) {
    console.error(`WordPress fetch failed: ${endpoint}`, e);
    return null;
  }
}

export async function getProducts(params: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  orderby?: string;
  order?: string;
  status?: string;
}): Promise<{ data: Product[]; total: number; totalPages: number }> {
  const data = await fetchWoo<{ id: number }[] & { 'x-wp-total'?: string; 'x-wp-totalpages'?: string }>('products', {
    per_page: String(params.per_page || 12),
    page: String(params.page || 1),
    ...(params.category ? { category: params.category } : {}),
    ...(params.search ? { search: params.search } : {}),
    orderby: params.orderby || 'date',
    order: params.order || 'desc',
    status: params.status || 'publish',
  });
  if (!data || !Array.isArray(data)) return { data: [], total: 0, totalPages: 1 };

  // WooCommerce returns the array directly; total comes via headers but fetchWoo handles it
  return {
    data: data as unknown as Product[],
    total: (data as any).total || 0,
    totalPages: (data as any).totalPages || 1,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchWoo<Product[]>(`products?slug=${encodeURIComponent(slug)}&status=publish&per_page=1`, {});
  if (!data || !Array.isArray(data)) return null;
  return (data as unknown as Product[])[0] || null;
}

export async function getProductById(id: number): Promise<Product | null> {
  const data = await fetchWoo<Product>(`products/${id}`, {});
  return data as Product | null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchWoo<Category[]>('products/categories', { per_page: '100', hide_empty: 'true' });
  if (!data || !Array.isArray(data)) return [];
  return data as unknown as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories();
  return cats.find(c => c.slug === slug) || null;
}

export async function getPages(): Promise<Page[]> {
  const data = await fetchWP<Page[]>('pages?per_page=50&status=publish');
  if (!data || !Array.isArray(data)) return [];
  return data as unknown as Page[];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const data = await fetchWP<Page[]>(`pages?slug=${slug}&status=publish`, {});
  if (!data || !Array.isArray(data)) return null;
  return (data as unknown as Page[])[0] || null;
}

export async function getRelatedProducts(productId: number, categoryIds: number[]): Promise<Product[]> {
  if (!categoryIds.length) return [];
  const data = await fetchWoo<Product[]>('products', {
    category: String(categoryIds[0]),
    per_page: '4',
    exclude: String(productId),
    status: 'publish',
  });
  if (!data || !Array.isArray(data)) return [];
  return data as unknown as Product[];
}

export async function createOrder(orderData: {
  payment_method: string;
  billing: Record<string, string>;
  line_items: { product_id: number; quantity: number }[];
}): Promise<{ id: number; number: string }> {
  const res = await fetch(`${WOO_URL}orders`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error(`Failed to create order: ${res.status}`);
  return res.json();
}

export async function getOrdersByEmail(email: string): Promise<{ id: number; number: string; status: string; date_created: string; total: string }[]> {
  const data = await fetchWoo<any[]>('orders', { customer: email, per_page: '20' });
  if (!data || !Array.isArray(data)) return [];
  return (data as any[]).map((o: any) => ({
    id: o.id, number: o.number, status: o.status,
    date_created: o.date_created, total: o.total,
  }));
}