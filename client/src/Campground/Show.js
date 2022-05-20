import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
//import styles from './Show.module.css'
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
  let navgate = useNavigate();
  return (
    <div>
      <h1> {campground.title}</h1>
      <ul>
        <li>Location: {campground.location}</li>
      </ul>

      <img src={campground.image} alt={campground.title} />
      <p>{campground.description}</p>

      <Link to="/campgrounds">all campgrounds</Link>
      <Link to={'/campgrounds/' + id + '/edit'}>
        <button>edit</button>
      </Link>
      <button onClick={deleteHandler}>DELETE</button>
    </div>
  );
};

export default Show;
