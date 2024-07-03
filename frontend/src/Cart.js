import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import UserContext from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import API_URL from "./constants";
import {
  StyledProductCard,
  ProductCardContent
} from './styles/ProductCardStyles';
import { Button } from './styles/Button';

export default function Cart() {
  const { user } = useContext(UserContext);
  const [cartedProducts, setCartedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = API_URL + "/users/details";
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.cartedProducts) {
          setCartedProducts(data.cartedProducts);
        }
      })
      .catch(error => {
        console.error('Error fetching carted products:', error);
      });
  }, [user._id]);

  const handleOrderClick = () => {
    const url = API_URL + "/users/cartToCheckout";
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: 'Your order has been placed successfully.',
        })
        navigate("/")
        }
    })
    .catch(error => {
      console.error('Error moving products to ordered:', error);
    });
  };

  return (
    <div className="d-flex justify-content-center vh-100">
      <Container className="p-0" style={{ maxWidth: '500px', boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
        <p className="text-center mb-4" style={{ fontSize: '4.7rem', fontWeight: 'bold', textAlign: 'center' }}>YOUR CART</p><br /><br /><br />
        {cartedProducts.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          cartedProducts.map((cartGroup, cartGroupIndex) => (
            <div key={cartGroupIndex}>
              <p className="text-center" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>ITEM {cartGroupIndex + 1}</p>
              {cartGroup.products.length === 0 ? (
                <p className="text-center">No products in this cart group.</p>
              ) : (
                cartGroup.products.map((cartedProduct, productIndex) => (
                  <Row key={productIndex} className="justify-content-center">
                    <Col xs={12}>
                      <StyledProductCard>
                        <ProductCardContent className="d-flex flex-column flex-md-row align-items-md-center">
                          <div className="product-image text-center text-md-left mb-3 mb-md-0">
                            {cartedProduct.productImage ? (
                              <img
                                src={cartedProduct.productImage}
                                alt={cartedProduct.productName}
                                style={{ maxWidth: '19em', height: 'auto', padding: '0px' }}
                              />
                            ) : (
                              <p>Image link not retrieved from the database</p>
                            )}
                          </div>
                          <div className="product-details text-center text-md-left" style={{ flex: 1 }}>
                            <p style={{ fontSize: '2.5rem' }}>
                              {cartedProduct.productName}
                            </p>
                            <div style={{ fontSize: '1.6rem' }}><p>Quantity: {cartedProduct.quantity}</p></div>
                            <div style={{ fontSize: '1.6rem' }}><p>Amount: {cartGroup.totalAmount}/-</p></div>
                          </div>
                        </ProductCardContent>
                      </StyledProductCard>
                    </Col>
                  </Row>
                ))
              )}
            </div>
          ))
        )}
      </Container>
      <div style={{ fontSize: '2.5rem', textAlign: 'center', marginTop: '2.5rem' }}>
        <Button onClick={handleOrderClick}>ORDER</Button>      
      </div>
    </div>
  );
}