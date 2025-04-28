import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductDetail = ({ open, onClose, product, onAddToCart }) => {
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [selectedVegetables, setSelectedVegetables] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, detailQuantity);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="div">
          ADD TO CART
        </Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ p: 0 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <img
            src={product?.imageUrl || "placeholder_image_url"}
            alt={product?.name}
            className="w-24 h-24 object-cover rounded mr-3"
          />
          <Box>
            <Typography variant="body2" color="text.secondary">
              SKU {product?.productID}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {product?.name}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" color="error" fontWeight="bold" mb={3}>
          kr {Number(product?.price)?.toFixed(2).replace(".", ",")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography variant="subtitle1" mr={2}>
            Quantity:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <IconButton
              onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              type="number"
              value={detailQuantity}
              onChange={(e) => setDetailQuantity(parseInt(e.target.value) || 1)}
              inputProps={{ min: 1 }}
              sx={{
                width: 60,
                textAlign: "center",
                "& input": { textAlign: "center" },
              }}
            />
            <IconButton
              onClick={() => setDetailQuantity(detailQuantity + 1)}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ mb: 3, color: "text.secondary", fontSize: "0.875rem" }}>
          <Typography>
            Protein:{" "}
            <Typography component="span" color="text.primary">
              {product?.protein || "What is Lorem ipsum?"}
            </Typography>
          </Typography>
          <Typography>
            Additives:{" "}
            <Typography component="span" color="text.primary">
              {product?.additives || "03"}
            </Typography>
          </Typography>
          <Typography>
            Baking material:{" "}
            <Typography component="span" color="text.primary">
              {product?.bakingMaterial || "040"}
            </Typography>
          </Typography>
          <Typography>
            Food decoration:{" "}
            <Typography component="span" color="text.primary">
              {product?.foodDecoration || "04"}
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ mb: 3, color: "text.secondary", fontSize: "0.875rem" }}>
          <Typography fontWeight="bold">Side dishes (*)</Typography>
          <Typography>Please select on of the properties below</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedVegetables}
                onChange={(e) => setSelectedVegetables(e.target.checked)}
                color="error"
              />
            }
            label="Vegetables"
          />
          {/* Thêm các tùy chọn side dishes khác nếu cần */}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleAddToCart}
          variant="contained"
          color="error"
          fullWidth
          startIcon={<ShoppingCartIcon />}
        >
          kr{" "}
          {Number(product?.price * detailQuantity || 0)
            ?.toFixed(2)
            .replace(".", ",")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetail;
