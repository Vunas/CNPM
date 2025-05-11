import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

const PaymentChart = ({ orders }) => {
  const paymentCounts = orders.reduce((acc, order) => {
    acc[order.PaymentMethod || "Unknown"] =
      (acc[order.PaymentMethod || "Unknown"] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(paymentCounts),
    datasets: [
      {
        data: Object.values(paymentCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payment Method Distribution
        </Typography>
        <Doughnut data={data} options={{ responsive: true }} />
      </CardContent>
    </Card>
  );
};

export default PaymentChart;
