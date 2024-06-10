export class Product {
  id: number;
  title: string;
  thumbnail: string;
  isInCart: boolean;
  rating: number;
  price: number;

  constructor(id: number, title: string, thumbnail: string, isInCart: boolean, rating: number, price: number) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.isInCart = isInCart;
    this.rating = rating;
    this.price = price;
  }

  static fromJson(json: any) {
    return new Product(json.id, json.title, json.thumbnail, false, json.rating, json.price);
  }
}
