import React, { useState, useEffect, useCallback } from "react";
import categoryApi from "../../api/categoryApi";
import Loading from "../../utils/Loading/Loading";
import CategoryTable from "../../components/admin/Tables/CategoryTable";
import CategoryDialog from "../../components/admin/Dialogs/CategoryDialog";
import { Alert, Snackbar } from "@mui/material";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [editCategory, setEditCategory] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });

  const fetchData = async () => {
    try {
      const dataCategories = await categoryApi.getCategories();
      setCategories(Array.isArray(dataCategories) ? dataCategories : []);
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
      await categoryApi.createCategory(newData);
      setEditCategory();
      setSnackbar({
        open: true,
        message: "Added new category successfully!",
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
      await categoryApi.updateCategory(id, updatedData);
      setEditCategory();
      setSnackbar({
        open: true,
        message: "Updated category successfully!",
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
      await categoryApi.deleteCategory(id);
      await fetchData();
      setSnackbar({
        open: true,
        message: "Deleted category successfully!",
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
    return <div>Lỗi khi tải dữ liệu danh mục: {error.message}</div>;
  }

  return (
    <div className="h-full bg-gray-100 p-4">
      <h1 className="text-2xl m-4 font-bold text-gray-800 mb-6 border-b-4 pb-2">
        Category Management
      </h1>

      <CategoryDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        onSave={(data) => {
          editCategory
            ? handleEdit(editCategory.categoryId, data)
            : handleAdd(data);
        }}
        category={editCategory}
      />

      <CategoryTable
        categories={categories}
        setCategories={setCategories}
        onAdd={() => {
          setEditCategory();
          setDialogOpen(true);
        }}
        onEdit={(data) => {
          setEditCategory(data);
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

export default Category;
