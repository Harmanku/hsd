"use client";

import {
  Box,
  Fab,
  Typography,
  Snackbar,
  Alert,
  Pagination,
  Stack,
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

const ITEMS_PER_PAGE = 10;

const PartnerStories = ({ userSystem}) => {
    
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    userSystem?.partnerStories?.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = userSystem?.partnerStories?.slice(
    startIndex,
    endIndex
  );
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {userSystem?.partnerStories ? (
        <div className="flex justify-center flex-col items-center w-full">
          <Typography className="my-8" sx={{ color: "#2C3718" }} variant="h4">
            Your Partner's Stories
          </Typography>
          <Stack className="w-full flex justify-center align-middle" spacing={2}>
            {currentItems.map((item, index) => (
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
          Loading...
        </div>
      )}
    </div>
  );
};

export default PartnerStories;
