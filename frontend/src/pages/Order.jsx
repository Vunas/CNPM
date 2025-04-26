import { Home } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import productApi from "../api/productapi";
import categoryApi from "../api/categoryApi";
import Loading from "../utils/Loading/Loading";

const Order = () => {
  const [cart, setCart] = useState([
    // { id: 1, name: "Grilled squid satay", quantity: 1, price: 123.0 },
    // { id: 2, name: "Grilled squid satay", quantity: 1, price: 123.0 },
    // { id: 3, name: "Grilled squid satay", quantity: 1, price: 123.0 },
    // { id: 4, name: "Bổ ăn kèm: Rau thơm", quantity: 1, price: 5.5 },
    // { id: 5, name: "Bổ ăn kèm: Sốt cay, Muối ớt", quantity: 1, price: 2.0 },
    // { id: 6, name: "Grilled squid satay", quantity: 1, price: 123.0 },
  ]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const categories = [
  //   { name: "Cupcake", image: "src/assets/cupcake.jpg" },
  //   { name: "Sea food", image: "src/assets/seafood.jpg" },
  //   { name: "Juice", image: "src/assets/orange_juice.jpg" },
  //   { name: "Coca", image: "src/assets/coca.jpg" },
  //   { name: "Orange juice", image: "src/assets/orange_juice.jpg" },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProduct = await productApi.getProducts();
        const dataCategory = await categoryApi.getCategories();
        setProducts(dataProduct);
        setCategory(dataCategory);
        setLoading(false);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGetProductByCategory = async (id) => {
    try {
      const dataProduct = await productApi.getProductsByCategory(id);
      setProducts(dataProduct);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1, id: cart.length + 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) return null; // Mark for removal
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item !== null)
    ); // Remove items marked as null
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.1;
  const totalWithTax = total + tax;

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Lỗi khi tải dữ liệu sản phẩm: {error.message}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Menu Section */}
      <div className="w-3/4 py-2 px-6 overflow-y-auto">
        <div className="flex items-center mb-4">
          <button className="flex items-center space-x- bg-gray-100 text-blue-600 px-2 py-1 hover:bg-gray-400 transition duration-300">
            <div
              style={{ backgroundColor: "rgb(47, 58, 85)" }}
              className="p-1 mx-1 rounded-md flex items-center justify-center"
            >
              <Home style={{ color: "white", width: "18px", height: "18px" }} />
            </div>
            <span
              className="text-lg font-semibold"
              style={{ color: "rgb(47, 58, 85)" }}
            >
              Back to Home
            </span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex space-x-4 mb-6 p-2 h-25">
          {category.map((category) => (
            <button
              onClick={() => {handleGetProductByCategory(category.categoryId)}}
              key={category.name}
              className="flex flex-col min-w-20 items-center px-2 py-1 rounded-lg shadow-md transition duration-300 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-12 h-12 rounded-full"
              />
              <span className="text-lg">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.productID}
              className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center w-74 h-65"
            >
              {/* Hình ảnh món ăn ở trên cùng */}
              <img
                src={item.imageUrl || "placeholder_image_url"} // Sử dụng imageUrl từ API
                alt={item.name}
                className="w-48 h-48 object-cover rounded-lg"
              />

              {/* Tên món ăn ngay dưới hình ảnh */}
              <p className="text-lg font-semibold text-center mt-2">
                {item.name}
              </p>

              {/* Giá và nút giỏ hàng trên cùng một hàng */}
              <div className="w-full flex justify-between items-center mt-2 px-4">
                <p className="text-gray-800 text-lg font-bold">
                  Kr {Number(item.price)?.toFixed(2)}
                  {/* Sử dụng optional chaining để tránh lỗi nếu price là undefined */}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18l-2 13H5L3 3zm5 0v2m4-2v2m4-2v2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-1/4 min-w-60 bg-white p-6 border-l border-gray-200 flex flex-col shadow-lg">
        {/* Tiêu đề + nút DINE IN */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600 tracking-wide">
            Your Cart ({cart.length})
          </h2>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            DINE IN
          </button>
        </div>

        {/* Danh sách sản phẩm trong giỏ hàng */}
        <div className="space-y-6 flex-1 overflow-y-auto">
          {cart.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-300 pb-4"
            >
              <div className="flex items-center space-x-4">
                {/* Hình ảnh món ăn */}
                <img
                  src={item.imageUrl || "placeholder_image_url"} // Cố gắng sử dụng imageUrl từ cart nếu có
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg shadow-md"
                />
                <div>
                  {/* Tên món ăn */}
                  <p className="font-semibold text-lg">
                    {index + 1}. {item.name}
                  </p>

                  {/* Nút tăng giảm nằm dưới */}
                  <div className="flex items-center justify-between p-2 rounded-lg w-28 mt-2 shadow-md">
                    {/* Nút giảm số lượng */}
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 text-gray-600 border-2 border-gray-400 rounded-lg flex items-center justify-center font-bold text-xl hover:bg-gray-300 hover:text-white transition duration-300"
                    >
                      -
                    </button>

                    {/* Số lượng sản phẩm */}
                    <span className="text-lg font-bold text-gray-800">
                      {item.quantity}
                    </span>

                    {/* Nút tăng số lượng */}
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 text-red-600 border-2 border-red-500 rounded-lg flex items-center justify-center font-bold text-xl hover:bg-red-500 hover:text-white transition duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Giá + thuế nằm trên cùng */}
              <div className="text-right">
                <p className="text-gray-700 font-medium text-md">
                  Kr {(item.price * item.quantity).toFixed(2)}
                </p>
                {item.price === 123.0 && (
                  <p className="text-gray-500 text-sm">
                    (Incl. tax 10% = Kr{" "}
                    {(item.price * item.quantity * 0.1).toFixed(2)})
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tổng tiền + nút PAYMENT */}
        <div className="mt-6 border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-gray-900">Total:</p>
            <p className="text-xl font-bold text-red-600">
              Kr{" "}
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mt-6 text-lg font-bold uppercase transition duration-300">
            PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
