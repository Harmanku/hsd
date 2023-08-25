"use client";
import {
  Box,
  Fab,
  Typography,
  Snackbar,
  Alert,
  Pagination,
  Stack,
  LinearProgress,
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CustomCard from "./CustomCard";

function getRandomEmotion() {
  const emotions = [
    "Happy",
    "Sad",
    "Angry",
    "Excited",
    "Surprised",
    "Calm",
    "Fearful",
    "Content",
    "Grateful",
    "Bored",
    "Confused",
    "Hopeful",
    "Insecure",
    "Lonely",
    "Proud",
    "Relaxed",
    "Nervous",
    "Playful",
    "Peaceful",
    "Anxious",
    "Optimistic",
    "Overwhelmed",
    "Energetic",
    "Melancholic",
    "Joyful",
    "Disappointed",
    "Enthusiastic",
    "Guilty",
    "Indifferent",
    "Frustrated",
    "Amused",
    "Apprehensive",
    "Cautious",
    "Determined",
    "Ecstatic",
    "Regretful",
    "Resentful",
    "Satisfied",
    "Suspicious",
    "Hopeless",
    "Loved",
    "Hurt",
    "Overjoyed",
    "Rejuvenated",
    "Stressed",
    "Empowered",
    "Mellow",
    "Vulnerable",
    "Ambivalent",
    "Inspired",
    "Apathetic",
    "Awkward",
    "Captivated",
    "Curious",
    "Defeated",
    "Flustered",
    "Numb",
    "Reflective",
    "Restless",
    "Sentimental",
    "Uncertain",
    "Unsettled",
    "Zealous",
    "Serene",
    "Astonished",
    "Bewildered",
    "Cranky",
    "Eager",
    "Exhilarated",
    "Fascinated",
    "Fulfilled",
    "Giddy",
    "Irritated",
    "Jubilant",
    "Lethargic",
    "Nostalgic",
    "Panicked",
    "Perplexed",
    "Quizzical",
    "Sulky",
    "Triumphant",
    "Wistful",
    "Zany",
    "Satisfied",
    "Cynical",
    "Worried",
    "Overwhelmed",
    "Amazed",
    "Relieved",
    "Enraged",
    "Thrilled",
    "Restless",
    "Anticipating",
    "Stunned",
    "Overworked",
    "Engaged",
    "Startled",
    "Mournful",
  ];
  const randomIndex = Math.floor(Math.random() * emotions.length);
  return emotions[randomIndex];
}

function getRandomObject() {
  const objects = [
    "Book",
    "Chair",
    "Car",
    "Laptop",
    "Plant",
    "Bicycle",
    "Watch",
    "Shoes",
    "Table",
    "Camera",
    "Phone",
    "Guitar",
    "Hat",
    "Mirror",
    "Pencil",
    "Sunglasses",
    "Backpack",
    "Clock",
    "Pizza",
    "Cup",
    "Microphone",
    "Umbrella",
    "Blanket",
    "Wallet",
    "Headphones",
    "Jacket",
    "Knife",
    "Pillow",
    "Scissors",
    "Bracelet",
    "Ring",
    "Bottle",
    "Key",
    "Globe",
    "Basketball",
    "Remote",
    "Lamp",
    "Toothbrush",
    "Perfume",
    "Cookie",
    "Teddy Bear",
    "Headset",
    "Guitar Pick",
    "Chocolates",
    "Earrings",
    "Hairbrush",
    "Soap",
    "Candle",
    "Sunscreen",
    "Speaker",
    "Charger",
    "Keyboard",
    "Mouse",
    "Couch",
    "Curtains",
    "Wallet",
    "Notebook",
    "Pen",
    "Socks",
    "Painting",
    "Watch",
    "Clippers",
    "Toothpaste",
    "Lotion",
    "Toys",
    "Hat",
    "Microphone",
    "Vase",
    "Headphones",
    "Sunglasses",
    "Remote",
    "Bottle",
    "Cup",
    "Shirt",
    "Scarf",
    "Cologne",
    "Shampoo",
    "Blender",
    "Mug",
    "Phone",
    "Pencil",
    "Plant",
    "Guitar",
    "Backpack",
    "Camera",
    "Mirror",
    "Tablet",
    "Laptop",
    "Hat",
    "Shoes",
    "Jacket",
    "Umbrella",
    "Bag",
    "Speaker",
    "Wallet",
    // Add more objects as needed
  ];
  const randomIndex = Math.floor(Math.random() * objects.length);
  return objects[randomIndex];
}

const ITEMS_PER_PAGE = 10;

export default function WritingCorner({ userSystem }: any) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [emotion, setEmotion] = useState(getRandomEmotion());
  const [object, setObject] = useState(getRandomObject());
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackStatus, setSnackStatus]: any = useState("success");
  const [snackMessage, setSnackMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    userSystem?.user?.Stories?.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = userSystem?.user?.Stories?.slice(startIndex, endIndex);

  const handlePageChange = (event: any, newPage: any) => {
    setCurrentPage(newPage);
  };

  const openSnack = (status: String) => {
    setSnackOpen(true);
  };

  const closeSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (shouldSend: boolean) => {
    if (shouldSend) {
      setIsLoading(true);
      const res = await fetch(`/api/submitStory`, {
        method: "PUT",
        body: JSON.stringify({ story, title, userId: userSystem.user.id }),
      });
      const result = await res.json();
      if (result.status === "error") {
        setSnackStatus("error");
        setSnackMessage("Something went wrong. Try again.");
        setSnackOpen(true);
      }

      if (result.status === "success") {
        setSnackStatus("success");
        setSnackMessage("Your record was submitted.");
        setSnackOpen(true);
        setStory("");
        setTitle("");
        setOpen(false);

        userSystem.setUser({
          ...userSystem.user,
          Stories: [...userSystem.user.Stories, result.story],
        });
      }
    }
    setIsLoading(false);
    setOpen(false);
  };

  const rerollRandom = () => {
    setEmotion(getRandomEmotion());
    setObject(getRandomObject());
  };

  return (
    <>
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
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Write a Story</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Try expressing <span className="font-bold">{emotion}</span> and
            include (a) <span className="font-bold"> {object}</span> in your
            story.
            <IconButton
              onClick={() => {
                rerollRandom();
              }}
            >
              <RefreshIcon />
            </IconButton>
          </DialogContentText>
          <TextField
            sx={{ whiteSpace: "pre-wrap" }}
            autoFocus
            margin="normal"
            id="name"
            label="Title"
            type="title"
            fullWidth
            value={title}
            variant="standard"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={12}
            value={story}
            onChange={(event) => {
              setStory(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          {isLoading ? null : (
            <Button disabled={isLoading} onClick={() => handleClose(false)}>
              Cancel
            </Button>
          )}
          {isLoading ? (
            <div className="w-full my-6 mx-4">
              <LinearProgress color="primary" />
            </div>
          ) : (
            <Button
              disabled={isLoading}
              onClick={() => {
                handleClose(true);
              }}
            >
              Send
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <div className="flex flex-col">
        <div className="w-100 flex">
          <div className="flex items-center justify-end p-6 bg-Greenery w-fit rounded-lg shadow-md ml-3.5">
            <Typography
              style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
              color="#E9E7DA"
            >
              Write a Story
            </Typography>
            <Fab
              size="large"
              
              style={{marginLeft:'.75rem', backgroundColor: 'rgb(205 163 79)'}}
              onClick={handleClickOpen}
            >
              <EditNoteIcon />
            </Fab>
          </div>
        </div>

        {userSystem?.user?.Stories ? (
          <div className="flex justify-center flex-col items-center w-full">
            <Typography
              sx={{ color: "#2C3718", marginTop: "2rem", marginBottom: "2rem" }}
              variant="h4"
            >
              Stories You've Written
            </Typography>
            <Stack style={{ width: "100%", maxWidth: "730px" }} spacing={2}>
              {currentItems.map((item: any, index: any) => (
                <CustomCard
                  key={item.id}
                  story={item.story}
                  title={item.title}
                  pending={item.pending}
                  score={item.score}
                />
              ))}
            </Stack>

            <Pagination
              siblingCount={0}
              className="mt-8"
              count={totalPages} // Replace with actual total count
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="large"
            />
          </div>
        ) : (
          <div className="mt-4 ml-4 text-Greenery">
            Loading... Or you have no stories yet!
          </div>
        )}
      </div>
    </>
  );
}
