import * as React from "react";
import styles from "./Reviews.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useProductsStore } from "../../../stores/productsStore";
import { DateClass, ReviewClass } from "../../../models/models";

export const Reviews = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div className={styles.view_container}>
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
      <FontAwesomeIcon
        icon={faArrowDown}
        className={show ? styles.arrow_up : styles.arrow_down}
      />
    </div>
  );
};

const Body = ({ show }: { show: boolean }) => {
  const product = useProductsStore((state) => state.currentProduct);

  const element = document.getElementById("review_section");

  const style: React.CSSProperties = {
    maxHeight: show ? `${element.scrollHeight}px` : 0,
  };

  return (
    <div id="review_section" className={styles.review_section} style={style}>
      {product.reviews.map((review: ReviewClass, index: number) => (
        <Review review={review} key={index} />
      ))}
    </div>
  );
};

const Review = ({ review }: { review: ReviewClass }) => {
  return (
    <div className={styles.review_container}>
      <div className={styles.review_body}>
        <div className={styles.top}>
          <div className={styles.reviewer}>
            <ReviewerName name={review.reviewerName} />
            <ReviewerEmail email={review.reviewerEmail} />
          </div>
          <ReviewDate date={review.date} />
        </div>
        <div className={styles.middle}>
          <ReviewerComment comment={review.comment} />
        </div>
        <div className={styles.low}>
          <ReviewerRating rating={review.rating} />
          <Opinion />
        </div>
      </div>
    </div>
  );
};

const ReviewerName = ({ name }: { name: string }) => {
  return <p className={styles.name}>{name}</p>;
};

const ReviewerEmail = ({ email }: { email: string }) => {
  return (
    <div className={styles.email}>
      <p>({email})</p>
    </div>
  );
};

const ReviewDate = ({ date }: { date: DateClass }) => {
  return (
    <p className={styles.date}>
      {date.hours}:{date.minutes} {date.day}.{date.month}.{date.year}
    </p>
  );
};

const ReviewerComment = ({ comment }: { comment: string }) => {
  return <p className={styles.comment}>{comment}</p>;
};

const ReviewerRating = ({ rating }: { rating: number }) => {
  return (
    <p className={styles.rating}>
      <span>{rating}/5</span>
      <FontAwesomeIcon icon={faStar} className={styles.rating_icon} />
    </p>
  );
};

const Opinion = () => {
  return <p>Like this review?</p>;
};
