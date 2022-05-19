import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null) {
  //null    =>  access anybody
  //true    => only login user
  //false   =>  not access with login user
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response);
        //not login stats
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login');
          }
        } else {
          //login stats
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
            if (option === false) navigate('/');
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return <AuthenticationCheck />;
}
