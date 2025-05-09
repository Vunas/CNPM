import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setDetailQuantity(1); 
  }, [product]);

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
        <Typography variant="h6" component="div" fontWeight="bold">
          ADD TO CART
        </Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ p: 0 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ py: 4 }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          <img
            src={product?.imageUrl || "placeholder_image_url"}
            alt={product?.name}
            className="w-32 h-32 object-cover rounded mr-3 border"
          />
          <div className="w-[90%]">
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" , alignItems: "center"}}
              className="h-16  border-b-2 pb-4">
              <div>
                <Typography variant="h5" fontWeight="bold">
                  SKU
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {product?.productID}
                </Typography>
              </div>
    
              <div style={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold">
                  Name
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {product?.name}
                </Typography>
              </div>

              <div style={{ textAlign: "right" }}>
                <Typography variant="h6" fontWeight="bold">
                  Unit Price
                </Typography>
                <Typography variant="h5" color="error" fontWeight="bold">
                  Kr {Number(product?.price)?.toFixed(2).replace(".", ",")}
                </Typography>
              </div>
            </Box>
            <div className="mt-2">
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 , width: "100%"}}>
                <Typography variant="subtitle1" mr={2} fontWeight="bold">
                  Quantity:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    overflow: "hidden",
                    width: "100%",
                    justifyContent: "flex-end",
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
                      textAlign: "center",
                      "& input": { textAlign: "center" },
                      '& input[type=number]::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                      },
                      '& input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                      },
                      '& input[type=number]': {
                        MozAppearance: 'textfield', // For Firefox
                      },
                    }}
                    className="w-12"
                  />
                  <IconButton
                    onClick={() => setDetailQuantity(detailQuantity + 1)}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </div>
          </div>
        </Box>
        <Box sx={{ mb: 3}}
        className="text-2xl border-t-2 h-32 pt-2">
            <Typography component="span">
              {product?.description || "..."}
            </Typography>
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
          Kr{" "}
          {Number(product?.price * detailQuantity || 0)
            ?.toFixed(2)
            .replace(".", ",")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetail;
