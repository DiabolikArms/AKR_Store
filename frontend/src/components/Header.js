import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from "../context/UserContext";// Update the path to the UserContext
import Nav from './Nav'; 

const Header = () => {
  const { user } = useContext(UserContext); // Use the user context

  return (
    <MainHeader>
      <NavLink to="/">
        <img src="./images/logo1.png" alt="My Logo Image" />
      </NavLink>
      <Nav user={user} /> {/* Pass the user context to Nav */}
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
`;

export default Header;
