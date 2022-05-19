import { useEffect, useState } from 'react';
//import styles from './Products.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Products = ({}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(response => setProducts(response.data));
  }, []);
  console.log(products);

  const productName = products.map(product => (
    <Link key={product._id} to={product._id}>
      <li key={product._id}>{product.name}</li>
    </Link>
  ));

  return (
    <div>
      <h1>All Products!</h1>

      <ul>{productName}</ul>
      <Link to="/products/new">
        <button>new product</button>
      </Link>
    </div>
  );
};
export default Products;
