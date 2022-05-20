import { useState, useEffect } from 'react';
//import styles from './ProductEdit.module.css'
import axios from 'axios';

import { Link, useParams, useNavigate } from 'react-router-dom';

const ProductEdit = props => {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then(response => setProduct(response.data));
  }, []);

  // axios.get(`/api/products/${id}`).then(response => setProduct(response.data));

  const [product, setProduct] = useState({});
  const [infoget, setInfoget] = useState({});

  // console.log(infoget.name);

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();

  const infogetHandler = e => {
    setInfoget(product);
  };

  const nameHandler = e => {
    setName(e.currentTarget.value);
    // console.log(name);
  };

  const priceHandler = e => {
    setPrice(e.currentTarget.value);
    // console.log(price);
  };

  const categoryHandler = e => {
    setCategory(e.currentTarget.value);
    // console.log(category);
  };

  console.log(product);
  // console.log(product.name);

  const submitHandler = e => {
    e.preventDefault();

    let newProduct = {
      name,
      price,
      category,
    };

    axios
      .put(`/api/products/${product._id}`, newProduct)
      .then(response => response.data);

    console.log(newProduct);

    if (newProduct) {
      navigate('/products');
    }
  };
  let navigate = useNavigate();
  return (
    <div>
      <h1>Add A Product</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={nameHandler}
          placeholder="product name"
        />
        <label htmlFor="price">Price (Unit)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={priceHandler}
          placeholder="price"
        />
        <label htmlFor="category">Select Category</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={categoryHandler}
        >
          <option value="select">select</option>
          <option value="fruit">fruit</option>
          <option value="vegetable">vegetable</option>
          <option value="dairy">dairy</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <Link to="/products">
        <button>all Product</button>
      </Link>
      <button onClick={infogetHandler}>정보가져오기</button>
    </div>
  );
};
export default ProductEdit;
