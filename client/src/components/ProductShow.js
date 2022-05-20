import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
//import styles from './ProductShow.module.css'
import axios from 'axios';
const ProductShow = ({}) => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  axios.get(`/api/products/${id}`).then(response => setProduct(response.data));

  const deleteHandler = () => {
    axios
      .delete(`/api/products/${id}`)
      .then(response => setProduct(response.data));
    navgate('/products');
  };
  let navgate = useNavigate();
  return (
    <div>
      <h1> {product.name}</h1>
      <ul>
        <li>Price : ${product.price}</li>
        <li>category : {product.category}</li>
      </ul>
      <Link to="/products">all products</Link>
      <Link to={'/products/' + id + '/edit'}>
        <button>edit</button>
      </Link>
      <button onClick={deleteHandler}>DELETE</button>
    </div>
  );
};

export default ProductShow;
