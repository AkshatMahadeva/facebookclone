import React, { useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { getAllPosts, getCurrentUser, getFindFriends, setRefresh } from './store/reducers/modeReducer';
import themeSettings from './theme';

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const rootUrl = useSelector((state) => state.rootApi);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const posts = useSelector(state => state.posts)
  const navigator = useNavigate();
  const refresh = useSelector((state) => state.refresh);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = async () => {
      const res = await fetch(`${rootUrl}/user/auth`, {
        method: 'GET',
        headers: {
          token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(getCurrentUser(data));
        dispatch(setRefresh(false));
      } else {
        console.log(data);
        navigator('/login');
      }
    };
    currentUser();
  }, [refresh]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await fetch(`${rootUrl}/user/all`, {
        method: 'GET',
        headers: {
          token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(getFindFriends(data));
        dispatch(setRefresh(false));
      } else {
        console.log(data);
      }
    };
    getFriends();
  }, [refresh]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`${rootUrl}/post/all`, {
        method: 'GET',
        headers: {
          token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(getAllPosts(data));
        dispatch(setRefresh(false));
      } else {
        console.log(data);
      }
    };
    getPosts();
  }, [refresh, posts]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container sx={{ marginTop: '100px', mb: 3, px: '10px', maxWidth: '1300px' }}>
        <Routes>
          {auth ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<ProfilePage />} />
              <Route path='*' element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {!token && <Route path="*" element={<Login />} />}
            </>
          )}
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
