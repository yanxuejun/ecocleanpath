export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  categories: ProductCategory[];
  images: ProductImage[];
  tags: Tag[];
  attributes: Attribute[];
  variations: Variation[];
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Attribute {
  id: number;
  name: string;
  options: string[];
  visible: boolean;
  variation: boolean;
}

export interface Variation {
  id: number;
  attributes: { name: string; option: string }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  image?: { src: string };
  description: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface Order {
  id: number;
  number: string;
  status: string;
  date_created: string;
  total: string;
  billing: BillingAddress;
  line_items: LineItem[];
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface LineItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Page {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  link: string;
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  totalPages: number;
}