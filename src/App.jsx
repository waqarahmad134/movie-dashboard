import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import ProductCategories from './pages/ProductCategories';
import Products from './pages/Products';
import Users from './pages/Users';
import Shops from './pages/Shops';
import Tailors from './pages/Tailors';
import Orders from './pages/Orders';
import ShopCategories from './pages/ShopCategories';
import TailorCategories from './pages/TailorCategories';
import SignIn from './pages/Authentication/SignIn';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <ChakraProvider>
        <Routes>
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | Admin Dashboard" />
                <SignIn />
              </>
            }
          />
          <Route
            index
            path="/"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Home | Admin Dashboard" />
                    <ECommerce />
                  </>
                }
              />
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="All Products | Admin Dashboard" />
                    <Products />
                  </>
                }
              />
            }
          />
          <Route
            path="/product-categories"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Products Categories | Admin Dashboard" />
                    <ProductCategories />
                  </>
                }
              />
            }
          />
          <Route
            path="/shop-categories"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Shop Categories | Admin Dashboard" />
                    <ShopCategories />
                  </>
                }
              />
            }
          />
          <Route
            path="/tailor-categories"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Tailor Categories | Admin Dashboard" />
                    <TailorCategories />
                  </>
                }
              />
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="All Users | Admin Dashboard" />
                    <Users />
                  </>
                }
              />
            }
          />
          <Route
            path="/shops"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="All Shops | Admin Dashboard" />
                    <Shops />
                  </>
                }
              />
            }
          />
          <Route
            path="/tailors"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="All Tailors | Admin Dashboard" />
                    <Tailors />
                  </>
                }
              />
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="All Orders | Admin Dashboard" />
                    <Orders />
                  </>
                }
              />
            }
          />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
