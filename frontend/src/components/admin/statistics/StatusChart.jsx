import React from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

const StatusChart = ({ orders }) => {
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.OrderStatus] = (acc[order.OrderStatus] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Status Distribution
        </Typography>
        <Pie data={data} options={{ responsive: true }} />
      </CardContent>
    </Card>
  );
};

export default StatusChart;
