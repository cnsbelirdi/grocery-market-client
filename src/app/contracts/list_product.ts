import { List_Product_Image } from './list_product_image';

export class List_Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  description?: string;
  barcode?: string;
  category: string;
  categoryId?: string;
  active: boolean;
  productImageFiles?: List_Product_Image[];
  imagePath: string;
  createdDate: Date;
}
