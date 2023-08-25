import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const CustomCard = ({ title, story, score, pending }:any) => {
  const cardStyle = {
    
    
    
  };

  function interpolateColor(value:any) {
    // Ensure the input value is within the range of 1 to 10
    const clampedValue = Math.max(1, Math.min(10, value));

    // Calculate the ratio between the input value and the range [1, 10]
    const ratio = (clampedValue - 1) / 9;

    // Interpolate between bright red (#FF0000) and bright green (#00FF00)
    const red = Math.round(255 - ratio * 255);
    const green = Math.round(ratio * 255);
    const blue = 0;

    // Construct the CSS color using RGB values
    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
  }

  const titleStyle = {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const storyStyle = {
    marginBottom: "16px",
  };

  const scoreStyle = {
    marginTop: "8px",
  };

  const pendingContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
  };

  const circularProgressStyle = {
    marginRight: "8px",
  };

  return (
    <Card  style={cardStyle} variant="outlined">
      <CardContent sx={{ backgroundColor: "#373f27" }}>
        <Typography color="#cda34f" style={titleStyle}>
          {title}
        </Typography>
        <Typography
          color="#e9e7da"
          sx={{ whiteSpace: "pre-wrap" }}
          style={storyStyle}
        >
          {story}
        </Typography>
        {pending ? (
          <Box
            style={pendingContainerStyle}
            className="flex justify-end w-full align-middle"
          >
            <Typography
              sx={{ color: "yellow", width: "fit-content", display: "flex" }}
              variant="body2"
              color="textSecondary"
            >
              Awaiting Judgement
            </Typography>
          </Box>
        ) : (
          <Box
            style={pendingContainerStyle}
            className="flex justify-end w-full align-middle"
          >
            <Typography
              sx={{ width: "fit-content", display: "flex" }}
              style={scoreStyle}
              color={interpolateColor(score)}
            >
              Score: {score}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
