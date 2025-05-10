import React, { useState, useEffect, useCallback } from "react";
import restaurantApi from "../../api/restaurantApi";
import Loading from "../../utils/Loading/Loading";
import RestaurantTable from "../../components/admin/Tables/RestaurantTable";
import RestaurantDialog from "../../components/admin/Dialogs/RestaurantDialog";
import { Alert, Snackbar } from "@mui/material";

const Restaurant = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [editRestaurant, setEditRestaurant] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });

  const fetchData = async () => {
    try {
      const dataRestaurants = await restaurantApi.getRestaurants();
      setRestaurants(Array.isArray(dataRestaurants) ? dataRestaurants : []);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const handleAdd = useCallback(async (newData) => {
    try {
      setLoading(true);
      await restaurantApi.createRestaurant(newData);
      setEditRestaurant();
      setSnackbar({
        open: true,
        message: "Added new restaurant successfully!",
        severity: "success",
      });
      await fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback(async (id, updatedData) => {
    try {
      setLoading(true);
      await restaurantApi.updateRestaurant(id, updatedData);
      setEditRestaurant();
      setSnackbar({
        open: true,
        message: "Updated restaurant successfully!",
        severity: "success",
      });
      await fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await restaurantApi.deleteRestaurant(id);
      await fetchData();
      setSnackbar({
        open: true,
        message: "Deleted restaurant successfully!",
        severity: "success",
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  if (loading) return <Loading />;
  if (error) {
    return <div>Error loading restaurant data: {error.message}</div>;
  }

  return (
    <div className="h-full bg-gray-100 p-4">
      <h1 className="text-2xl m-4 font-bold text-gray-800 mb-6 border-b-4 pb-2">
        Restaurant Management
      </h1>

      <RestaurantDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        onSave={(data) => {
          editRestaurant
            ? handleEdit(editRestaurant.restaurantId, data)
            : handleAdd(data);
        }}
        restaurant={editRestaurant}
      />

      <RestaurantTable
        restaurants={restaurants}
        setRestaurants={setRestaurants}
        onAdd={() => {
          setEditRestaurant();
          setDialogOpen(true);
        }}
        onEdit={(data) => {
          setEditRestaurant(data);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackBar.type}
          variant="filled"
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Restaurant;
