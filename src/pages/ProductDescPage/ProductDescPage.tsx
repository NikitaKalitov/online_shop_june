import * as React from "react";
import { useProductsStore } from "../../stores/productsStore";
import styles from "./ProductDescPage.module.scss";
import { useEffect, useState } from "react";
import { Product } from "../../models/models";
import { LoaderView } from "../../components/Loader/Loader";

export const ProductDescPage = () => {
  const [product, setProduct] = useState(Product.empty());
  const getProductById = useProductsStore((state) => state.getProductById);

  useEffect(() => {
    getProductById().then((product) => {
      setProduct(product);
    });
  });

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
            <ProductDescription desc={product.description} />
          </div>
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

const ProductDescription = ({ desc }: { desc: string }) => {
  return (
    <div>
      <p>{desc}</p>
    </div>
  );
};
