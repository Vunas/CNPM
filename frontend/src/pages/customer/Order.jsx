import React, { useState, useEffect } from "react";
import { Home, Restaurant, ShoppingBag } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";
import Loading from "../../utils/Loading/Loading";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProductDetail from "../../components/Details/ProductDetail";
import AOS from "aos";
import "aos/dist/aos.css";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [lastClick, setLastClick] = useState("");
  const [isDineIn, setIsDineIn] = useState(true);
  const maxCate = 5;

  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantid");
  const restaurantTableId = searchParams.get("restauranttableid");

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 400,
      once: true,
      mirror: false,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProduct = await productApi.getProductsActive();
        const dataCategory = await categoryApi.getCategories();
        const catePages = Math.ceil(dataCategory.length / maxCate);

        handleCatePage(1);
        setTotalPage(catePages);
        setProducts(dataProduct);
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
      // setLoading(true);
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
    if (
      restaurantId === null ||
      restaurantId === "null" ||
      restaurantTableId === null ||
      restaurantTableId === "null"
    ) {
      alert("Please scan QR from employee before proceeding to payment.");
      return;
    }
    console.log(cart);
    if (cart.length !== 0) {
      // Use !== for comparison
      navigate("/payment", {
        state: {
          cart: cart,
          restaurantId: restaurantId,
          restaurantTableId: restaurantTableId,
          isDineIn: isDineIn,
        },
      });
    } else {
      alert(
        "Your cart is empty. Please add items before proceeding to payment."
      );
    }
  };

  const getButtonStyle = (isDisabled) => ({
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? "not-allowed" : "pointer",
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
      // setLoading(true);
      const dataProduct = await productApi.getProductsActive();
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
      (cartItem) => cartItem.productId === item.productId
    );
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.productId === item.productId
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
    }, 300);
  };

  const addToCartFromDetail = (product, quantity) => {
    if (product) {
      addToCart(product, quantity);
      handleCloseProductDetail();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl mt-10">
        Lỗi khi tải dữ liệu sản phẩm: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 font-sans w-screen overflow-hidden">
      {/* Overlay for mobile cart */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Floating Cart Button for Small Screens */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center gap-2 relative"
          title="Toggle Cart"
        >
          <ShoppingCartIcon style={{ width: "28px", height: "28px" }} />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Menu Section */}
      <div className="w-full lg:w-3/4 overflow-y-auto p-4">
        <div className="mb-4" data-aos="fade-right">
          <Link
            to={`/home?restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`}
            className="inline-flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-4 sm:py-2 transition duration-300"
          >
            <div
              className="p-1.5 sm:p-2 rounded-lg flex items-center justify-center shadow-sm hover:scale-105"
              style={{ backgroundColor: "rgb(47, 58, 85)" }}
            >
              <Home
                style={{ color: "white", width: "20px", height: "20px" }}
                className="sm:w-7 sm:h-7"
              />
            </div>
            <span className="text-sm sm:text-lg font-bold">Back to Home</span>
          </Link>
        </div>
        <div className="py-4 px-2 sm:px-6 ">
          {/* Categories */}
          <div className="flex items-center justify-start sm:justify-center space-x-2 sm:space-x-5 mb-6 p-2 h-auto sm:h-28 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleCatePage(currentPage - 1)}
              disabled={currentPage === 1}
              style={getButtonStyle(currentPage === 1)}
              className="p-2 rounded-full transition duration-300 flex-shrink-0 "
              data-aos="fade-right"
            >
              <img
                src="/assets/leftArrow.png"
                alt="Left Arrow"
                className="w-4 h-16 sm:h-20 object-contain"
              />
            </button>
            {category.map((categoryItem, idx) => (
              <button
                onClick={() => {
                  categoryItem.categoryId === lastClick
                    ? handleGetProduct()
                    : handleGetProductByCategory(categoryItem.categoryId);
                }}
                key={categoryItem.categoryId}
                className={`w-20 h-20 min-w-20 min-h-20 sm:w-28 sm:h-28 flex flex-col items-center justify-center p-1 rounded-2xl shadow-md transition duration-300 transform hover:scale-105 text-gray-800 font-semibold text-center ${
                  categoryItem.categoryId === lastClick
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                data-aos="fade-up"
                data-aos-delay={100 * idx}
              >
                <img
                  src={
                    categoryItem.imageUrl ||
                    "https://via.placeholder.com/80x60?text=Category"
                  }
                  alt={categoryItem.name}
                  className="w-auto h-12 sm:h-20 object-cover rounded-full mb-1 border-2 border-white shadow-sm"
                />
                <span className="text-base font-bold truncate">
                  {categoryItem.name}
                </span>
              </button>
            ))}
            <button
              onClick={() => handleCatePage(currentPage + 1)}
              disabled={currentPage === totalPage}
              style={getButtonStyle(currentPage === totalPage)}
              className="p-2 rounded-full transition duration-300 flex-shrink-0 "
              data-aos="fade-left"
            >
              <img
                src="/assets/rightArrow.png"
                alt="Right Arrow"
                className="w-4 h-16 sm:h-20 object-contain"
              />
            </button>
          </div>

          {/* Menu Items */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 border-t-2 border-gray-200 p-4 sm:p-8">
            {products.map((item, index) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl shadow-lg flex flex-col items-center overflow-hidden h-auto min-h-64 hover:scale-102 transition duration-300 cursor-pointer transform hover:shadow-xl"
                onClick={() => handleOpenProductDetail(item)}
                // data-aos="fade-up"
                // data-aos-delay={index}
              >
                <img
                  src={
                    item.imageUrl ||
                    "https://via.placeholder.com/192x192?text=No+Image"
                  }
                  alt={item.name}
                  className=" h-48 object-cover rounded-t-xl"
                />
                <div className="p-4 w-full flex flex-col justify-between flex-grow">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    <span className="text-red-600 font-bold mr-1">
                      {index + 1}.
                    </span>
                    {item.name}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200">
                    <p className="text-red-600 text-xl font-bold">
                      Kr {Number(item.price)?.toFixed(2).replace(".", ",")}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering product detail
                        addToCart(item);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition duration-300 transform hover:scale-105 shadow-md"
                      title="Add to Cart"
                    >
                      <ShoppingCartIcon
                        style={{
                          color: "white",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div
        className={`fixed inset-y-0 right-0 xs:w-3/5 sm:w-2/3 md:w-1/2 lg:static lg:w-1/3 min-w-[320px] bg-white p-6 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
            ${
              isCartOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            }
        `}
      >
        {/* Close button inside the cart for mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
            title="Close Cart"
          >
            <CloseIcon />
          </button>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200"
          data-aos="fade-down"
        >
          <h2 className="text-2xl font-bold text-red-600 tracking-wide flex items-center mb-4 sm:mb-0">
            <ShoppingCartIcon
              className="mr-3 text-red-600"
              style={{ width: "36px", height: "36px" }}
            />
            Your Cart ({cart.length})
          </h2>
          <button
            onClick={() => setIsDineIn(!isDineIn)}
            className={`px-6 py-2 rounded-full transition duration-300 font-bold flex items-center gap-2 shadow-md ${
              isDineIn
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isDineIn ? (
              <Restaurant fontSize="small" />
            ) : (
              <ShoppingBag fontSize="small" />
            )}
            <span className="hidden sm:inline">
              {isDineIn ? "DINE IN" : "TAKE AWAY"}
            </span>
            <span className="inline sm:hidden">
              {isDineIn ? "DINE IN" : "TAKE AWAY"}
            </span>
          </button>
        </div>
        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-10" data-aos="zoom-in">
              <p className="text-lg">
                Your cart is empty. Add some delicious items!
              </p>
              <img
                src="/assets/empty_cart.jpg"
                alt="Empty Cart"
                className="w-72 h-72 mx-auto mt-4 opacity-70"
              />
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-3 transition duration-300 hover:shadow-md"
                data-aos="fade-right"
                data-aos-delay={index}
              >
                <div className="flex items-center w-full space-x-3">
                  <img
                    src={
                      item.imageUrl ||
                      "https://via.placeholder.com/80x80?text=Item"
                    }
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between w-full">
                    <p className="font-semibold text-lg text-gray-800">
                      <span className="text-red-600 font-bold mr-1">
                        {index + 1}.
                      </span>
                      {item.name}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 p-1 ">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 text-gray-700 border border-gray-400 rounded-xl flex items-center justify-center font-bold text-lg hover:bg-gray-300 hover:text-white transition duration-200"
                        >
                          <RemoveIcon fontSize="small" />
                        </button>
                        <span className="text-lg font-bold text-gray-800 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 text-red-600 border border-red-500 rounded-xl flex items-center justify-center font-bold text-lg hover:bg-red-500 hover:text-white transition duration-200"
                        >
                          <AddIcon fontSize="small" />
                        </button>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <p className="text-red-600 font-bold text-xl ">
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
            ))
          )}
        </div>
        <div className="mt-6 border-t border-gray-300 pt-4" data-aos="fade-up">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-bold text-gray-900">Total:</p>
            <p className="text-3xl font-extrabold text-red-600">
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
          <div className="text-sm font-medium text-gray-600 text-right">
            (Incl. tax 10% ={" "}
            {(
              cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ) * 0.1
            )
              .toFixed(2)
              .replace(".", ",")}
            )
          </div>
          <button
            onClick={handlePaymentClick}
            className={`w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg mt-6 text-xl font-bold uppercase transition duration-300 transform hover:scale-100 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={cart.length === 0}
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
