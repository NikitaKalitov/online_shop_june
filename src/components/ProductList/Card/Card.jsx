import * as React from "react";
import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCheck,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useProductsStore } from "../../../stores/productsStore";
import { useAuthStore } from "../../../stores/authStore";

export const Card = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <Image link={product.thumbnail} />
        <div className={styles.info}>
          <div className={styles.title_brand}>
            <Title title={product.title} id={product.id} />
            <Brand brand={product.brand} />
          </div>
          <div className={styles.rating_price_button}>
            <Rating rating={product.rating} />
            <div className={styles.price_button}>
              <Price price={product.price} />
              <Button id={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CartCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <Image link={product.thumbnail} />
        <div className={styles.info}>
          <div className={styles.title_brand}>
            <TitleCart title={product.title} />
            <BrandCart brand={product.brand} />
          </div>
          <div className={styles.price_button_cart}>
            <Price price={product.price} />
            <ButtonCart id={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Image = ({ link }) => {
  return (
    <img className={styles.card_product_image} src={link} alt="cardImage" />
  );
};

const Title = ({ title, id }) => {
  return (
    <p className={styles.card_product_title}>
      <Link to={`${id}`} preventScrollReset={true}>
        <span>{title}</span>
      </Link>
    </p>
  );
};

const TitleCart = ({ title }) => {
  return (
    <p className={styles.card_product_title_cart}>
      <span>{title}</span>
    </p>
  );
};

const Rating = ({ rating }) => {
  return (
    <div className={styles.card_product_rating_container}>
      <p className={styles.card_product_rating}>
        {rating}/5
        <span className={styles.card_product_rating_icon}>
          <FontAwesomeIcon icon={faStar} />
        </span>
      </p>
    </div>
  );
};

const Price = ({ price }) => {
  return <p className={styles.card_product_price}>{price}$</p>;
};

const Brand = ({ brand }) => {
  return (
    <p className={styles.card_product_brand}>
      <span>{brand}</span>
    </p>
  );
};

const BrandCart = ({ brand }) => {
  return (
    <p className={styles.card_product_brand_cart}>
      <span>{brand}</span>
    </p>
  );
};

const Button = ({ id }) => {
  const navigate = useNavigate();
  const checkLogin = useAuthStore((state) => state.checkLogin);
  const onButtonClick = useProductsStore((state) => state.onButtonClick);
  const idsForProductsInCart = useProductsStore((state) => state.cartIds);

  const onClick = async () => {
    const value = await checkLogin();
    if (value) {
      onButtonClick(id, true);
    } else {
      navigate("auth_warning");
    }
  };

  return (
    <div className={styles.card_product_button} onClick={onClick}>
      <>
        {idsForProductsInCart.filter((productId) => productId === id)[0] ? (
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

const ButtonCart = ({ id }) => {
  const navigate = useNavigate();
  const checkLogin = useAuthStore((state) => state.checkLogin);
  const onButtonClick = useProductsStore((state) => state.onButtonClick);

  const onClick = async () => {
    const value = await checkLogin();
    if (value) {
      onButtonClick(id, false);
    } else {
      navigate("auth_warning");
    }
  };

  return (
    <div className={styles.card_product_button} onClick={onClick}>
      <p>
        <span>Удалить</span>
        <FontAwesomeIcon icon={faTrash} />
      </p>
    </div>
  );
};
