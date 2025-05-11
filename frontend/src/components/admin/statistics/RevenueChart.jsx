import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

const RevenueChart = ({ orders }) => {
  const revenueByDate = orders.reduce((acc, order) => {
    const date = new Date(order.OrderDate).toLocaleDateString();
    acc[date] = (acc[date] || 0) + order.TotalPrice;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: "Revenue ($)",
        data: Object.values(revenueByDate),
        borderColor: "#FF6384",
        fill: false,
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Revenue Over Time
        </Typography>
        <Line
          data={data}
          options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
        />
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
