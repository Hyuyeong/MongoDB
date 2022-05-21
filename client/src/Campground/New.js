import { useState, useEffect } from 'react';
import styles from './New.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel, InputGroup } from 'react-bootstrap';

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

    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }

    setValidated(true);

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

  const [validated, setValidated] = useState(false);

  return (
    <div>
      <Form
        noValidate
        validated={validated}
        className={styles.form}
        onSubmit={submitHandler}
      >
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Input the title"
            value={title}
            onChange={titleHandler}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationCustom02">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Input the location"
            value={location}
            onChange={locationHandler}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationCustom03">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            <Form.Control
              required
              type="number"
              placeholder="0"
              value={price}
              onChange={priceHandler}
              min="0"
            />
          </InputGroup>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        {image && <img className={styles.image} src={image}></img>}
        <Form.Group className="mb-3" controlId="validationCustom04">
          <Form.Label>Iamge URL</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Input the image URL"
            value={image}
            onChange={imageHandler}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationCustom05">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            placeholder="Leave a description here"
            style={{ height: '100px' }}
            value={description}
            onChange={descriptionHandler}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default New;
