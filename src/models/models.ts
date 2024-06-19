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
  tags: Array<string>;
  reviews: Array<Review>;

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
    price: number,
    tags: Array<string>,
    reviews: Array<Review>
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
    this.tags = tags;
    this.reviews = reviews;
  }

  static fromJson(json: any): Product {
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
      json.price,
      json.tags,
      Review.fromJson(json.reviews)
    );
  }

  static empty(): Product {
    return new Product(0, "", "", "", 0, "", 0, "", "", 0, 0, [], []);
  }
}

export class Review {
  rating: number;
  comment: string;
  date: DateClass;
  reviewerName: string;
  reviewerEmail: string;

  constructor(
    rating: number,
    comment: string,
    date: DateClass,
    reviewerName: string,
    reviewerEmail: string
  ) {
    this.rating = rating;
    this.comment = comment;
    this.date = date;
    this.reviewerName = reviewerName;
    this.reviewerEmail = reviewerEmail;
  }

  static fromJson(json: any): Array<Review> {
    let array: Array<Review> = [];
    for (let i = 0; i < json.length; i++) {
      array.push(Review.fromJsonReview(json[i]));
    }
    return array;
  }

  static fromJsonReview(json: any): Review {
    return new Review(
      json.rating,
      json.comment,
      DateClass.fromJson(json.date),
      json.reviewerName,
      json.reviewerEmail
    );
  }
}

class DateClass {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;

  constructor(
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number
  ) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hours = hours;
    this.minutes = minutes;
  }

  static fromJson(dateString: string): DateClass {
    const date = new Date(dateString);
    return new DateClass(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    );
  }
}
