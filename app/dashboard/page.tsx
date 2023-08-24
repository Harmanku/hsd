"use client";

import { useUserContext } from "../Providers";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import BoltIcon from "@mui/icons-material/Bolt";
import MuiDrawer from "@mui/material/Drawer";
import { useState } from "react";
import Hsd from "@/components/Hsd";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { useStyleRegistry } from "styled-jsx";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import WritingCorner from "@/components/WritingCorner";
import { useRouter } from "next/navigation";
import Judgement from "@/components/Judgement";
import AffectionCorner from "@/components/AffectionCorner";
import Settings from "@/components/Settings";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

enum dState {
  WritingCorner,
  Judgement,
  AffectionCorner,
  Settings,
}

const page = () => {
  const userSystem = useUserContext();
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [headerText, setHeaderText] = useState("Writing Corner");
  const [dashBoardState, setDashBoardState] = useState(dState.WritingCorner);

  const getUserSystemEnergy = () => {
    let message: String = "";

    if (userSystem?.user?.energy != null) {
      message = userSystem.user.energy;
    }

    return message;
  };

  const logOut = () => {
    userSystem.setSystem(null);
    userSystem.setUser(null);
    userSystem.setPartnerStories(null);
    router.push("/logIn");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderSelectedState = (state: dState) => {
    switch (state) {
      case dState.WritingCorner:
        return (
          <>
            <WritingCorner userSystem={userSystem} />
          </>
        );

      case dState.Judgement:
        return (
          <>
            <Judgement userSystem={userSystem} />
          </>
        );

      case dState.AffectionCorner:
        return <AffectionCorner userSystem={userSystem} />;
      case dState.Settings:
        return <Settings />;
      default:
        return "Something went Wrong";
    }
  };

  return (
    <main className="h-screen">
      <Box
        sx={{
          display: "flex",
          flexDirection: "col",
          height: "100%",
          backgroundColor: "#E9E7DA",
        }}
      >
        <CssBaseline />

        <AppBar
          sx={{ backgroundColor: "#FFF7E8" }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: "#2C3718" }} />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color="#2C3718">
              {headerText}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{ backgroundColor: "#373f27" }}
          variant="permanent"
          open={open}
        >
          <DrawerHeader
            className="flex justify-center align-middle"
            sx={{ backgroundColor: "#373f27" }}
          >
            {open ? (
              <div className="mx-auto my-6">
                <Hsd />
              </div>
            ) : null}
            <IconButton
              className="ml-auto"
              sx={{ color: "#fff7e8" }}
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon color="#2C3718" />
              ) : (
                <ChevronLeftIcon color="#2C3718" />
              )}
            </IconButton>
          </DrawerHeader>

          <List sx={{ backgroundColor: "#373f27" }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {open ? (
                    <BoltIcon sx={{ color: "skyblue" }} />
                  ) : (
                    <div className="flex justify-center">
                      <BoltIcon sx={{ color: "skyblue" }} />
                      <Typography color="skyblue" className="mr-2 text-center">
                        {getUserSystemEnergy()}
                      </Typography>
                    </div>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={"Energy"}
                  sx={{ opacity: open ? 1 : 0, color: "#FFF7E8" }}
                />
                {open ? (
                  <Typography color="skyblue" className="mr-2 text-center">
                    {getUserSystemEnergy()}
                  </Typography>
                ) : null}
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <List sx={{ backgroundColor: "#373f27" }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  setHeaderText("Writing Corner");
                  setDashBoardState(dState.WritingCorner);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {dashBoardState === dState.WritingCorner ? (
                    <EditIcon sx={{ color: "#cda34f" }} />
                  ) : (
                    <EditIcon sx={{ color: "#fff7e8" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={"Writing Corner"}
                  sx={{ opacity: open ? 1 : 0, color: "#fff7e8" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  setHeaderText("Judgment");
                  setDashBoardState(dState.Judgement);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {dashBoardState === dState.Judgement ? (
                    <GavelOutlinedIcon sx={{ color: "#cda34f" }} />
                  ) : (
                    <GavelOutlinedIcon sx={{ color: "#fff7e8" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={"Judgement"}
                  sx={{ opacity: open ? 1 : 0, color: "#fff7e8" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List sx={{ backgroundColor: "#373f27" }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  setHeaderText("Affection Corner");
                  setDashBoardState(dState.AffectionCorner);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {dashBoardState === dState.AffectionCorner ? (
                    <VolunteerActivismIcon sx={{ color: "#cda34f" }} />
                  ) : (
                    <VolunteerActivismIcon sx={{ color: "#fff7e8" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={"Affection Corner"}
                  sx={{ opacity: open ? 1 : 0, color: "#fff7e8" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List sx={{ backgroundColor: "#373f27" }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  setHeaderText("Settings");
                  setDashBoardState(dState.Settings);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {dashBoardState === dState.Settings ? (
                    <SettingsIcon sx={{ color: "#cda34f" }} />
                  ) : (
                    <SettingsIcon sx={{ color: "#fff7e8" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={"Settings"}
                  sx={{ opacity: open ? 1 : 0, color: "#fff7e8" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <List
            sx={{
              backgroundColor: "#373f27",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <ListItem
              disablePadding
              sx={{ display: "block", alignSelf: "flex-end" }}
            >
              <ListItemButton
                onClick={() => {
                  logOut();
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Log Out"}
                  sx={{ opacity: open ? 1 : 0, color: "red" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          sx={{
            width: "100%",
            p: 3,
            backgroundColor: "#E9E7DA",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DrawerHeader />
          <Box className="">{renderSelectedState(dashBoardState)}</Box>
        </Box>
      </Box>
    </main>
  );
};

export default page;
