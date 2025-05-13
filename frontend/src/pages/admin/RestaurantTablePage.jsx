import React, { useState, useEffect, useCallback } from "react";
import restaurantTableApi from "../../api/restaurantTableApi";
import Loading from "../../utils/Loading/Loading";
import RestaurantTableList from "../../components/admin/Tables/RestaurantTableList";
import RestaurantTableDialog from "../../components/admin/Dialogs/RestaurantTableDialog";
import { Alert, Snackbar } from "@mui/material";

const RestaurantTablePage = () => {
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [editTable, setEditTable] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });

  const fetchData = async () => {
    try {
      const dataTables = await restaurantTableApi.getTables();
      setTables(Array.isArray(dataTables) ? dataTables : []);
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
      await restaurantTableApi.createTable(newData);
      setEditTable();
      setSnackbar({
        open: true,
        message: "Added new table successfully!",
        severity: "success",
      });
      await fetchData();
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Error: " + e.response?.data?.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback(async (id, updatedData) => {
    try {
      setLoading(true);
      await restaurantTableApi.updateTable(id, updatedData);
      setEditTable();
      setSnackbar({
        open: true,
        message: "Updated table successfully!",
        severity: "success",
      });
      await fetchData();
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Error: " + e.response?.data?.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await restaurantTableApi.deleteTable(id);
      await fetchData();
      setSnackbar({
        open: true,
        message: "Deleted table successfully!",
        severity: "success",
      });
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Error: " + e.response?.data?.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  if (loading) return <Loading />;
  if (error) {
    return <div>Error loading table data: {error.message}</div>;
  }

  return (
    <div className="h-full bg-gray-100 p-4">
      <h1 className="text-2xl m-4 font-bold text-gray-800 mb-6 border-b-4 pb-2">
        Restaurant Table Management
      </h1>

      <RestaurantTableDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        onSave={(data) => {
          editTable ? handleEdit(editTable.tableId, data) : handleAdd(data);
        }}
        table={editTable}
      />

      <RestaurantTableList
        tables={tables}
        setTables={setTables}
        onAdd={() => {
          setEditTable();
          setDialogOpen(true);
        }}
        onEdit={(data) => {
          setEditTable(data);
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

export default RestaurantTablePage;
