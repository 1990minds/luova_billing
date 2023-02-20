import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import {loginSelector} from '../api/authSlice'
import {useSelector} from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {

const {loading, isAdminAuthenticate} = useSelector(loginSelector)


  return (
    <Route
      {...rest}
      render={props =>
        !isAdminAuthenticate && !loading  ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;


