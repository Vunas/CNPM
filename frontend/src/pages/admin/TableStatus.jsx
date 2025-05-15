import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import restaurantTableApi from "../../api/restaurantTableApi";
import restaurantApi from "../../api/restaurantApi";
import orderApi from "../../api/orderApi";
import Loading from "../../utils/Loading/Loading";
import {
  Lock,
  CheckCircle,
  Schedule,
  Bookmark,
  RestaurantMenu,
  Home,
  Phone,
  NearMe,
  KeyboardArrowLeft,
  Nat,
  Receipt,
  SentimentDissatisfied,
  ShoppingCart,
  TakeoutDining,
  HourglassBottom,
  CheckCircleOutline,
  CancelOutlined,
  DoneAll,
} from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Paper,
  Box,
  Typography,
} from "@mui/material";

const getOrderStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Processing":
      return "text-blue-500";
    case "Delivering":
      return "text-purple-500";
    case "Finished":
      return "text-green-500";
    case "Cancelled":
      return "text-red-500";
    default:
      return "text-gray-600";
  }
};

// Hàm để lấy icon dựa trên orderStatus
const getOrderStatusIcon = (status) => {
  switch (status) {
    case "Pending":
      return <HourglassBottom className="mr-1 text-yellow-500" />;
    case "Processing":
      return <Schedule className="mr-1 text-blue-500" />;
    case "Delivering":
      return <TakeoutDining className="mr-1 text-purple-500" />;
    case "Finished":
      return <DoneAll className="mr-1 text-green-500" />;
    case "Cancelled":
      return <CancelOutlined className="mr-1 text-red-500" />;
    default:
      return null;
  }
};

// Hàm để lấy màu sắc dựa trên orderType
const getOrderTypeColor = (type) => {
  switch (type) {
    case "DineIn":
      return "text-teal-500";
    case "TakeAway":
      return "text-orange-500";
    default:
      return "text-gray-600";
  }
};

// Hàm để lấy icon dựa trên orderType
const getOrderTypeIcon = (type) => {
  switch (type) {
    case "DineIn":
      return <RestaurantMenu className="mr-1 text-teal-500" />;
    case "TakeAway":
      return <ShoppingCart className="mr-1 text-orange-500" />;
    default:
      return null;
  }
};

const Table = ({ table, status, onTableClick }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "bg-green-500"; // Active
      case 2:
        return "bg-red-500"; // Lock
      case 3:
        return "bg-yellow-500"; // In Use
      case 4:
        return "bg-blue-500"; // Reserved
      default:
        return "";
    }
  };

  const getStatusImage = (status) => {
    switch (status) {
      case 1:
        return "../../src/assets/img/active-table.png";
      case 2:
        return "../../src/assets/img/lock-table.png";
      case 3:
        return "../../src/assets/img/using-table.png";
      case 4:
        return "../../src/assets/img/reserved-table.png";
      default:
        return "../../src/assets/img/dining-table.png";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Active";
      case 2:
        return "Lock";
      case 3:
        return "In Use";
      case 4:
        return "Reserved";
      default:
        return "";
    }
  };

  return (
    <div
      className={`w-32 h-36 flex flex-col items-center p-3 rounded-2xl transition transform duration-300 cursor-pointer hover:scale-105 shadow-md hover:shadow-lg ${getStatusClass(
        status
      )}`}
      data-table={table.tableId}
      data-status={getStatusText(status).toLowerCase()}
      onClick={(event) =>
        onTableClick(event, table.tableId, getStatusText(status).toLowerCase())
      }
    >
      <img
        src={getStatusImage(status)}
        alt={`Table ${table.tableNumber}`}
        className="w-[60px] h-[60px]"
      />
      <span className="font-bold text-lg">Table {table.tableNumber}</span>
    </div>
  );
};

const Legend = () => (
  <div
    className="mt-5 flex justify-center gap-5"
    data-aos="fade-up"
    data-aos-duration="500"
  >
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-md bg-green-500"></div>
      <span>Active</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-md bg-red-500"></div>
      <span>Lock</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-md bg-yellow-500"></div>
      <span>In Use</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-md bg-blue-500"></div>
      <span>Reserved</span>
    </div>
  </div>
);

