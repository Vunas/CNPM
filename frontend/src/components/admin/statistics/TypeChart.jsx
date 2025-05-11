import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

const TypeChart = ({ orders }) => {
  const typeCounts = orders.reduce((acc, order) => {
    acc[order.OrderType] = (acc[order.OrderType] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: "Order Type",
        data: Object.values(typeCounts),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Type Distribution
        </Typography>
        <Bar
          data={data}
          options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
        />
      </CardContent>
    </Card>
  );
};

export default TypeChart;
