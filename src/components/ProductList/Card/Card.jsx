import * as React from 'react';
import styles from './Card.module.scss';
import { useProductsStore } from '../../../stores/productsStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as classNames from 'classnames';
import { useNavigationStore } from '../../../stores/navigationStore';

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
            <Title title={product.title} id={product.id} />
            <Brand brand={product.brand} />
          </div>
          <div className={styles.rating_price_button}>
            <Rating rating={product.rating} />
            <div className={styles.price_button}>
              <Price price={product.price} />
              <ButtonCart id={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Image = ({ link }) => {
  return <img className={styles.card_product_image} src={link} alt="cardImage" />;
};

const Title = ({ title, id }) => {
  const onTitleClick = useNavigationStore((state) => state.goProductDescPage);
  return (
    <p
      className={styles.card_product_title}
      onClick={() => {
        onTitleClick(id);
      }}
    >
      {title}
    </p>
  );
};

const Rating = ({ rating }) => {
  return <p className={styles.card_product_rating}>{rating}/5</p>;
};

const Price = ({ price }) => {
  return <p className={styles.card_product_price}>{price}$</p>;
};

const Brand = ({ brand }) => {
  return <p className={styles.card_product_brand}>{brand}</p>;
};

const Button = ({ id }) => {
  const onButtonClick = useProductsStore((state) => state.onButtonClick);
  const idsForProductsInCart = useProductsStore((state) => state.idsForProductsInCart);

  return (
    <div
      className={styles.card_product_button}
      onClick={() => {
        onButtonClick(id, true);
      }}
    >
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
  const onButtonClick = useProductsStore((state) => state.onButtonClick);

  return (
    <div
      className={styles.card_product_button}
      onClick={() => {
        onButtonClick(id, false);
      }}
    >
      <p>
        <span>Удалить</span>
        <FontAwesomeIcon icon={faTrash} />
      </p>
    </div>
  );
};
