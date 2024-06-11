import React from "react";
import styles from "./Card.module.scss";
import { useProductsStore } from "../../../stores/productsStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as classNames from "classnames";
import { useNavigationStore } from "../../../stores/navigationStore";

export const Card = ({ product, isAllProductsPage }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_container}>
        <CardProductImage link={product.thumbnail} />
        <CardProductInfo
          product={product}
          isAllProductsPage={isAllProductsPage}
        >
          <CardProductTitleBrand>
            <CardProductTitle title={product.title} />
            <CardProductBrand
              brand={product.brand}
              isAllProductsPage={isAllProductsPage}
            />
          </CardProductTitleBrand>
          <CardProductsRatingPriceButton isAllProductsPage={isAllProductsPage}>
            <CardProductRating
              isAllProductsPage={isAllProductsPage}
              rating={product.rating}
            />
            <CardProductPriceButton isAllProductsPage={isAllProductsPage}>
              <CardProductPrice price={product.price} />
              <CardProductInfoButton
                id={product.id}
                isAllProductsPage={isAllProductsPage}
              />
            </CardProductPriceButton>
          </CardProductsRatingPriceButton>
        </CardProductInfo>
      </div>
    </div>
  );
};

const CardProductImage = ({ link }) => {
  return (
    <img className={styles.card_product_image} src={link} alt="cardImage" />
  );
};

const CardProductInfo = ({ children, product, isAllProductsPage }) => {
  return <div className={styles.card_product_info}>{children}</div>;
};

const CardProductTitleBrand = ({ children }) => {
  return <div className={styles.card_product_title_brand}>{children}</div>;
};

const CardProductTitle = ({ title }) => {
  const onTitleClick = useNavigationStore((state) => state.goProductDescPage);
  return (
    <p
      className={styles.card_product_title}
      onClick={() => {
        onTitleClick();
      }}
    >
      {title}
    </p>
  );
};

const CardProductsRatingPriceButton = ({ children, isAllProductsPage }) => {
  return (
    <div
      className={
        isAllProductsPage
          ? styles.card_product_rating_price_button
          : styles.card_product_rating_price_button_cart
      }
    >
      {children}
    </div>
  );
};

const CardProductRating = ({ isAllProductsPage, rating }) => {
  return (
    <p
      className={
        isAllProductsPage
          ? styles.card_product_rating
          : classNames(styles.card_product_rating, styles.invisible)
      }
    >
      {rating}/5
    </p>
  );
};

const CardProductPriceButton = ({ children, isAllProductsPage }) => {
  return (
    <div
      className={
        isAllProductsPage
          ? styles.card_product_price_button
          : styles.card_product_price_button_cart
      }
    >
      {children}
    </div>
  );
};

const CardProductPrice = ({ price }) => {
  <p className={styles.card_product_price}>{price}$</p>;
};

const CardProductBrand = ({ brand, isAllProductsPage }) => {
  return (
    <p
      className={
        isAllProductsPage
          ? styles.card_product_brand
          : classNames(styles.card_product_brand, styles.invisible)
      }
    >
      {brand}
    </p>
  );
};

const CardProductInfoButton = ({ id, isAllProductsPage }) => {
  const onButtonClick = useProductsStore((state) => state.onButtonClick);
  const idsForProductsInCart = useProductsStore(
    (state) => state.idsForProductsInCart
  );

  return (
    <div
      className={styles.card_product_button}
      onClick={() => {
        onButtonClick(id, isAllProductsPage);
      }}
    >
      <>
        {!isAllProductsPage ? (
          <p>
            <span>Удалить</span>
            <FontAwesomeIcon icon={faTrash} />
          </p>
        ) : idsForProductsInCart.filter((productId) => productId === id)[0] ? (
          <p>
            <span>Добавлено</span>
            <FontAwesomeIcon icon={faCheck} />
          </p>
        ) : (
          <p>
            <span>В корзину</span>
            <FontAwesomeIcon icon={faCartPlus} />
          </p>
        )}
      </>
    </div>
  );
};
