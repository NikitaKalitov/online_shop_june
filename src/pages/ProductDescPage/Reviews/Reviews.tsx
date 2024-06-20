import * as React from "react";
import styles from "./Reviews.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useProductsStore } from "../../../stores/productsStore";

export const ReviewsView = () => {
  const [show, setShow] = React.useState(true);

  return (
    <div className={styles.container}>
      <Button setShow={setShow} show={show} />
      <Body show={show} />
    </div>
  );
};

const Button = ({
  setShow,
  show,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}) => {
  return (
    <div
      className={styles.button}
      onClick={() => {
        setShow(!show);
      }}
    >
      <span>{!show ? "See reviews" : "Hide reviews"}</span>
      <FontAwesomeIcon icon={!show ? faArrowDown : faArrowUp} />
    </div>
  );
};

const Body = ({ show }: { show: boolean }) => {
  return <div className={show ? styles.body : styles.none}></div>;
};

const Review = () => {
  const product = useProductsStore((state) => state.currentProduct);

  return { product };
};
