import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import validateRequiredFields from "../../../utils/ValidateDialog";

const initialRestaurant = {
  name: "",
  address: "",
  phone: "",
};

const RestaurantDialog = ({ open, handleClose, onSave, restaurant }) => {
  const [formData, setFormData] = useState(initialRestaurant);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(restaurant || initialRestaurant);
    setErrors({});
  }, [restaurant]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setErrors({});
    const requiredFields = ["name", "address"];
    const errors = validateRequiredFields(formData, requiredFields);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    onSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {restaurant ? "Edit Restaurant" : "Add Restaurant"}
      </DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Restaurant Name"
          fullWidth
          margin="dense"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          name="address"
          label="Address"
          fullWidth
          margin="dense"
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
        />
        <TextField
          name="phone"
          label="Phone Number"
          fullWidth
          margin="dense"
          value={formData.phone}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {restaurant ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestaurantDialog;
