import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Show.module.css';
import { Card, ListGroupItem, ListGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
const Show = ({}) => {
  const { id } = useParams();

  const [campground, setCampground] = useState([]);

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

  console.log(campground);

  let navgate = useNavigate();
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
      )}
    </div>
  );
};

export default Show;
