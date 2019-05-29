export interface ProductOption {
  color: string
  quantity: number
  power?: number[]
  storage?: string[]
}

export interface Product {
  id: number
  name: string
  brand: string
  price: string
  available: boolean
  weight: number
  options: ProductOption[]
}

export interface SubOption {
  optionType: string | undefined
  optionValue: string | number | undefined
}

export interface ProductConfiguration {
  color: string
  subOption: SubOption
}

export interface CartItem extends ProductConfiguration{
  product: Product
  quantity: number
}
