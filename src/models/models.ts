export class Product {
  id: number;
  title: string;
  category: string;
  description: string;
  stock: number;
  brand: string;
  discount: number;
  availability: string;
  thumbnail: string;
  rating: number;
  price: number;

  constructor(
    id: number,
    title: string,
    category: string,
    description: string,
    stock: number,
    brand: string,
    discount: number,
    availability: string,
    thumbnail: string,
    rating: number,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.description = description;
    this.stock = stock;
    this.brand = brand;
    this.discount = discount;
    this.availability = availability;
    this.thumbnail = thumbnail;
    this.rating = rating;
    this.price = price;
  }

  static fromJson(json: any) {
    return new Product(
      json.id,
      json.title,
      json.category,
      json.description,
      json.stock,
      json.brand,
      json.discountPercentage,
      json.availabilityStatus,
      json.thumbnail,
      json.rating,
      json.price
    );
  }
}
