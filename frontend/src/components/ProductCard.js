import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StyledProductCard, ProductCardContent, DetailsButton } from '../styles/ProductCardStyles';

const ProductCard = ({ product }) => {
  const { name, description, price, image, category, company, _id } = product;

  return (
    <Row className="mt-3 mb-3">
      <Col xs={12}>
        <StyledProductCard>
        <ProductCardContent>
          <div className="product-image">
            <img src={image} alt={name} />
          </div>
          <div className="product-details">
            <h2>{name}</h2>
            {/* <div className="card-subtitle">Description:</div>
            <div className="card-text">{description}</div> */}
            <div className="card-subtitle">Category:</div>
            <div className="card-text" style={{ fontStyle: 'italic' }}>{category}</div>
            <div className="card-subtitle">Company:</div>
            <div className="card-text" style={{ textTransform: 'uppercase' }}>{company}</div>
            <div className="card-subtitle">Price:</div>
            <div className="card-text">{price}</div>
            <br />
            <DetailsButton as={Link} to={`/products/${_id}`}>
              Details
            </DetailsButton>
          </div>
        </ProductCardContent>
        </StyledProductCard>
      </Col>
    </Row>
  );
};

export default ProductCard;
