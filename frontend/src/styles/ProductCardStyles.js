import styled from "styled-components";

export const StyledProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  padding-bottom: 30px;
  margin-left: 10%;
  margin-right: 5%;
  margin-bottom: 30px;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;

    .product-image {
      margin-bottom: 10px; /* Add some space between image and details */
    }
  }
`;

export const ProductCardContent = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: center;

  h2 {
    margin-bottom: 10px;
  }

  .card-subtitle {
    font-weight: bold;
    margin-top: 10px;
    font-size: 1.8rem;
    margin-bottom: 5px;
  }

  .card-text {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }

  .product-image img {
    width: 250px;
    height: 250px;
    padding: 1rem
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    flex-direction: column; /* Change to column for mobile screens */
    
    .product-image {
      order: -1; /* Change the order to display image on top */
    }
  }
`;

export const DetailsButton = styled.button`
  text-decoration: none;
  max-width: auto;
  background-color: rgb(98 84 243);
  color: rgb(255 255 255);
  padding: 1.5rem 2.5rem;
  border: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  &:hover,
  &:active {
    box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: scale(0.96);
  }

  a {
    text-decoration: none;
    color: rgb(255 255 255);
    font-size: 1.8rem;
  }
`;

export const AddToCartButton = styled(DetailsButton)`
  background-color: rgb(147, 61, 212, 0.9);
  border-radius: 5px;
`;

