import React, { useState, useEffect, useCallback } from "react";
import accountApi from "../../api/accountApi";
import Loading from "../../utils/Loading/Loading";
import AccountTable from "../../components/admin/Tables/AccountTable";
import AccountDialog from "../../components/admin/Dialogs/AccountDialog";
import { Alert, Snackbar } from "@mui/material";
import restaurantApi from "../../api/restaurantApi";

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [editAccount, setEditAccount] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSnackbarClose = () => setSnackbar({ ...snackBar, open: false });
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const fetchData = async () => {
    try {
      const dataAccount = await accountApi.getAccounts();
      setAccounts(Array.isArray(dataAccount) ? dataAccount : []);
      const dataRestaurants = await restaurantApi.getRestaurants();
      setRestaurants(dataRestaurants);
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
      await accountApi.createAccount(newData);
      setEditAccount();
      setSnackbar({
        open: true,
        message: "Added new account successfully!",
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
      await accountApi.updateAccount(id, updatedData);
      setEditAccount();
      setSnackbar({
        open: true,
        message: "Updated account successfully!",
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
      await accountApi.lockAccount(id);
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
      await accountApi.deleteAccount(id);
      await fetchData();
      setSnackbar({
        open: true,
        message: "Deleted account successfully!",
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
    return <div>Lỗi khi tải dữ liệu tài khoản: {error.message}</div>;
  }

  return (
    <div className=" h-full bg-gray-100 p-4">
      <h1 className="text-2xl m-4 font-bold text-gray-800 mb-6 border-b-4 pb-2 flex items-center justify-between">
        Account Management
      </h1>

      <AccountDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        onSave={(data) => {
          if (editAccount) {
            handleEdit(editAccount.accountId, data);
          } else {
            handleAdd(data);
          }
        }}
        account={editAccount}
        restaurants={restaurants}
      />

      <AccountTable
        accounts={accounts}
        setAccounts={setAccounts}
        onAdd={() => {
          setEditAccount();
          setDialogOpen(true);
        }}
        onEdit={(data) => {
          setEditAccount(data);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
        onLock={handleLock}
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

export default Account;
