import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';
import { AddToCartButton } from '../styles/ProductCardStyles';


export default function ProductView() {
  const { user } = useContext(UserContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const addToCart = (productId, quantity) => {
    fetch(`http://localhost:4000/users/addToCart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity 
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data) {
          Swal.fire({
            title: "Successfully added to cart",
            icon: "success",
            text: "You have successfully added this to cart."
          })

          navigate("/products")

        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again."
          })
        }

      })
  };

  useEffect(() => {
    fetch(`http://localhost:4000/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProductData(data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [productId]);

  return (
    <div className="d-flex justify-content-center vh-100">
      <Container className="p-0" style={{ maxWidth: '400px', boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
        <p className="product-details-heading" style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>Product Details</p><br />
        {productData && (
          <div>
            <Card.Title className="mb-2 text-uppercase text-center" style={{ fontSize: '2.1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{productData.name}</Card.Title>
            <img src={productData.image} alt={productData.name} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
            <Card.Subtitle className="mb-2 text-center" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Description:</Card.Subtitle>
            <Card.Text className="mb-4 text-center" style={{ fontSize: '1.6rem' }}>{productData.description}</Card.Text><br/>
            <Card.Subtitle className="mb-2 text-center" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Price:</Card.Subtitle>
            <Card.Text className="mb-4 text-center" style={{ fontSize: '1.65rem' }}>{productData.price}/-</Card.Text><br/><br/>
          </div>
        )}
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.7rem', fontSize: '1.5rem'}}>Quantity:</span>
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                style={{ fontSize: '1.5rem', padding: '0.5rem', marginRight: '1rem' }}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <option key={index} value={index + 1}>{index + 1}</option>
                ))}
              </select><br/>
              {(user.id !== null) ? (
                <AddToCartButton onClick={() => addToCart(productId, selectedQuantity)}>
                  Add To Cart
                </AddToCartButton>
              ) : (
                <AddToCartButton
                  as={Link}
                  to="/login"
                  style={{ fontSize: '1.5rem' }}
                >
                  Log in to Add To Cart
                </AddToCartButton>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}