import React from 'react';
import { Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const PrivateRoute = ({ element }) => {
  const userId = secureLocalStorage.getItem('userId');
  const userType = secureLocalStorage.getItem('userType');

  if (!userId || userType !== 'admin') {
    return <Navigate to="/auth/signin" />;
  }

  return element;
};

export default PrivateRoute;
