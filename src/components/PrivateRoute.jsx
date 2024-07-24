import React from 'react';
import { Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const PrivateRoute = ({ element }) => {
  const userId = secureLocalStorage.getItem('userId');
  const userType = secureLocalStorage.getItem('userType'); 
  console.log("🚀 ~ PrivateRoute ~ userType:", userType)
  const allowedUserTypes = ['admin', 'manager1', 'manager2', 'manager3', 'manager4'];

  // Check if userId is not present or if userType is not in the allowed list
  if (!userId || !allowedUserTypes.includes(userType)) {
    return <Navigate to="/auth/signin" />;
  }

  return element;
};

export default PrivateRoute;
