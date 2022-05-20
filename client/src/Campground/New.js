import { useState, useEffect } from 'react';
//import styles from './New.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const New = ({}) => {
  const [title, setName] = useState();
  const titleHandler = e => {
    setName(e.currentTarget.value);
    console.log(title);
  };

  const [location, setLocation] = useState();
  const locationHandler = e => {
    setLocation(e.currentTarget.value);
    console.log(location);
  };

  const submitHandler = e => {
    e.preventDefault();

    let newCampground = {
      title,
      location,
    };

    axios
      .post('/api/campgrounds/new', newCampground)
      .then(response => response.data);
    navigate('/campgrounds');
  };

  let navigate = useNavigate();
  return (
    <div>
      <h1>Add A Campground</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Campground Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={titleHandler}
          placeholder="title"
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
        <button>all Campground</button>
      </Link>
    </div>
  );
};
export default New;
