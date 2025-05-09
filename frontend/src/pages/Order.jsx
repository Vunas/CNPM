import React, { useState, useEffect } from "react";
import { Home } from "@mui/icons-material";
import {
  IconButton,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import productApi from "../api/productapi";
import categoryApi from "../api/categoryApi";
import Loading from "../utils/Loading/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductDetail from "../components/Details/ProductDetail";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [lastClick, setLastClick] = useState("");
  const maxCate = 5;

  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantid");
  const restaurantTableId = searchParams.get("restauranttableid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProduct = await productApi.getProducts();
        const dataCategory = await categoryApi.getCategories();
        const catePages = Math.ceil(dataCategory.length / maxCate);

        handleCatePage(1);
        setTotalPage(catePages);
        setProducts(dataProduct);
        setLoading(false);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCatePage = async (page) => {
    try {
      const dataCate = await categoryApi.getCategories();
      setCurrentPage(page);
      const lastElement = page * maxCate;
      const firstElement = lastElement - maxCate;
      setCategory(dataCate.slice(firstElement, lastElement));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = () => {
    console.log(cart);
    if(cart.length!=0){
      navigate("/payment", {
        state: {
          cart: cart,
          restaurantId: restaurantId,
          restaurantTableId: restaurantTableId,
        },
      });
    }
  };

  const getButtonStyle = (isDisabled) => ({
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? "default" : "pointer",
  });

  const getCateStyle = (isSelect) => ({
    backgroundColor: isSelect ? "gray" : "",
  });

  const handleGetProductByCategory = async (id) => {
    try {
      const dataProduct = await productApi.getProductsByCategory(id);
      setLastClick(id);
      setProducts(dataProduct);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGetProduct = async () => {
    try {
      const dataProduct = await productApi.getProducts();
      setLastClick("");
      setProducts(dataProduct);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item, qty = 1) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.productID === item.productID
    );
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.productID === item.productID
            ? { ...cartItem, quantity: cartItem.quantity + qty }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: qty, id: Date.now() }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 100);
  };

  const addToCartFromDetail = (product, quantity) => {
    if (product) {
      addToCart(product, quantity);
      handleCloseProductDetail();
    }
  };

  function homepageNavigate(){
    navigate(`/homepage?restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`)
  }
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu sản phẩm: {error.message}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans w-screen">
      {/* Menu Section */}
      <div className="w-3/4 overflow-y-auto">
        <div className="flex items-center mb-4 bg-white w-full p-2 shadow-md">
          <button
            className="flex items-center space-x-2 text-blue-600 px-2 py-1 hover:scale-105 transition duration-300"
            onClick={() => homepageNavigate()}
          >
            <div
              style={{ backgroundColor: "rgb(47, 58, 85)" }}
              className="p-1 mx-1 rounded-lg flex items-center justify-center"
            >
              <Home style={{ color: "white", width: "30px", height: "30px" }} />
            </div>
            <span
              className="text-lg font-bold"
              style={{ color: "rgb(47, 58, 85)" }}
            >
              Back to Home
            </span>
          </button>
        </div>

        <div className="py-4 px-6">
          {/* Categories */}
          <div className="flex items-center justify-center space-x-10 mb-6 p-2 h-25">
            <button
              onClick={() => handleCatePage(currentPage - 1)}
              disabled={currentPage === 1}
              style={getButtonStyle(currentPage === 1)}
            >
              <img
                src="src/assets/leftArrow.png"
                alt="Left Arrow"
                className="w-8 h-full hover:scale-105 disabled:opacity-50"
              />
            </button>
            {category.map((categoryItem) => (
              <button
                onClick={() => {
                  categoryItem.categoryId === lastClick
                    ? handleGetProduct()
                    : handleGetProductByCategory(categoryItem.categoryId);
                }}
                key={categoryItem.name}
                className="flex flex-col min-w-30 items-center px-2 py-2 rounded-lg shadow-md transition duration-200 bg-gray-300 hover:scale-105 text-gray-700 font-semibold"
                style={getCateStyle(categoryItem.categoryId === lastClick)}
              >
                <img
                  src={categoryItem.imageUrl}
                  alt={categoryItem.name}
                  className="w-24 h-24 rounded-full"
                />
                <span className="text-lg font-bold">{categoryItem.name}</span>
              </button>
            ))}
            <button
              onClick={() => handleCatePage(currentPage + 1)}
              disabled={currentPage === totalPage}
              style={getButtonStyle(currentPage === totalPage)}
            >
              <img
                src="src/assets/rightArrow.png"
                alt="Right Arrow"
                className="w-8 h-full hover:scale-105 disabled:opacity-50"
              />
            </button>
          </div>

          {/* Menu Items */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t-2 p-8">
            {products.map((item, index) => (
              <div
                key={item.productID}
                className="bg-white rounded-xl shadow-lg flex flex-col items-center w-74 h-65 hover:scale-105 transition duration-200 cursor-pointer"
                onClick={() => handleOpenProductDetail(item)}
              >
                <img
                  src={item.imageUrl || "placeholder_image_url"}
                  alt={item.name}
                  className="w-48 h-48 object-cover rounded-lg"
                />
                <p className="text-lg font-semibold mt-2 border-t-2 w-64 text-left pl-5 pr-5">
                  <span className="text-lg font-bold text-red-600">
                    {index + 1}.{" "}
                  </span>
                  {item.name}
                </p>
                <div className="flex justify-between items-center mt-2 pb-4 pt-4 border-t-2 w-5/6">
                  <p className="text-red-600 text-lg font-bold">
                    Kr {Number(item.price)?.toFixed(2).replace(".", ",")}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition duration-300"
                  >
                    <img
                      src="src/assets/cart.png"
                      alt="Cart"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-1/3 min-w-60 bg-white p-6 border-l border-gray-200 flex flex-col shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600 tracking-wide flex">
            <img
              src="src/assets/cart.png"
              alt="Cart"
              className="w-9 h-9 mr-4"
            />
            Your Cart ({cart.length})
          </h2>
          <button className="bg-blue-400 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 font-bold">
            DINE IN
          </button>
        </div>

        <div className="space-y-5 flex-1 overflow-y-auto">
          {cart.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center border border-gray-300 rounded-lg shadow-md p-2"
            >
              <div className="flex items-center w-full space-x-4">
                <img
                  src={item.imageUrl || "placeholder_image_url"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="w-full">
                  <p className="font-semibold text-lg">
                    <span className="text-red-600 font-bold">
                      {index + 1}.{" "}
                    </span>{" "}
                    {item.name}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-left items-center justify-between p-1 rounded-lg w-28 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 text-gray-600 border-2 border-gray-400 rounded-lg flex items-center justify-center font-bold text-xl hover:bg-gray-300 hover:text-white transition duration-300"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 text-red-600 border-2 border-red-500 rounded-lg flex items-center justify-center font-bold text-xl hover:bg-red-500 hover:text-white transition duration-300"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-bold text-lg ">
                        Kr{" "}
                        {(item.price * item.quantity * 1.1)
                          .toFixed(2)
                          .replace(".", ",")}
                      </p>
                      <p className="text-gray-500 text-xs">
                        (Incl. tax 10% = Kr{" "}
                        {(item.price * item.quantity * 0.1)
                          .toFixed(2)
                          .replace(".", ",")}
                        )
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-gray-900">Total:</p>
            <p className="text-2xl font-bold text-red-600">
              Kr{" "}
              {(
                cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ) * 1.1
              )
                .toFixed(2)
                .replace(".", ",")}
            </p>
          </div>
          <div className="text-m font-bold text-gray-500 text-right">
            (Incl. tax 10% ={" "}
            {(
              cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ) * 0.1
            ).toFixed(2)}
            )
          </div>
          <button
            onClick={handlePaymentClick}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mt-6 text-lg font-bold uppercase transition duration-300"
          >
            PAYMENT
          </button>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <ProductDetail
        open={isProductDetailOpen}
        onClose={handleCloseProductDetail}
        product={selectedProduct}
        onAddToCart={addToCartFromDetail}
      />
    </div>
  );
};

export default Order;