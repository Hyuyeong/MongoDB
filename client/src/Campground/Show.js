import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Show.module.css';
import {
  Card,
  ListGroupItem,
  ListGroup,
  Button,
  Alert,
  Form,
} from 'react-bootstrap';
import axios from 'axios';
const Show = ({}) => {
  const { id } = useParams();

  const [campground, setCampground] = useState([]);

  const [rating, setRating] = useState(0);
  const ratingHandler = e => {
    setRating(e.currentTarget.value);

    // console.log(rating);
  };

  const [review, setReview] = useState();
  const reviewHandler = e => {
    setReview(e.currentTarget.value);
    // console.log(review);
  };

  useEffect(() => {
    axios
      .get(`/api/campgrounds/${id}`)
      .then(response => setCampground(response.data));
  }, []);

  const deleteHandler = () => {
    axios
      .delete(`/api/campgrounds/${id}`)
      .then(response => setCampground(response.data));
    navgate('/campgrounds');
  };

  const submitHandler = e => {
    e.preventDefault();

    let newReview = {
      reviews: {
        rating,
        review,
      },
    };

    console.log(newReview);
    if (rating && review) {
      axios
        .post(`/api/campgrounds/${campground._id}/review`, newReview)
        .then(response => response.data);
    } else if (rating) {
      alert('Review is empty');
    } else if (review) {
      alert('Please check the rating');
    } else {
      alert('Please check rating and review');
    }
  };

  console.log(campground);

  let navgate = useNavigate();
  if (!campground) return;

  // if (campground) {
  //   const reviewlist = 'dasfdsfdasfdsfs';

  //   setReviewList(reviewlist);
  //   console.log(reviewlist);
  // }

  return (
    <div>
      {/* <h1> {campground.title}</h1>
      <ul>
      <li>Location: {campground.location}</li>
      </ul>

      <img src={campground.image} alt={campground.title} />
      <p>{campground.description}</p>

      <Link to="/campgrounds">all campgrounds</Link>
      <Link to={'/campgrounds/' + id + '/edit'}>
        <button>edit</button>
      </Link>
      <button onClick={deleteHandler}>DELETE</button> */}

      {campground === 'error' ? (
        <Alert className={styles.error} variant="danger">
          Invaild ID !!!
        </Alert>
      ) : (
        <div>
          <Card className={styles.card}>
            <Card.Img
              className={styles.image}
              variant="top"
              src={campground.image}
            />
            <Card.Body>
              <Card.Title>{campground.title}</Card.Title>
              <Card.Text>{campground.location}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem className={styles.price}>
                <span>Price: </span>
                {campground.price} $
              </ListGroupItem>
              <ListGroupItem>{campground.description}</ListGroupItem>
            </ListGroup>
            <Card.Body className={styles.link}>
              <Card.Link href="/campgrounds">Back</Card.Link>
              <Link to={'/campgrounds/' + id + '/edit'}>
                <Button variant="warning">EDIT</Button>
              </Link>
              <Button
                className={styles.delete_btn}
                variant="danger"
                onClick={deleteHandler}
              >
                DELETE
              </Button>
            </Card.Body>
          </Card>
          <Form className={styles.review} onSubmit={submitHandler}>
            <Form.Label htmlFor="rating">Rating</Form.Label>
            <Form.Range
              onChange={ratingHandler}
              value={rating}
              min="1"
              max="5"
            />

            <Form.Group className="mb-3">
              <Form.Label htmlFor="">Review</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave a description here"
                style={{ height: '100px' }}
                value={review}
                onChange={reviewHandler}
              />
            </Form.Group>
            <Button className="mb-3" variant="success" type="submit">
              Submit
            </Button>
          </Form>

          {/* <div>{campground}</div> */}
        </div>
      )}
    </div>
  );
};

export default Show;
