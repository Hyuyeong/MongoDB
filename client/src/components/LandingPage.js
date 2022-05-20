import { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import styles from './LandingPage.module.css'

const LandingPage = () => {
  // useEffect(() => {
  //   axios.get('api/hello').then(response => console.log(response.data));
  // }, []);

  return (
    <div>
      Landing Page
      <Link to="/products">Products</Link>
    </div>
  );
};
export default LandingPage;
