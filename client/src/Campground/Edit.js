import { useState, useEffect } from 'react';
//import styles from './Edit.module.css'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';

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
  const [location, setLocation] = useState();

  const titleHandler = e => {
    setTitle(e.currentTarget.value);
    // console.log(title);
  };

  const locationHandler = e => {
    setLocation(e.currentTarget.value);
    // console.log(location);
  };

  console.log(campground);
  // console.log(campground.title);

  const submitHandler = e => {
    e.preventDefault();

    let newCampground = {
      title,
      location,
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
    <div>
      <h1>Add A Campground</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Campground title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={titleHandler}
          placeholder="campground title"
        />
        <label htmlFor="location">Location </label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={locationHandler}
          placeholder="location"
        />

        <button type="submit">Submit</button>
      </form>
      <Link to="/campgrounds">
        <Button variant="primary">all Campground</Button>
      </Link>
    </div>
  );
};
export default Edit;
