import React, { useState } from "react";
import {
  Button,
  Slider,
  Typography,
  Container,
  Box,
  Badge,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

const StoryComponent = ({ stories, userSystem }: any) => {
  const [sliderValue, setSliderValue] = useState(5);
  const [pStories, setPStories] = useState(stories);
  const [isLoading, setIsLoading] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackStatus, setSnackStatus]: any = useState("success");
  const [snackMessage, setSnackMessage] = useState("");

  const closeSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  const handleSliderChange = (event: any, newValue: any) => {
    setSliderValue(newValue);
  };

  const handleSubmit = async () => {
    // Perform actions with the collected data
    setIsLoading(true);
    const res = await fetch(`/api/judgeStory`, {
      method: "POST",
      body: JSON.stringify({
        partnerID: userSystem.user.partnerID,
        storyID: pStories[0].id,
        score: sliderValue,
      }),
    });
    const result = await res.json();
    if (result.status === "success") {
      let pSCopy = [...userSystem.partnerStories];

      pSCopy[pStories[0].bigIndex].score = sliderValue;
      pSCopy[pStories[0].bigIndex].pending = false;
      userSystem.setPartnerStories(pSCopy);
      setPStories(pStories.slice(1));
      setSnackStatus("success");
      setSnackMessage("Successfully Judged.");
      setSnackOpen(true);
      setSliderValue(5);
    } else if (result.status === "error") {
      setSnackStatus("error");
      setSnackMessage("Something went wrong. Try again.");
      setSnackOpen(true);
      console.log(result);
    }
    setIsLoading(false);
  };

  if (!pStories || pStories.length == 0) {
    return (
      <Container
        style={{
          borderRadius: ".75rem",
          padding: "1rem",
          backgroundColor: "rgb(55 63 39)",
        }}
      >
        <Container
          style={{
            textAlign: "center",
            borderRadius: ".75rem",
            padding: "1.5rem",
            backgroundColor: "rgb(205 163 79)",
          }}
        >
          <Typography color="black">There are no Stories to judge</Typography>
        </Container>
      </Container>
    );
  }

  return (
    <Container className="bg-Greenery rounded-xl p-4">
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity={snackStatus}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      <Container
        style={{
          padding: "1.5rem",
          borderRadius: "1.5rem",
          backgroundColor: "rgb(205 163 79)",
        }}
      >
        <Typography color="black" variant="h4" style={{ marginBottom: "1rem" }}>
          <Badge badgeContent={pStories.length} color="info">
            Give Judgment
          </Badge>
        </Typography>
        <Typography
          className="text-Greenery"
          variant="h5"
          style={{ marginBottom: "1rem" }}
        >
          {pStories[0].title}
        </Typography>
        <Typography
          color="#2e3718"
          variant="body1"
          style={{ marginBottom: "1rem" }}
        >
          {pStories[0].story}
        </Typography>
        <Box display="flex" alignItems="center" style={{ marginTop: "1rem" }}>
          <Box
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Slider
              sx={{ color: "gold" }}
              value={sliderValue}
              onChange={handleSliderChange}
              aria-labelledby="slider-label"
              step={1}
              marks
              min={0}
              max={10}
            />
            <Typography
              fontSize={32}
              color="black"
              id="slider-label"
              style={{ marginLeft: "1rem" }}
            >
              {sliderValue}
            </Typography>
          </Box>
          <Box flexGrow={1} />
          {isLoading ? (
            <CircularProgress sx={{ color: "#373f27" }} />
          ) : (
            <Button
              variant="contained"              
              sx={{
                color: "gold",
                borderColor: "red",
                backgroundColor: "rgb(55 63 39)",
                "&:hover": { backgroundColor: 'rgb(233 231 218)',
                color:  "rgb(55 63 39)"
              },

              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </Box>
      </Container>
    </Container>
  );
};

export default StoryComponent;
