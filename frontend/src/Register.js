import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { Button as StyledButton } from './styles/Button'; // Import the styled button from your styles folder

export default function Register() {
	const navigate = useNavigate();
  
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
	const [isActive, setIsActive] = useState(false);
  

	async function registerUser(e) {
		e.preventDefault();

		try {
			const emailCheckResponse = await fetch(`https://capstone-3-backend-render.onrender.com/users/checkEmail`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
				}),
			});

			const emailCheckData = await emailCheckResponse.json();

			if (emailCheckResponse.status === 200) {
				if (emailCheckData.emailExists) {
					Swal.fire({
						title: "Registration Failed",
						icon: "error",
						text: "Email already exists. Please use a different email.",
					});
					return;
				}
			}

			const response = await fetch(`https://capstone-3-backend-render.onrender.com/users/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password1,
					isAdmin: false
				}),
			});

			if (response.status === 200) {
				setEmail('');
				setPassword1('');
				setPassword2('');
				Swal.fire({
					title: "Registered Successfully",
					icon: "success",
					text: "Welcome to My Website!"
				})
				navigate('/login');
			} else if (response.status === 404) {
				Swal.fire({
					title: "Registration Failed",
					icon: "error",
					text: "Please check your registration details and try again!"
				})
			}
		} catch (error) {
			console.error('Error registering user:', error);
			console.error('Error details:', error.message); // Log the error details
			Swal.fire({
				title: "Registration Failed",
				icon: "error",
				text: "An error occurred during registration. Please try again!"
			});
		}
	}


	useEffect(() => {
		if (email !== "" && password1 !== "" && password2 !== "" && password2 === password1) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password1, password2]);

	function togglePasswordVisibility() {
		setShowPassword(prevShowPassword => !prevShowPassword);
	  }
	
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
		  <Form style={{ width: '90%', maxWidth: '400px', padding: '20px', boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)' }} onSubmit={(e) => registerUser(e)}>
			<h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>
			  REGISTER FORM
			</h2>
			<Form.Group controlId="userEmail">
			  <Form.Label style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
				Email Address
			  </Form.Label>
			  <div style={{ marginBottom: '1rem' }}>
				<Form.Control
				  type="email"
				  placeholder="Enter email here"
				  value={email}
				  onChange={(e) => setEmail(e.target.value)}
				  required
				/>
			  </div>
			</Form.Group>
			<Form.Group controlId="userPassword1">
          <Form.Label style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Password
          </Form.Label>
          <div style={{ marginBottom: '1rem', position: 'relative' }}>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
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
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>
        </Form.Group>
			<Form.Group controlId="userPassword2">
			  <Form.Label style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
				Verify Password
			  </Form.Label>
			  <div style={{ marginBottom: '1rem' }}>
				<Form.Control
				  type="password"
				  placeholder="Verify Password"
				  value={password2}
				  onChange={(e) => setPassword2(e.target.value)}
				  required
				/>
			  </div>
			</Form.Group>
			<div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
			  <StyledButton
				variant="primary"
				type="submit"
				id="submitBtn"
				style={{ fontSize: '1.5rem', marginRight: '10px', padding: '0.5rem 1rem' }}
				disabled={!isActive}
			  >
				Submit
			  </StyledButton>
			</div>
		  </Form>
		</div>
	  );
	}
	