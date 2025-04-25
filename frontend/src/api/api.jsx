// api.js

const BASE_URL = "http://localhost:3000"; // URL cơ bản của API

// Các endpoint chung
const API_ENDPOINTS = {
  // Endpoints cho users
  getUsers: `${BASE_URL}/users`,
  createUser: `${BASE_URL}/users/create`,
  updateUser: `${BASE_URL}/users/update`,
  deleteUser: `${BASE_URL}/users/delete`,

  // Endpoints cho product
  getProduct: `${BASE_URL}/product`,
  createProduct: `${BASE_URL}/product/create`,
  updateProduct: `${BASE_URL}/product/update`,
  deleteProduct: `${BASE_URL}/product/delete`,

  // Endpoints cho category
  getCategory: `${BASE_URL}/category`,
  createCategory: `${BASE_URL}/category/create`,
  updateCategory: `${BASE_URL}/category/update`,
  deleteCategory: `${BASE_URL}/category/delete`,

  // Endpoints cho accounts
  getAccounts: `${BASE_URL}/accounts`,
  createAccount: `${BASE_URL}/accounts/create`,
  updateAccount: `${BASE_URL}/accounts/update`,
  deleteAccount: `${BASE_URL}/accounts/delete`,

  // Endpoints cho restaurants
  getRestaurants: `${BASE_URL}/restaurants`,
  createRestaurant: `${BASE_URL}/restaurants/create`,
  updateRestaurant: `${BASE_URL}/restaurants/update`,
  deleteRestaurant: `${BASE_URL}/restaurants/delete`,
};

// Hàm fetch GET
export const fetchGet = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("GET error:", error);
    throw error;
  }
};

// Hàm fetch POST
export const fetchPost = async (endpoint, body) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("POST error:", error);
    throw error;
  }
};

export { BASE_URL, API_ENDPOINTS };
