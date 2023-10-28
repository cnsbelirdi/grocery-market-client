import { List_Product_Image } from '../list_product_image';

export class List_Basket_Item {
  basketItemId: string;
  name: string;
  price: number;
  quantity: number;
  productImageFile: List_Product_Image;
  productId: string;
}
