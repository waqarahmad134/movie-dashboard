import React from 'react';
import { Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const PrivateRoute = ({ element }) => {
  const userType = secureLocalStorage.getItem('userType'); 
  const allowedUserTypes = ['admin', 'manager' , 'manager1', 'manager2', 'manager3', 'manager4'];

  if (!allowedUserTypes.includes(userType)) {
    return <Navigate to="/auth/signin" />;
  }

  return element;
};

export default PrivateRoute;
