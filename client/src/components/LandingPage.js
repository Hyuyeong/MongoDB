import { useEffect } from 'react';
import axios from 'axios';
//import styles from './LandingPage.module.css'

const LandingPage = () => {
  useEffect(() => {
    axios.get('api/hello').then(response => console.log(response.data));
  }, []);
  return <div> Landing Page </div>;
};
export default LandingPage;
