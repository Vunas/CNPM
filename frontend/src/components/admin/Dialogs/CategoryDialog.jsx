import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import uploadApi from "../../../api/uploadApi";

const initialCategory = {
  name: "",
  imageUrl: "",
};

const CategoryDialog = ({ open, handleClose, onSave, category }) => {
  const [formData, setFormData] = useState(initialCategory);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setFormData(category || initialCategory);
  }, [category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  const handleFileDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];

    if (file) {
      try {
        const response = await uploadApi.uploadFile(file);
        setFormData({ ...formData, imageUrl: response });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const response = await uploadApi.uploadFile(file);
        setFormData({ ...formData, imageUrl: response });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Category Name"
          fullWidth
          margin="dense"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="mt-2"
        />

        <div
          className={`w-full h-60 flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md ${
            isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
        >
          <p>{isDragging ? "Drop file here..." : "Drag & drop file here"}</p>
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-4 max-w-full h-auto rounded-lg shadow-lg"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {category ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
