import * as React from "react";
import styles from "./ProductDescPage.module.scss";
import { Product } from "../../models/models";
import { LoaderView } from "../../components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Reviews } from "../../components/Reviews/Reviews";
import { useProductsStore } from "../../stores/productsStore";

export const loader = async ({ params, request }) => {
  const getDescProduct = useProductsStore.getState().getDescProduct;
  const product = await getDescProduct(params.productId);

  return product;
};

export const ProductDescPage = () => {
  const product = useProductsStore((state) => state.descProduct);

  return (
    <>
      {product.title ? <ProductDescView product={product} /> : <LoaderView />}
    </>
  );
};

const ProductDescView = ({ product }: { product: Product }) => {
  return (
    <div className={styles.page}>
      <div className={styles.page_view}>
        <div className={styles.top}>
          <ProductImage image={product.thumbnail} />
          <div className={styles.main_info}>
            <ProductTitle title={product.title} />
            <ProductBrand brand={product.brand} />
            <ProductCategory category={product.category} />
            <ProductTags tags={product.tags} />
            <ProductStock
              stock={product.stock}
              availability={product.availability}
            />
            <ProductRating rating={product.rating} />
            <ProductPrice price={product.price} discount={product.discount} />
          </div>
        </div>
        <div className={styles.middle}>
          <ProductDescription desc={product.description} />
          <Reviews />
        </div>
      </div>
    </div>
  );
};

const ProductImage = ({ image }: { image: string }) => {
  return <img className={styles.image} src={image} alt="thumbnail" />;
};

const ProductTitle = ({ title }: { title: string }) => {
  return <p className={styles.title}>{title}</p>;
};

const ProductBrand = ({ brand }: { brand: string }) => {
  return (
    <p>
      <span className={styles.brand}>{brand}</span>
    </p>
  );
};

const ProductCategory = ({ category }: { category: string }) => {
  return (
    <p className={styles.category}>
      Category: <span>{category}</span>
    </p>
  );
};

const ProductTags = ({ tags }: { tags: Array<string> }) => {
  return (
    <p className={styles.tags}>
      Tags:
      {tags.map((tag, index) => (
        <span key={index}>
          <span className={styles.hover}>{tag}</span>
        </span>
      ))}
    </p>
  );
};

const ProductStock = ({
  stock,
  availability,
}: {
  stock: number;
  availability: string;
}) => {
  return (
    <p className={styles.stock}>
      Stock: <span>{stock}</span> ({availability})
    </p>
  );
};

const ProductRating = ({ rating }: { rating: number }) => {
  return (
    <p className={styles.rating}>
      <span>{rating}/5</span>
      <FontAwesomeIcon icon={faStar} className={styles.rating_icon} />
    </p>
  );
};

const ProductPrice = ({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) => {
  return (
    <div className={styles.price}>
      <span>
        {price}$ <span className={styles.italic}>(-{discount}%)</span>
      </span>
    </div>
  );
};

const ProductDescription = ({ desc }: { desc: string }) => {
  return <p className={styles.description}>{desc}</p>;
};