const OrderItem = ({ order, onOrderClick }) => (
  <Paper
    className="p-4 hover:bg-gray-100 transition cursor-pointer border flex flex-col"
    onClick={() => onOrderClick(order)}
  >
    <Typography variant="subtitle1" className="font-semibold text-gray-800">
      ID: {order.orderId}
    </Typography>
    <Box className="flex items-center">
      {getOrderStatusIcon(order.orderStatus)}
      <Typography className={getOrderStatusColor(order.orderStatus)}>
        Status: {order.orderStatus}
      </Typography>
    </Box>
    <Typography>
      Total Price:{" "}
      {order.totalPrice ? parseFloat(order.totalPrice).toLocaleString() : "?"} đ
    </Typography>
    <Box className="flex items-center">
      {getOrderTypeIcon(order.orderType)}
      <Typography className={getOrderTypeColor(order.orderType)}>
        Order Type: {order.orderType || "Unknown"}
      </Typography>
    </Box>
  </Paper>
);

const OrderDetailDialog = ({ open, onClose, order, onConfirm, onCancel }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="order-detail-dialog">
      <DialogTitle id="order-detail-dialog">
        Order Details #{order.orderId}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            Order Date: {new Date(order.orderDate).toLocaleString()}
          </Typography>
          <Typography>
            Total Price:{" "}
            {order.totalPrice
              ? parseFloat(order.totalPrice).toLocaleString()
              : "?"}{" "}
            đ
          </Typography>
          <Box className="flex items-center">
            {getOrderTypeIcon(order.orderType)}
            <Typography className={getOrderTypeColor(order.orderType)}>
              Order Type: {order.orderType || "Unknown"}
            </Typography>
          </Box>
          <Box className="flex items-center">
            {getOrderStatusIcon(order.orderStatus)}
            <Typography className={getOrderStatusColor(order.orderStatus)}>
              Current Status: {order.orderStatus}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onCancel} color="error">
          Cancel Order
        </Button>
        <Button onClick={onConfirm} color="success">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const InfoPanel = ({
  selectedTable,
  onStatusChange,
  allOrders,
  onOrderClick,
}) => {
  const [ordersForTable, setOrdersForTable] = useState([]);

  useEffect(() => {
    if (!selectedTable) {
      setOrdersForTable(allOrders);
    } else {
      const filteredOrders = allOrders.filter(
        (order) =>
          order.tableId === selectedTable.tableId &&
          order.orderStatus !== "Cancelled" &&
          order.orderStatus !== "Finished"
      );
      setOrdersForTable(filteredOrders);
    }
  }, [selectedTable, allOrders]);

  if (!selectedTable) {
    return (
      <div className="relative top-0 right-0 h-full w-full md:w-80 bg-gray-100 rounded-lg p-6 shadow-xl transition-all ease-in-out duration-300 z-50 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 tracking-tight">
          <RestaurantMenu className="mr-2 text-gray-700" />
          All orders
        </h2>
        <div className="space-y-2">
          {ordersForTable.map((order) => (
            <OrderItem
              key={order.orderId}
              order={order}
              onOrderClick={onOrderClick}
            />
          ))}
          {ordersForTable.length === 0 && (
            <p className="text-gray-500 italic text-center">
              No orders available
            </p>
          )}
        </div>
      </div>
    );
  }

  const { tableId, tableNumber, status, restaurant } = selectedTable;

  const handleStatusClick = (newStatus) => {
    onStatusChange(tableId, newStatus);
  };

  const getButtonClass = (buttonStatus) => {
    switch (buttonStatus) {
      case "active":
        return "bg-green-500";
      case "lock":
        return "bg-red-500";
      case "in-use":
        return "bg-yellow-500";
      case "reserved":
        return "bg-blue-500";
      default:
        return "";
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 1:
        return "Active";
      case 2:
        return "Lock";
      case 3:
        return "In Use";
      case 4:
        return "Reserved";
      default:
        return "";
    }
  };

  return (
    <div className="relative top-0 right-0 h-full w-full md:w-80 bg-gray-100 rounded-lg p-6 shadow-xl transition-all ease-in-out duration-300 z-50 overflow-y-auto">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 tracking-tight">
        <RestaurantMenu className="mr-2 text-gray-700" />
        Table {tableNumber}
      </h2>
      <p className="text-base font-medium text-gray-700 mb-5 flex items-center">
        <span className="text-gray-900">{formatStatus(status)}</span>
      </p>
      <div className="flex flex-col gap-3 mb-4">
        <button
          className={`w-full flex items-center py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${getButtonClass(
            "active"
          )}`}
          onClick={() => handleStatusClick(1)}
        >
          <CheckCircle className="mr-2" />
          Active
        </button>
        <button
          className={`w-full flex items-center py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${getButtonClass(
            "lock"
          )}`}
          onClick={() => handleStatusClick(2)}
        >
          <Lock className="mr-2" />
          Lock
        </button>
        <button
          className={`w-full flex items-center py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${getButtonClass(
            "in-use"
          )}`}
          onClick={() => handleStatusClick(3)}
        >
          <Schedule className="mr-2" />
          In Use
        </button>
        <button
          className={`w-full flex items-center py-2.5 px-4 rounded-lg text-white font-medium text-sm transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${getButtonClass(
            "reserved"
          )}`}
          onClick={() => handleStatusClick(4)}
        >
          <Bookmark className="mr-2" />
          Reserved
        </button>
      </div>

      <p className="text-base font-medium text-gray-700 mt-6 mb-3 flex items-center">
        <Home className="mr-2 text-gray-700" />
        Restaurant Information
      </p>
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-sm text-gray-700">
        <div className="flex items-center mb-2 gap-2">
          <span className="font-medium">ID:</span>{" "}
          {restaurant?.restaurantId || "N/A"}
        </div>
        <div className="flex items-center mb-2 gap-2">
          <Nat className="mr-2 text-gray-600" />
          <span className="font-medium">Name: </span>{" "}
          {restaurant?.name || "N/A"}
        </div>
        <div className="flex items-center mb-2 gap-2">
          <Home className="mr-2 text-gray-600" />
          <span className="font-medium">Address: </span>{" "}
          {restaurant?.address || "N/A"}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="mr-2 text-gray-600" />
          <span className="font-medium">Phone:</span>{" "}
          {restaurant?.phone || "N/A"}
        </div>
      </div>

      <h3 className="font-semibold mt-4 mb-2 text-gray-700 flex items-center gap-2">
        <Receipt className="text-gray-600" /> Orders at this table:
      </h3>

      <div className="space-y-2">
        {ordersForTable.map((order) => (
          <OrderItem
            key={order.orderId}
            order={order}
            onOrderClick={onOrderClick}
          />
        ))}
        {ordersForTable.length === 0 && (
          <p className="text-gray-500 italic text-center flex items-center gap-2">
            <SentimentDissatisfied className="text-gray-400" /> No orders at
            this table
          </p>
        )}
      </div>
    </div>
  );
};

