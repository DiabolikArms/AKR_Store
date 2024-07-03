import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Products from './Products';
import Contact from './Contact';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Cart from './Cart';
import ErrorPage from './ErrorPage';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductView from './components/ProductView';


const App = () => {

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      id: null,
      isAdmin: null,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`http://localhost:4000/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (typeof data._id !== 'undefined') {
            setUser({
              id: data._id,
              isAdmin: data.isAdmin,
            });
          } else {
            setUser({
              id: null,
              isAdmin: null,
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    } else {
      setUser({
        id: null,
        isAdmin: null,
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;