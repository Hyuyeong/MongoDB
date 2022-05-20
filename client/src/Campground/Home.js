import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

import { Card, Button } from 'react-bootstrap';

import axios from 'axios';

const Home = ({}) => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    axios
      .get('/api/campgrounds')
      .then(response => setCampgrounds(response.data));
  }, []);
  console.log(campgrounds);

  // const Campground = campgrounds.map(campground => (
  //   <Link key={campground._id} to={campground._id}>
  //     <li key={campground._id}>{campground.title}</li>
  //   </Link>
  // ));

  const Campground = campgrounds.map(campground => {
    return (
      <Card>
        <Card.Img variant="top" src={campground.image} />
        <Card.Body>
          <Card.Title className={styles.title} key={campground._id}>
            {campground.title}
          </Card.Title>
          <Card.Text>{campground.description}</Card.Text>
          <Link to={campground._id}>
            <Button variant="primary">Go</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  });

  return <div className={styles.card}>{Campground}</div>;
};
export default Home;
