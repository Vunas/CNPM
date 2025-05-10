import React, { useState, useEffect, useCallback } from "react";
import productApi from "../../api/productApi";
import restaurantApi from "../../api/restaurantApi";
import categortApi from "../../api/categoryApi";
import Loading from "../../utils/Loading/Loading";
import ProductTable from "../../components/admin/Tables/ProductTable";
import ProductDialog from "../../components/admin/Dialogs/ProductDialog";
import { Alert, Snackbar } from "@mui/material";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const fetchData = async () => {
    try {
      const dataProduct = await productApi.getProducts();
      setProducts(Array.isArray(dataProduct) ? dataProduct : []);
      const dataRestaurants = await restaurantApi.getRestaurants();
      setRestaurants(dataRestaurants);
      const dataCategories = await categortApi.getCategories();
      setCategories(dataCategories);
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
      await productApi.createProduct(newData);
      setEditProduct();
      setSnackbar({
        open: true,
        message: "Added new product successfully!",
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
      console.log(id, updatedData);
      setLoading(true);
      await productApi.updateProduct(id, updatedData);
      setEditProduct();
      setSnackbar({
        open: true,
        message: "Updated product successfully!",
        severity: "success",
      });
      await fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLock = useCallback(async (id) => {
    try {
      await productApi.lockProduct(id);
      await fetchData();
      setSnackbar({
        open: true,
        message: "Locked/UnLocked product successfully!",
        severity: "success",
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await productApi.deleteProduct(id);
      await fetchData();
      setSnackbar({
        open: true,
        message: "Deleted product successfully!",
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
    return <div>Lỗi khi tải dữ liệu sản phẩm: {error.message}</div>;
  }

  return (
    <div className=" h-full bg-gray-100 p-4">
      <h1 className="text-2xl m-4 font-bold text-gray-800 mb-6 border-b-4 pb-2 flex items-center justify-between">
        Product Management
      </h1>

      <ProductDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        onSave={(data) => {
          if (editProduct) {
            handleEdit(editProduct.productId, data);
          } else {
            handleAdd(data);
          }
        }}
        product={editProduct}
        categories={categories}
        restaurants={restaurants}
      />

      <ProductTable
        products={products}
        setProducts={setProducts}
        onAdd={() => {
          setEditProduct();
          setDialogOpen(true);
        }}
        onEdit={(data) => {
          setEditProduct(data);
          setDialogOpen(true);
        }}
        onLock={handleLock}
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

export default Product;
