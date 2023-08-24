"use client";
import Hsd from "@/components/Hsd";
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, TextField, createTheme } from "@mui/material";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useUserContext } from "../Providers";
import { useRouter } from "next/navigation";



const theme = createTheme({
  palette: {
    primary: {
      main: "#E9e7da", //your color
    },
  },
});

const getHash = async (password: string) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

export default function logIn() {
  const userSystem: any = useUserContext();
  const router = useRouter();
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateUser = async (password: any) => {
    setIsLoading(true);
    
    const res = await fetch(`/api/logIn`, {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    const result = await res.json();
    if (result.status === "error") {
      setPasswordError(true);
    } else {
      userSystem.setSystem(result.system);
      userSystem.setUser(result.user);
      userSystem.setPartnerStories(result.partnerStories);

      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen bg-gradient-to-t from-daisy  to-[#e9e7dab4] flex justify-center items-center">
      <div className="bg-[#636b46c9] flex flex-col pt-10 pb-10 px-5 text-center rounded-lg shadow-md justify-center align-middle">
        <Hsd />

        <ThemeProvider theme={theme}>
          {isLoading ? (
            <div className="w-[222px] h-[58px] flex justify-center ">
              <CircularProgress
                color={"primary"}
                className="flex mt-6 w-full"
              />
            </div>
          ) : (
            <TextField
              fullWidth
              error={passwordError}
              className="mt-6 mx-4 w-auto"
              type="password"
              inputProps={{ style: { color: "#E9E7DA" } }}
              id="password"
              label="Password"
              variant="outlined"
              color="primary"
              onChange={(event) => {
                setPasswordValue(event.target.value);
                if (passwordError) {
                  setPasswordError(false);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  validateUser(passwordValue);
                }
              }}
            />
          )}
        </ThemeProvider>
      </div>
    </div>
  );
}
