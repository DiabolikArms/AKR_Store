import React, { useState, useContext } from 'react';
import { Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from './context/UserContext';
import Swal from 'sweetalert2';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Button } from './styles/Button';


export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function authenticate(e) {
    e.preventDefault();
    
    fetch(`http://localhost:4000/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.access) {
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access);
      } else {
        Swal.fire({
          title: "Authentication Failed",
          icon: "error",
          text: "User not registered."
        });
      }
    })
    .catch(error => {
      console.error('Error authenticating:', error);
      Swal.fire({
        title: "Authentication Failed",
        icon: "error",
        text: "An error occurred while logging in. Please try again."
      });
    });
  }

  function retrieveUserDetails(token) {
    fetch(`http://localhost:4000/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser({
        id: data._id,
        isAdmin: data.isAdmin
      });

      Swal.fire({
        title: "Login Successful",
        icon: "success",
        text: "Welcome to My Store!"
      });

      navigate('/'); // Navigate to home page after successful login
    })
    .catch(error => {
      console.error('Error retrieving user details:', error);
      Swal.fire({
        title: "Login Unsuccessful",
        icon: "Error",
        text: "An error occurred. Please try again."
      });

      navigate('/');
    });
  }

  function togglePasswordVisibility() {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Card style={{ width: '90%', maxWidth: '400px', padding: '20px', boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>
          LOGIN FORM
        </h2>
        <Form onSubmit={(e) => authenticate(e)}>
          <Form.Group controlId="userEmail">
            <Form.Label style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Email Address
            </Form.Label>
            <div style={{ marginBottom: '1rem' }}>
              <Form.Control
                type="email"
                placeholder="Enter email here"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Password
            </Form.Label>
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password here"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                type="button"
                style={{
                  marginLeft: '10px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible  size={20} /> : <AiFillEye size={20} />}
              </button>
            </div>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Button
              variant="primary"
              type="submit"
              id="submitBtn"
              style={{ fontSize: '1.5rem', marginRight: '10px', padding: '0.5rem 1rem' }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}