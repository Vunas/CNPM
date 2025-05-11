import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, // Keep Legend registered for other potential uses or future changes
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
import { Line, Pie } from "react-chartjs-2";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import orderApi from "../../api/orderApi"; // Ensure the API path is correct
import { AttachMoney, MonetizationOn, ShoppingCart } from "@mui/icons-material";

// Helper function to check if a date is within the selected range
const isDateInRange = (date, startDate, endDate) => {
  const orderDate = new Date(date);
  orderDate.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

  if (startDate && orderDate < startDate) {
    return false;
  }
  if (endDate && orderDate > endDate) {
    return false;
  }
  return true;
};

const Statistics = () => {
  const [allOrders, setAllOrders] = useState([]); // Stores all orders
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await orderApi.getOrders();
        setAllOrders(response);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load order data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders based on selected dates
  const filteredOrders = useMemo(() => {
    if (!allOrders || allOrders.length === 0) return [];
    return allOrders.filter((order) => {
      // Ensure order.orderDate exists and is a valid date
      if (!order.orderDate || isNaN(new Date(order.orderDate).getTime())) {
        return false;
      }
      return isDateInRange(order.orderDate, startDate, endDate);
    });
  }, [allOrders, startDate, endDate]); // Depends on allOrders, startDate, endDate

  // Calculate revenue and order type data from filteredOrders
  const { revenueData, orderTypeCounts, totalRevenue, totalOrders } =
    useMemo(() => {
      const revData = {};
      const typeCounts = {};
      let totalRev = 0;

      filteredOrders.forEach((order) => {
        if (!order.orderDate || isNaN(new Date(order.orderDate).getTime())) {
          return;
        }

        const dateObject = new Date(order.orderDate);
        const date = dateObject.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }); // Changed to en-US for consistent date formatting

        const totalPrice = parseFloat(order.totalPrice) || 0; // Ensure 'totalPrice' is used
        revData[date] = (revData[date] || 0) + totalPrice;
        totalRev += totalPrice;

        typeCounts[order.orderType] = (typeCounts[order.orderType] || 0) + 1;
      });

      const sortedDates = Object.keys(revData).sort((a, b) => {
        const [monthA, dayA, yearA] = a.split("/").map(Number); // Parse en-US dates
        const [monthB, dayB, yearB] = b.split("/").map(Number); // Parse en-US dates
        return (
          new Date(yearA, monthA - 1, dayA).getTime() -
          new Date(yearB, monthB - 1, dayB).getTime()
        );
      });

      const sortedRevenueData = {};
      sortedDates.forEach((date) => {
        sortedRevenueData[date] = revData[date];
      });

      return {
        revenueData: sortedRevenueData,
        orderTypeCounts: typeCounts,
        totalRevenue: totalRev,
        totalOrders: filteredOrders.length,
      };
    }, [filteredOrders]); // Depends on filteredOrders

  // Function to reset dates to default (all dates)
  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading data...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // Check if no orders after filtering
  if (!filteredOrders?.length && (startDate || endDate)) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="h1"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Order Statistics Report
        </Typography>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6" sx={{ mr: 3, mb: { xs: 2, md: 0 } }}>
            Filter by Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              maxDate={endDate}
              slotProps={{ textField: { size: "small" } }}
              sx={{ mr: 2, mb: { xs: 2, md: 0 } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              slotProps={{ textField: { size: "small" } }}
              sx={{ mr: 2, mb: { xs: 2, md: 0 } }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="primary"
            onClick={resetDates}
            startIcon={<i className="fas fa-sync-alt" />}
            sx={{ mt: { xs: 2, md: 0 } }}
          >
            Reset Filter
          </Button>
        </Paper>
        <Alert severity="info">
          No order data found for the selected period.
        </Alert>
      </Container>
    );
  } else if (!allOrders?.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="h1"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Order Statistics Report
        </Typography>
        <Alert severity="info">No order data available in the system.</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        px: 0,
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <h1 className="text-2xl m-4 font-bold text-gray-800 mb-6 border-b-4 pb-2">
        Statistics Report
      </h1>

      {/* Date Filter */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
          boxShadow: "none",
          bgcolor: "transparent",
        }}
      >
        <Typography variant="h6" sx={{ mr: 3, mb: { xs: 2, md: 0 } }}>
          Filter by Date:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={endDate}
            slotProps={{ textField: { size: "small" } }}
            sx={{ mr: 2, mb: { xs: 2, md: 0 } }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            slotProps={{ textField: { size: "small" } }}
            sx={{ mr: 2, mb: { xs: 2, md: 0 } }}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={resetDates}
          startIcon={<i className="fas fa-sync-alt" />} // Requires Font Awesome
          sx={{ mt: { xs: 2, md: 0 } }}
        >
          Reset
        </Button>
      </Paper>

      {/* Overview Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }} className="justify-center">
        <Grid item xs={12} sm={6} md={4} className="flex-1">
          <Card raised sx={{ backgroundColor: "#e3f2fd", boxShadow: "none" }}>
            <CardContent className="flex flex-col items-center">
              <Typography variant="h6" color="text.secondary" gutterBottom>
                <ShoppingCart
                  sx={{ fontSize: 30, color: "primary.main", marginRight: 1 }}
                />
                Total Orders
              </Typography>

              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="flex-1">
          <Card raised sx={{ backgroundColor: "#e8f5e9", boxShadow: "none" }}>
            <CardContent className="flex flex-col items-center">
              <Typography variant="h6" color="text.secondary" gutterBottom>
                <AttachMoney
                  sx={{ fontSize: 30, color: "success.main", marginRight: 1 }}
                />
                Total Revenue
              </Typography>

              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", color: "success.main" }}
              >
                $
                {totalRevenue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="flex-1">
          <Card raised sx={{ backgroundColor: "#fff3e0", boxShadow: "none" }}>
            <CardContent className="flex flex-col items-center">
              <Typography variant="h6" color="text.secondary" gutterBottom>
                <MonetizationOn
                  sx={{ fontSize: 30, color: "warning.main", marginRight: 1 }}
                />
                Average Order Value
              </Typography>

              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", color: "warning.main" }}
              >
                $
                {(totalRevenue / totalOrders || 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={7} className="w-7/12">
          <Card raised sx={{ boxShadow: "none", bgcolor: "transparent" }}>
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Revenue by Date
              </Typography>
              <Line
                data={{
                  labels: Object.keys(revenueData),
                  datasets: [
                    {
                      label: "Revenue ($)",
                      data: Object.values(revenueData),
                      borderColor: "#42a5f5", // Fresh blue color
                      backgroundColor: "rgba(66, 165, 245, 0.2)",
                      fill: true,
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false, // Removed legend
                    },
                    title: {
                      display: false, // Title handled by Typography component
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Revenue ($)",
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Date",
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Order Type Distribution Chart */}
        <Grid item xs={12} md={5} className="w-4/12 ml-10">
          <Card raised sx={{ boxShadow: "none", bgcolor: "transparent" }}>
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Order Type Distribution
              </Typography>
              <Pie
                data={{
                  labels: Object.keys(orderTypeCounts),
                  datasets: [
                    {
                      data: Object.values(orderTypeCounts),
                      backgroundColor: [
                        "#FF6384", // Pink
                        "#36A2EB", // Blue
                        "#FFCE56", // Yellow
                        "#4BC0C0", // Teal
                        "#9966FF", // Purple
                        "#FF9F40", // Orange
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      labels: {
                        padding: 10,
                      },

                      position: "bottom",
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Order List */}
        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            elevation={2}
            sx={{ width: "75vw", bgcolor: "transparent", boxShadow: "none" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: " #c8c8c8" }}>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    className="rounded-tl-2xl rounded-bl-2xl"
                  >
                    Order Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Value
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Order Type</TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    className="rounded-br-2xl rounded-tr-2xl"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow
                    key={order.orderId || index} // Use unique order ID if available
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(order.orderDate).toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell>{order.orderId || "N/A"}</TableCell>
                    <TableCell align="right">
                      $
                      {(parseFloat(order.totalPrice) || 0).toLocaleString(
                        "en-US",
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </TableCell>
                    <TableCell>{order.orderType}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Statistics;
