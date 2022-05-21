import { useState, useEffect } from 'react';
import styles from './New.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

const New = ({}) => {
  const [title, setTitle] = useState();
  const titleHandler = e => {
    setTitle(e.currentTarget.value);
    // console.log(title);
  };

  const [location, setLocation] = useState();
  const locationHandler = e => {
    setLocation(e.currentTarget.value);
    // console.log(location);
  };

  const [image, setImage] = useState();
  const imageHandler = e => {
    setImage(e.currentTarget.value);
  };

  const [price, setPrice] = useState();
  const priceHandler = e => {
    setPrice(e.currentTarget.value);
  };

  const [description, setDescrption] = useState();
  const descriptionHandler = e => {
    setDescrption(e.currentTarget.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    let newCampground = {
      title,
      location,
      image,
      price,
      description,
    };

    if (title && location && image && price && description) {
      axios
        .post('/api/campgrounds/new', newCampground)
        .then(response => response.data);
      navigate('/campgrounds');
    } else {
      alert('Please fill the form');
    }
  };

  if (price < 0) {
    alert('Please check the price!!');
  }

  let navigate = useNavigate();
  return (
    <div>
      <Form className={styles.form} onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input the title"
            value={title}
            onChange={titleHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input the location"
            value={location}
            onChange={locationHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="0"
            value={price}
            onChange={priceHandler}
            min="0"
          />
        </Form.Group>

        {image && <img className={styles.image} src={image}></img>}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Iamge URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input the image URL"
            value={image}
            onChange={imageHandler}
          />
        </Form.Group>

        <FloatingLabel
          className="mb-3"
          controlId="floatingTextarea2"
          label="Description"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a description here"
            style={{ height: '100px' }}
            value={description}
            onChange={descriptionHandler}
          />
        </FloatingLabel>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default New;
