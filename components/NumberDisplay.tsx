import React from "react";
import { Typography, Paper } from "@mui/material";

const NumberDisplay = ({ title, number, isActive }:any) => {
  const containerStyle:any = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",

    borderRadius: "8px",
    borderWidth: "2px",
    margin: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    minWidth: "150px",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    marginBottom: "8px",
  };

  const numberStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#373f27", // Custom color, adjust as needed
  };

  return (
    <div
      className={`transition  ease-in duration-100 ${
        isActive ? "bg-gold" : "bg-[#e9e7de]"
      }`}
      elevation={3}
      style={containerStyle}
    >
      <Typography color="#373f27" variant="h6" style={titleStyle}>
        {title}
      </Typography>
      <Typography variant="body1" style={numberStyle}>
        {number}
      </Typography>
    </div>
  );
};

export default NumberDisplay;
