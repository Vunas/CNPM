import { Home } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import productApi from "../api/productapi";
import categoryApi from "../api/categoryApi";
import Loading from "../utils/Loading/Loading";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProduct = await productApi.getProducts();
        const dataCategory = await categoryApi.getCategories();
        const catePages = Math.ceil(dataCategory.length / maxCate);
        
        handleCatePage(1)
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

  const handleCatePage = async (page) =>{
    try {
      const dataCate = await categoryApi.getCategories();
      setCurrentPage(page);
      var LastElement = page * maxCate;
      var firstElement = LastElement - maxCate;

      setCategory(dataCate.slice(firstElement,LastElement));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const getButtonStyle = (isDisabled) => ({ //Làm mờ khi bị tắt
    opacity: isDisabled ? 0.5 : 1,
    cursor: isDisabled ? 'default' : 'pointer',
  });

  const getCateStyle = (isSelect) => ({ // Đổi background khi chọn
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

  const handleGetProduct = async () =>{
    try{
      const dataProduct = await productApi.getProducts();
      setLastClick("");
      setProducts(dataProduct);
    } catch(e){
      setError(e);
    } finally{
      setLoading(false);
    }
  }

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
    <div className="flex h-screen bg-gray-100 font-sans w-screen">
      {/* Menu Section */}
      <div className="w-3/4 overflow-y-auto">
        <div className="flex items-center mb-4 bg-white w-full p-2 shadow-md">
          <button className="flex items-center space-x-2 text-blue-600 px-2 py-1 hover:scale-105 transition duration-300"
            onClick={()=>{handleGetProduct()}}
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
      
        <div className = "py-4 px-6">
          {/* Categories */}
          <div className="flex items-center justify-center space-x-10 mb-6 p-2 h-25">
            <button
              onClick={() => {handleCatePage(currentPage - 1)}}
              disabled = {currentPage === 1}//Tắt mũi tên khi đến cuối trang
              style={getButtonStyle(currentPage === 1)}//Chỉnh style mũi tên khi đến cuối trang
            >
              <img
                  src="src/assets/leftArrow.png"
                  alt="Cart"
                  className="w-8 h-full hover:scale-105 disabled:opacity-50"
                />
            </button>
            {category.map((category) => (
              <button
                onClick={() => {category.categoryId === lastClick ? handleGetProduct() : handleGetProductByCategory(category.categoryId)}}
                key={category.name}
                className="flex flex-col min-w-30 items-center px-2 py-2 rounded-lg shadow-md transition duration-200 bg-gray-300 hover:scale-105 text-gray-700 font-semibold"
                style={getCateStyle(category.categoryId === lastClick)}
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-24 h-24 rounded-full"
                />
                <span className="text-lg font-bold">{category.name}</span>
              </button>
            ))}
              <button
                onClick={() => {handleCatePage(currentPage + 1)}}
                disabled = {currentPage === totalPage}//Tắt mũi tên khi đến cuối trang
                style={getButtonStyle(currentPage === totalPage)}//Chỉnh style mũi tên khi đến cuối trang
              >
                <img
                  src="src/assets/rightArrow.png"
                  alt="Cart"
                  className="w-8 h-full hover:scale-105 disabled:opacity-50"
                />
              </button>
          </div>

          {/* Menu Items */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t-2 p-8">
            {products.map((item, index) => (
              <div
                key={item.productID}
                className="bg-white rounded-xl shadow-lg flex flex-col items-center w-74 h-65 hover:scale-105 transition duration-200"
              >
                {/* Hình ảnh món ăn ở trên cùng */}
                <img
                  src={item.imageUrl || "placeholder_image_url"} // Sử dụng imageUrl từ API
                  alt={item.name}
                  className="w-48 h-48 object-cover rounded-lg"
                />

                {/* Tên món ăn ngay dưới hình ảnh */}
                <p className="text-lg font-semibold mt-2 border-t-2 w-full text-left pl-5 pr-5">
                  <span className="text-lg font-bold text-red-600">{index+1}. </span>
                  {item.name}
                </p>

                {/* Giá và nút giỏ hàng trên cùng một hàng */}
                <div className="flex justify-between items-center mt-2 pb-4 pt-4 border-t-2 w-5/6">
                  <p className="text-red-600 text-lg font-bold">
                    Kr {Number(item.price)?.toFixed(2).replace('.', ',')}
                    {/* Sử dụng optional chaining để tránh lỗi nếu price là undefined */}
                  </p>
                  <button
                    onClick={() => addToCart(item)}
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
        {/* Tiêu đề + nút DINE IN */}
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

        {/* Danh sách sản phẩm trong giỏ hàng */}
        <div className="space-y-5 flex-1 overflow-y-auto">
          {cart.map((item, index) => (
          <div
              key={item.id}
              className="flex justify-between items-center border border-gray-300 rounded-lg shadow-md p-2"
            >
              <div className="flex items-center w-full space-x-4">
                {/* Hình ảnh món ăn */}
                <img
                  src={item.imageUrl || "placeholder_image_url"} // Cố gắng sử dụng imageUrl từ cart nếu có
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="w-full">
                  {/* Tên món ăn */}
                  <p className="font-semibold text-lg">
                    <span className="text-red-600 font-bold">{index + 1}. </span> {item.name}
                  </p>

                  {/* Nút tăng giảm và giá nằm dưới */}
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-left items-center justify-between p-1 rounded-lg w-28 mt-2">
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
                    
                    {/* Giá + thuế nằm kế bên nút tăng giảm */}
                    <div className="text-right">
                      <p className="text-red-600 font-bold text-lg ">
                        Kr {(item.price * item.quantity * 1.1).toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-gray-500 text-xs">
                          (Incl. tax 10% = Kr {" "}
                          {(item.price * item.quantity * 0.1).toFixed(2).replace('.', ',')})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tổng tiền + nút PAYMENT */}
        <div className="mt-6 border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-gray-900">Total:</p>
            <p className="text-2xl font-bold text-red-600">
              Kr{" "}
              {(cart
                .reduce((total, item) => total + item.price * item.quantity, 0)*1.1).toFixed(2).replace('.', ',')}
            </p>
          </div>
          <div className="text-m font-bold text-gray-500 text-right">
            (Incl. tax 10% = {(cart.reduce((total, item) => total + item.price * item.quantity, 0) * 0.1).toFixed(2)} )
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
