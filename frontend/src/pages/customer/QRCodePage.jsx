import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import restaurantApi from "../../api/restaurantApi";
import restaurantTableApi from "../../api/restaurantTableApi";
import Download from "@mui/icons-material/Download";

function QRCodePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantTables, setRestaurantTables] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const restaurantData = await restaurantApi.getRestaurants();
      const tableData = await restaurantTableApi.getTables();
      setRestaurants(restaurantData);
      setRestaurantTables(tableData);
    };

    fetchData();
  }, []);

  const handleRestaurantChange = (event) => {
    setSelectedRestaurantId(event.target.value);
  };

  const exportQRCode = (canvasId, fileName) => {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = fileName;
      link.click();
    }
  };

  const filteredRestaurants = selectedRestaurantId
    ? restaurants.filter((r) => r.restaurantId === selectedRestaurantId)
    : restaurants;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        sx={{ textAlign: "center", marginBottom: "5rem" }}
      >
        QR Code Generator
      </Typography>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Filter by Restaurant</InputLabel>
        <Select
          value={selectedRestaurantId}
          label="Filter by Restaurant"
          onChange={handleRestaurantChange}
        >
          <MenuItem value="">All Restaurants</MenuItem>
          {restaurants.map((restaurant) => (
            <MenuItem
              key={restaurant.restaurantId}
              value={restaurant.restaurantId}
            >
              {restaurant.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filteredRestaurants.map((restaurant) => {
        const filteredTables = restaurantTables.filter(
          (table) => table.restaurantId === restaurant.restaurantId
        );
        console.log(filteredTables);
        if (!filteredTables || filteredTables.length === 0)
          return (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
                {restaurant.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontStyle: "italic" }}
              >
                No tables found
              </Typography>
            </div>
          );

        return (
          <div key={restaurant.restaurantId}>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
              {restaurant.name}
            </Typography>
            <Grid container spacing={3}>
              {filteredTables.map((table) => {
                const canvasId = `qr-${restaurant.restaurantId}-${table.tableId}`;
                const orderUrl = `http://localhost:5173/order?restaurantid=${restaurant.restaurantId}&restauranttableid=${table.tableId}`;
                const fileName = `${restaurant.name}-Table-${table.tableNumber}.png`;

                return (
                  <Grid item xs={12} sm={6} md={4} key={canvasId}>
                    <Card
                      sx={{
                        p: 2,
                        boxShadow: 3,
                        borderRadius: 2,
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                          sx={{ color: "primary.main" }}
                        >
                          Table {table.tableNumber}
                        </Typography>
                        <QRCodeCanvas
                          id={canvasId}
                          value={orderUrl}
                          size={200}
                          level="H"
                          onClick={() => (window.location.href = orderUrl)}
                          className="cursor-pointer"
                        />

                        <Button
                          variant="contained"
                          // size="small"
                          sx={{
                            mt: 2,
                            bgcolor: "success.main",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: 2,
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            flexGrow: 1,
                            width: "100%",
                            py: 1,
                            "&:hover": { bgcolor: "success.dark" },
                          }}
                          onClick={() => exportQRCode(canvasId, fileName)}
                        >
                          <Download fontSize="medium" />
                          Download QR Code
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        );
      })}
    </Container>
  );
}

export default QRCodePage;
