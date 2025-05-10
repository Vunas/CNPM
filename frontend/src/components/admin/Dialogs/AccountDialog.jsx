import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import validateRequiredFields from "../../../utils/ValidateDialog";

const newAccount = {
  username: "",
  passwordHash: "",
  email: "",
  phone: "",
  restaurantId: "",
  role: "User",
};

const AccountDialog = ({ open, handleClose, onSave, account, restaurants }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(newAccount);

  useEffect(() => {
    if (account) {
      setFormData(account);
    } else {
      setFormData(newAccount);
    }
    setErrors({});
  }, [account]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedData = {
      ...formData,
      restaurantId: formData.restaurant?.restaurantId || "",
    };
    const requiredFields = ["username", "passwordHash", "email", "phone"];
    const errors = validateRequiredFields(updatedData, requiredFields);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    onSave(updatedData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{account ? "Edit Account" : "Add Account"}</DialogTitle>
      <DialogContent>
        <TextField
          name="username"
          label="Username"
          fullWidth
          margin="dense"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          name="passwordHash"
          label="Password"
          type="password"
          fullWidth
          margin="dense"
          value={formData.passwordHash}
          onChange={handleChange}
          error={!!errors.passwordHash}
          helperText={errors.passwordHash}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          margin="dense"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          name="phone"
          label="Phone Number"
          fullWidth
          margin="dense"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <Select
          name="restaurantId"
          fullWidth
          margin="dense"
          value={formData.restaurant?.restaurantId || ""}
          onChange={handleChange}
          error={!!errors.restaurantId}
          helperText={errors.restaurantId}
        >
          <MenuItem value="" disabled>
            RestaurantID
          </MenuItem>
          {restaurants.length === 0 ? (
            <MenuItem value="" disabled>
              Not found any restaurant
            </MenuItem>
          ) : (
            restaurants.map((restaurant) => (
              <MenuItem
                key={restaurant.restaurantId}
                value={restaurant.restaurantId}
              >
                {restaurant.name}
              </MenuItem>
            ))
          )}
        </Select>
        <Select
          name="role"
          fullWidth
          margin="dense"
          value={formData.role}
          onChange={handleChange}
          error={!!errors.role}
          helperText={errors.role}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Kitchen">Kitchen</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {account ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDialog;
