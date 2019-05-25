export interface ProductOption {
  color: string | string[];
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  available: boolean;
  weight: number;
  options: ProductOption[];
}
