import { useState } from 'react';
//import styles from './NavBar.module.css'
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const NavBar = ({}) => {
  const [logout, setlogout] = useState(true);

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then(response => {
      if (response.data.success) {
        navigate('/login');
      } else {
        // setlogout(prev => !prev);
        alert('fail to logout');
      }
    });
  };

  let navigate = useNavigate();
  return (
    <div>
      <Link to="/login">
        <button>Login in</button>
      </Link>
      {logout && (
        <Button type="primary" onClick={onClickHandler}>
          logout
        </Button>
      )}
    </div>
  );
};
export default NavBar;
