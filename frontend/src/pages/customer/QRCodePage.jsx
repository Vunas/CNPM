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
import Loading from "../../utils/Loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS của AOS

function QRCodePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantTables, setRestaurantTables] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const restaurantData = await restaurantApi.getRestaurants();
      const tableData = await restaurantTableApi.getTables();
      setRestaurants(restaurantData);
      setRestaurantTables(tableData);
      setLoading(false);
    };

    fetchData();
    AOS.init({
      duration: 600, // Thời gian animation (ms)
      once: true, // Chỉ chạy animation một lần khi scroll xuống
      // Các tùy chọn khác của AOS có thể được cấu hình tại đây
    });
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

  if (loading) return <Loading />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        sx={{ textAlign: "center", marginBottom: "5rem" }}
        data-aos="fade-right"
      >
        QR Code Generator
      </Typography>

      <FormControl fullWidth sx={{ mb: 4 }} data-aos="zoom-in-up">
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
          <div
            key={restaurant.restaurantId}
            className="flex flex-col items-center mb-6"
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
              {restaurant.name}
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {" "}
              {/* Thêm justifyContent="center" */}
              {filteredTables.map((table) => {
                const canvasId = `qr-${restaurant.restaurantId}-${table.tableId}`;
                const orderUrl = `${window.location.origin}/order?restaurantid=${restaurant.restaurantId}&restauranttableid=${table.tableId}`;
                const fileName = `${restaurant.name}-Table-${table.tableNumber}.png`;

                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={canvasId}
                    data-aos="fade-up"
                    data-aos-delay={table.tableId * 50}
                  >
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
