import { useState } from 'react';
//import styles from './ProductNew.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductNew = ({}) => {
  const [name, setName] = useState();
  const nameHandler = e => {
    setName(e.currentTarget.value);
    console.log(name);
  };

  const [price, setPrice] = useState();
  const priceHandler = e => {
    setPrice(e.currentTarget.value);
    console.log(price);
  };

  const [category, setCategory] = useState();
  const categoryHandler = e => {
    setCategory(e.currentTarget.value);
    console.log(category);
  };

  const submitHandler = e => {
    e.preventDefault();

    let newProduct = {
      name,
      price,
      category,
    };

    axios.post('/api/products/new', newProduct).then(response => response.data);

    console.log(newProduct);
    navigate('/products');
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
    </div>
  );
};
export default ProductNew;
