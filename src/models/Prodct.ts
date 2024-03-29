import { ProductType } from "./ProductType"

export interface Product {
    id: number
    product_type_id: number
    name: string
    meta: Meta[]
    deleted_at: any
    created_at: string
    updated_at: string
    product_type: ProductType
  }
  
  export interface Meta {
    meta_key: string
    meta_value: string
  }
  

  