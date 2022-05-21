import { useState, useEffect } from 'react';
import styles from './Edit.module.css';
import axios from 'axios';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel, InputGroup } from 'react-bootstrap';

const Edit = props => {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/campgrounds/${id}`)
      .then(response => setCampground(response.data));
  }, []);

  // axios.get(`/api/campgrounds/${id}`).then(response => setCampground(response.data));

  const [campground, setCampground] = useState({});

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

  if (+price < 0) {
    alert('Plese check the price!');
  }
  const submitHandler = e => {
    e.preventDefault();

    let newCampground = {
      title,
      location,
      image,
      price,
      description,
    };
    axios
      .put(`/api/campgrounds/${campground._id}`, newCampground)
      .then(response => response.data);

    console.log(newCampground);

    if (newCampground) {
      navigate('/campgrounds');
    }
  };
  let navigate = useNavigate();
  return (
    <Form className={styles.form} onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder={campground.title}
          value={title}
          onChange={titleHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder={campground.location}
          value={location}
          onChange={locationHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Price</Form.Label>
        <InputGroup>
          <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          <Form.Control
            type="number"
            placeholder={campground.price}
            value={price}
            onChange={priceHandler}
            min="0"
          />
        </InputGroup>
      </Form.Group>

      <img className={styles.image} src={campground.image}></img>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Iamge URL</Form.Label>
        <Form.Control
          type="text"
          placeholder={campground.image}
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

      <Button variant="warning" type="submit">
        Update !!
      </Button>
    </Form>
  );
};
export default Edit;
