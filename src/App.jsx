import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Movies from './pages/Movies';
import Categories from './pages/Categories';
import Actors from './pages/Actors';
import Actress from './pages/Actress';
import SouthActor from './pages/SouthActors';
import SouthActors from './pages/SouthActors';
import Qualities from './pages/Qualities';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import Tags from './pages/Tags';
import Seasons from './pages/Seasons';

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
            path="/"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="All Movies | Admin Dashboard" />
                    <Movies />
                  </>
                }
              />
            }
          />
          <Route
            path="/add-movie"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Add New Movie | Admin Dashboard" />
                    <AddMovie />
                  </>
                }
              />
            }
          />
          <Route
            path="/edit-movie"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Add New Movie | Admin Dashboard" />
                    <EditMovie />
                  </>
                }
              />
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Categories | Admin Dashboard" />
                    <Categories />
                  </>
                }
              />
            }
          />
          <Route
            path="/tags"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Tag | Admin Dashboard" />
                    <Tags />
                  </>
                }
              />
            }
          />
          <Route
            path="/seasons"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Season | Admin Dashboard" />
                    <Seasons />
                  </>
                }
              />
            }
          />
          <Route
            path="/actors"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Categories | Admin Dashboard" />
                    <Actors />
                  </>
                }
              />
            }
          />
          <Route
            path="/actress"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Categories | Admin Dashboard" />
                    <Actress />
                  </>
                }
              />
            }
          />
          <Route
            path="/south-actors"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Categories | Admin Dashboard" />
                    <SouthActors />
                  </>
                }
              />
            }
          />
          <Route
            path="/qualities"
            element={
              <PrivateRoute
                element={
                  <>
                    <PageTitle title="Categories | Admin Dashboard" />
                    <Qualities />
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
