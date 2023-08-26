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

const PartnerStories = ({ userSystem}:any) => {
    
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
  const handlePageChange = (event:any, newPage:any) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {userSystem?.partnerStories ? (
        <div className="flex justify-center flex-col items-center w-full">
          <Typography  sx={{ color: "#2C3718", marginTop: '2rem', marginBottom: '2rem' }} variant="h4">
            Your partner's notes
          </Typography>
          <Stack style={{maxWidth:'733px', display: "flex",  justifyContent: 'center', verticalAlign: 'middle' }}   spacing={2}>
            {currentItems.map((item:any, index:number) => (
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
