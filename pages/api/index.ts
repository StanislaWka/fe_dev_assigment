import { gql } from '@apollo/client';

const GET_PRODUCT = (id: string) => gql`
  query GetProduct {
    productById(productId: ${id}) {
      id
      name
      data
      variantRewards
    }  
  }
`;

const ADD_TO_CART = gql`
  mutation ($variantId: String!) {
    addToCart(variantId: $variantId)
  }
`;

const api = { GET_PRODUCT, ADD_TO_CART };

export default api;
