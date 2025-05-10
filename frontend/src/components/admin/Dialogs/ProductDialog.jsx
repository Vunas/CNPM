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
import uploadApi from "../../../api/uploadApi";
import validateRequiredFields from "../../../utils/ValidateDialog";

const newProduct = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  restaurantId: "",
  imageUrl: "",
};

const ProductDialog = ({
  open,
  handleClose,
  onSave,
  product,
  restaurants,
  categories,
}) => {
  const [formData, setFormData] = useState(newProduct);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(product || newProduct);
    setErrors({});
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setErrors({});
    const updatedData = {
      ...formData,
      restaurantId: formData.restaurant?.restaurantId || "",
      categoryId: formData.category?.categoryId || "",
    };
    const requiredFields = ["name", "price", "categoryId", "restaurantId"];
    const errors = validateRequiredFields(updatedData, requiredFields);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    onSave(updatedData);
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
        console.error("Lỗi khi tải ảnh lên:", error);
      }
    }
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const response = await uploadApi.uploadFile(file);
        console.log(response);
        setFormData({ ...formData, imageUrl: response });
      } catch (error) {
        console.error("Lỗi khi tải ảnh lên:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
      </DialogTitle>
      <DialogContent>
        <div className="flex gap-4">
          {/* Phần nhập liệu bên trái */}
          <div className="flex-1 flex flex-col">
            <TextField
              name="name"
              label="Tên sản phẩm"
              fullWidth
              margin="dense"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              name="description"
              label="Mô tả"
              fullWidth
              margin="dense"
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              name="price"
              label="Giá"
              type="number"
              fullWidth
              margin="dense"
              value={formData.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
            />
            <Select
              name="categoryId"
              fullWidth
              margin="dense"
              value={formData.category?.categoryId || ""}
              onChange={handleChange}
              error={!!errors.categoryId}
              helperText={errors.categoryId}
            >
              <MenuItem value="" disabled>
                categoryId
              </MenuItem>
              {categories.length === 0 ? (
                <MenuItem value="" disabled>
                  Not found any category
                </MenuItem>
              ) : (
                categories.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Select>
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
          </div>

          {/* Phần hình ảnh bên phải */}
          <div className="flex-1 flex flex-col items-center">
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
              <p>{isDragging ? "Thả tệp tại đây..." : "Kéo thả tệp vào đây"}</p>
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
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {product ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