const RestaurantFilter = ({ restaurants, onRestaurantSelect }) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

  const handleRestaurantChange = (event) => {
    const restaurantId = event.target.value;
    setSelectedRestaurantId(restaurantId);
    onRestaurantSelect(restaurantId);
  };

  return (
    <div className="mb-4" data-aos="fade-down" data-aos-duration="500">
      <label
        htmlFor="restaurant"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Filter by Restaurant:
      </label>
      <select
        id="restaurant"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={selectedRestaurantId}
        onChange={handleRestaurantChange}
      >
        <option value="">All Restaurants</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.restaurantId} value={restaurant.restaurantId}>
            {restaurant.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const TableStatus = () => {
  const [tables, setTables] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [filteredTables, setFilteredTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrderForDialog, setSelectedOrderForDialog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      const dataOrder = await orderApi.getOrders();
      const filteredDataOrders = dataOrder.filter(
        (order) =>
          order.orderStatus !== "Cancelled" && order.orderStatus !== "Finished"
      );
      setAllOrders(filteredDataOrders);
    } catch (e) {
      console.error("Error loading orders:", e.message);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const allTables = await restaurantTableApi.getTables();
        const fetchedRestaurants = await restaurantApi.getRestaurants();
        setTables(allTables);
        setRestaurants(fetchedRestaurants);
        loadOrders();

        if (fetchedRestaurants.length > 0) {
          setSelectedRestaurantId(fetchedRestaurants[0].id);
        }
      } catch (error) {
        setError("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedRestaurantId) {
      const filtered = tables.filter(
        (table) => table.restaurantId === selectedRestaurantId
      );
      setFilteredTables(filtered);
    } else {
      setFilteredTables(tables);
    }
  }, [tables, selectedRestaurantId]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleRestaurantSelect = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
  };

  const handleTableClick = (event, tableId, currentStatus) => {
    event.stopPropagation();
    const clickedTable = filteredTables.find(
      (table) => table.tableId === tableId
    );
    if (selectedTable && tableId === selectedTable.tableId) {
      setSelectedTable(null);
      return;
    }
    if (clickedTable) {
      setSelectedTable({
        tableId: clickedTable.tableId,
        tableNumber: clickedTable.tableNumber,
        status: currentStatus,
        restaurant: clickedTable.restaurant,
      });
    }
  };

  const handleCloseInfoPanel = () => {
    if (selectedTable) setSelectedTable(null);
  };

  const handleStatusChange = async (restaurantTableId, newStatus) => {
    if (!confirm("Are you sure you want to perform this action?")) return;
    try {
      await restaurantTableApi.updateTableStatus(restaurantTableId, newStatus);

      const updatedTables = tables.map((table) =>
        table.tableId === restaurantTableId
          ? { ...table, status: newStatus }
          : table
      );
      setTables(updatedTables);

      const updatedSelectedTable = updatedTables.find(
        (table) => table.tableId === restaurantTableId
      );
      if (updatedSelectedTable) {
        setSelectedTable({
          tableId: updatedSelectedTable.tableId,
          tableNumber: updatedSelectedTable.tableNumber,
          status: getStatusText(updatedSelectedTable.status).toLowerCase(),
        });
      }
    } catch (error) {
      console.error("Error updating table status:", error);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Active";
      case 2:
        return "Lock";
      case 3:
        return "In Use";
      case 4:
        return "Reserved";
      default:
        return "";
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrderForDialog(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrderForDialog(null);
  };

  const handleConfirmOrder = async () => {
    if (!confirm("This change cannot be undone. Do you wish to continue?"))
      return;
    if (selectedOrderForDialog) {
      try {
        await orderApi.updateOrder(selectedOrderForDialog.orderId, {
          orderStatus: "Processing",
        });
        alert(`Order #${selectedOrderForDialog.orderId} has been confirmed!`);
        loadOrders();
        handleCloseDialog();
      } catch (error) {
        console.error("Error confirming order:", error);
        alert("Error confirming order!");
      }
    }
  };

  const handleCancelOrder = async () => {
    if (!confirm("This change cannot be undone. Do you wish to continue?"))
      return;
    if (selectedOrderForDialog) {
      try {
        await orderApi.updateOrder(selectedOrderForDialog.orderId, {
          orderStatus: "Cancelled",
        });

        alert(`Order #${selectedOrderForDialog.orderId} has been cancelled!`);
        loadOrders();
        handleCloseDialog();
      } catch (error) {
        console.error("Error cancelling order:", error);
        alert("Error cancelling order!");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) {
    return <div>Error loading table data: {error.message}</div>;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4">
      <div className="h-screen w-full mx-auto flex flex-col md:flex-row gap-6">
        {" "}
        <div
          className=" flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg overflow-scroll"
          onClick={handleCloseInfoPanel}
        >
          <div className="w-full flex flex-col md:flex-row items-center justify-between mb-6">
            <h1
              className="text-3xl font-bold text-gray-800"
              data-aos="fade-right"
            >
              Table Status Management
            </h1>
            <Legend />
          </div>
          <RestaurantFilter
            restaurants={restaurants}
            onRestaurantSelect={handleRestaurantSelect}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full overflow-scroll">
            {filteredTables.map((table) => (
              <Table
                key={table.tableId}
                table={table}
                status={table.status}
                onTableClick={handleTableClick}
              />
            ))}
          </div>
        </div>
        <InfoPanel
          selectedTable={selectedTable}
          onStatusChange={handleStatusChange}
          allOrders={allOrders}
          onOrderClick={handleOrderClick}
        />
        <OrderDetailDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          order={selectedOrderForDialog}
          onConfirm={handleConfirmOrder}
          onCancel={handleCancelOrder}
        />
      </div>
    </div>
  );
};

export default TableStatus;
