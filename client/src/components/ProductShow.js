import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
//import styles from './ProductShow.module.css'
import axios from 'axios';
const ProductShow = ({}) => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then(response => setProduct(response.data));
  }, []);

  return (
    <div>
      <h1> {product.name}</h1>
      <ul>
        <li>Price : ${product.price}</li>
        <li>category : {product.category}</li>
      </ul>
      <Link to="/products">all products</Link>
    </div>
  );
};

export default ProductShow;
