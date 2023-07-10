export class CartMenuListDto {
  cardId: number;
  totalPrice: number;
  Menu: MenuListDto[];
}

export class MenuListDto {
  menuId: number;
  name: string;
  quantity: number;
  price: number;
}
