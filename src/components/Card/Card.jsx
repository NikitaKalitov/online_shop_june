import React from "react";
import styles from "./Card.module.scss";
import { useProductsStore } from "../../store/productsStore";

export const Card = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_container}>
        <CardProductImage link={product.thumbnail} />
        <CardProductInfo product={product} />
      </div>
    </div>
  );
};

const CardProductImage = ({ link }) => {
  return (
    <img className={styles.card_product_image} src={link} alt="cardImage" />
  );
};

const CardProductInfo = ({ product }) => {
  return (
    <div className={styles.card_product_info}>
      <div className={styles.card_product_title_brand}>
        <p className={styles.card_product_title}>{product.title}</p>
        <p className={styles.card_product_brand}>{product.brand}</p>
      </div>
      <div className={styles.card_product_rating_price_button}>
        <p className={styles.card_product_rating}>{product.rating}/5</p>
        <div className={styles.card_product_price_button}>
          <p className={styles.card_product_price}>{product.price}$</p>
          <CardProductInfoButton id={product.id} />
        </div>
      </div>
    </div>
  );
};

const CardProductInfoButton = ({ id }) => {
  const addProductToCart = useProductsStore((state) => state.addProductToCart);
  const idsForProductsInCart = useProductsStore(
    (state) => state.idsForProductsInCart
  );

  return (
    <div
      className={styles.card_product_button}
      onClick={() => {
        addProductToCart(id);
      }}
    >
      <span>
        {idsForProductsInCart.filter((productId) => productId === id)[0]
          ? "Добавлено"
          : "В корзину"}
      </span>
    </div>
  );
};
