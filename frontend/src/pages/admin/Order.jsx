import { useState, useEffect, useCallback } from "react";
import orderApi from "../../api/orderApi";
import Loading from "../../utils/Loading/Loading";
import OrderTable from "../../components/admin/Tables/OrderTable";
import { Alert, Snackbar } from "@mui/material";
import restaurantTableApi from "../../api/restaurantTableApi";
import restaurantApi from "../../api/restaurantApi";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });

  const fetchData = async () => {
    try {
      const dataOrders = await orderApi.getOrders();
      setOrders(Array.isArray(dataOrders) ? dataOrders : []);
      const dataTables = await restaurantTableApi.getTables();
      setTables(Array.isArray(dataTables) ? dataTables : []);
      const dataRestaurants = await restaurantApi.getRestaurants();
      setRestaurants(Array.isArray(dataRestaurants) ? dataRestaurants : []);
    } catch (e) {
      console.error("Error fetching data:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      setLoading(true);
      await orderApi.deleteOrder(id);
      setSnackbar({
        open: true,
        message: "Deleted order successfully!",
        severity: "success",
      });
      await fetchData();
    } catch (e) {
      console.error("Error deleting order:", e);
      setError(e);
      setSnackbar({
        open: true,
        message: `Error deleting order: ${
          e.message || "An unexpected error occurred."
        }`,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="text-red-600 p-4">
        Error loading order data: {error.message}
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100 p-4">
      <h1 className="text-2xl m-4 font-bold text-gray-800 mb-6 border-b-4 pb-2 flex items-center justify-between">
        Order Management
      </h1>

      <OrderTable
        orders={orders}
        onDelete={handleDelete}
        tables={tables}
        restaurants={restaurants}
      />
      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackBar.severity} 
          variant="filled"
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Order;
