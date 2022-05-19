import { useState } from 'react';
import styles from './LoginPage.module.css';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/user_action';
import { Link, useNavigate } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
import { Alert, Form, Input, Button, Checkbox } from 'antd';

const LoginPage = props => {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    // event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        navigate('/');
      } else {
        alert('Error˝');
      }
    });
  };

  let navigate = useNavigate();
  return (
    <div className={styles.card}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        onFinish={onSubmitHandler}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input type="email" value={Email} onChange={onEmailHandler} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input.Password
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Link to="/register">Sign Up</Link>
    </div>
  );
};
export default LoginPage;

// export default LoginPage () => <Alert message="Success Text" type="success" />;
