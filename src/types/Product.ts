// types/Product.ts

export interface Tax {
  id: number;
  tax_name: string;
  slug: string;
  tax_description: string;
  tax_rate: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  category_name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  pivot: {
      product_id: number;
      category_id: number;
  };
}

export interface Stock {
  id: number;
  quantity: string;
  product_id: number;
  store_id: number;
  created_at: string;
  updated_at: string;
}

export interface Attribute {
  id: number;
  attribute_name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface AttributeValue {
  id: number;
  attribute_value_name: string;
  attribute_id: number;
  created_at: string;
  updated_at: string;
  attribute: Attribute;
}

export interface CombinationAttributeValue {
  id: number;
  combination_id: number;
  attribute_value_id: number;
  created_at: string;
  updated_at: string;
  attribute_value: AttributeValue;
}

export interface Combination {
  id: number;
  combination_price: string;
  product_id: number;
  created_at: string;
  updated_at: string;
  combination_attribute_value: CombinationAttributeValue[];
}

export interface Media {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface Product {
  id: number;
  product_name: string;
  slug: string;
  product_description: string;
  product_price: string;
  product_barcode: string;
  product_sku: string;
  product_price_discount: string;
  status: number;
  product_status_pos: number;
  tax_id: number;
  created_at: string;
  updated_at: string;
  tax: Tax;
  categories: Category[];
  stocks: Stock[];
  combinations: Combination[];
  media: Media[];
}

// En '@/types/Product.ts' o en un archivo separado
export interface Client {
  id: number; // o string, dependiendo de tu API
  client_name: string; // Nombre del cliente
  slug: string; // Slug del cliente
  client_identification: number; // Identificación del cliente
  client_phone?: string; // Teléfono del cliente (opcional)
}