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
        <Dialog open={open} onClose={onClose} fullWidth>
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
            <DialogContent dividers sx={{ py: 2 }}> {/* Giảm padding top/bottom */}
                <Box sx={{ display: "flex", flexDirection: 'column', width: "100%", alignItems: 'center' }}> 
                    <img
                        src={product?.imageUrl || "placeholder_image_url"}
                        alt={product?.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded mr-0 mb-2 sm:mr-3 sm:mb-0 border"
                    />
                    <div className="w-full">
                        <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "space-between", width: "100%", alignItems: "flex-start", mb: 2 }} 
                            className="pb-2 border-b-2"
                        >
                            <div>
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.8rem' }}> 
                                    SKU
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}> 
                                    {product?.productID}
                                </Typography>
                            </div>

                            <div style={{ width: '100%', textAlign: "left", mt: 1, mb: 1 }}> 
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                                    Name
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                                    {product?.name}
                                </Typography>
                            </div>

                            <div style={{ textAlign: "left" }}>
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.8rem' }}>
                                    Unit Price
                                </Typography>
                                <Typography variant="h6" color="error" fontWeight="bold" sx={{ fontSize: '1rem' }}>
                                    Kr {Number(product?.price)?.toFixed(2).replace(".", ",")}
                                </Typography>
                            </div>
                        </Box>
                        <div className="mt-1">
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}>
                                <Typography variant="subtitle1" mr={1} fontWeight="bold" sx={{ fontSize: '0.9rem' }}>
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
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <TextField
                                        type="number"
                                        value={detailQuantity}
                                        onChange={(e) => setDetailQuantity(parseInt(e.target.value) || 1)}
                                        inputProps={{ min: 1 }}
                                        sx={{
                                            textAlign: "center",
                                            "& input": { textAlign: "center", fontSize: '0.9rem' },
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
                                        className="w-16"
                                    />
                                    <IconButton
                                        onClick={() => setDetailQuantity(detailQuantity + 1)}
                                        size="small"
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </Box>
                <Box sx={{ mb: 2 }}
                    className="text-lg border-t-2 pt-2"
                >
                    <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                        {product?.description || "..."}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 1 }}> {/* Giảm padding */}
                <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    color="error"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    sx={{ fontSize: '0.9rem', padding: '8px 16px' }}
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