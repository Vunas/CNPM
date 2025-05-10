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

const initialTable = {
  tableNumber: "",
  qrCode: "",
  restaurantId: "",
};

const RestaurantTableDialog = ({ open, handleClose, onSave, table }) => {
  const [formData, setFormData] = useState(initialTable);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(table || initialTable);
    setErrors({});
  }, [table]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setErrors({});
    const requiredFields = ["tableNumber", "restaurantId"];
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
      <DialogTitle>{table ? "Edit Table" : "Add Table"}</DialogTitle>
      <DialogContent>
        <TextField
          name="tableNumber"
          label="Table Number"
          fullWidth
          margin="dense"
          value={formData.tableNumber}
          onChange={handleChange}
          error={!!errors.tableNumber}
          helperText={errors.tableNumber}
        />
        <TextField
          name="qrCode"
          label="QR Code (Optional)"
          fullWidth
          margin="dense"
          value={formData.qrCode}
          onChange={handleChange}
        />
        <TextField
          name="restaurantId"
          label="Restaurant ID"
          fullWidth
          margin="dense"
          value={formData.restaurantId}
          onChange={handleChange}
          error={!!errors.restaurantId}
          helperText={errors.restaurantId}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {table ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestaurantTableDialog;
