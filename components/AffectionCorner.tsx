import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import RealisticButton from "./RealisticButton";
import {
  Box,
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
  LinearProgress,
  createTheme,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import NumberDisplay from "./NumberDisplay";
import { gsap } from "gsap";
import { ThemeProvider } from "@emotion/react";

const hugCost = 25;
const kissCost = 50;
const handHoldCose = 10;

const theme = createTheme({
  palette: {
    primary: {
      main: "#CDA34F", //your color
    },
    secondary: {
      main: "#373f27",
    },
  },
});

function playTimelineAndWait(timeline: any) {
  return new Promise((resolve) => {
    timeline.eventCallback("onComplete", () => {
      resolve("");
    });
    timeline.play();
  });
}

const AffectionCorner = ({ userSystem }: any) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackStatus, setSnackStatus]: any = useState("success");
  const [snackMessage, setSnackMessage] = useState("");
  const [handActive, setHandActive] = useState(false);
  const [hugActive, setHugActive] = useState(false);
  const [kissActive, setKissActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const matchesMD = useMediaQuery("(min-width:720px)");

  const kissRef: any = useRef();
  const manRef: any = useRef();
  const womanRef: any = useRef();
  const handRefLeft: any = useRef();
  const handRefRight: any = useRef();
  const handHeldRef: any = useRef();

  const tLKiss: any = useRef();
  const tLHug: any = useRef();
  const tLHand: any = useRef();

  useEffect(() => {
    tLKiss.current = gsap.timeline();
    tLKiss.current
      .fromTo(
        kissRef.current,
        { display: "block", duration: 6, opacity: 0, rotate: 0, scale: 0.5 },
        { opacity: 1, rotate: 420, ease: "back.out(3)", scale: 40 }
      )
      .to(kissRef.current, {
        duration: 1,
        opacity: 0,
        rotate: 420,
        scale: 30,
        display: "none",
      })

      .add(() => {
        // This function will be triggered when the timeline reaches this point
        console.log("Animation point reached");
        // You can call any other function here as well
        // yourFunctionToBeCalled();
      })
      .pause();

    tLHand.current = gsap.timeline();
    tLHand.current
      .fromTo(
        handRefRight.current,
        {
          display: "block",
          x: 1200,
          y: -400,
          ease: "back.out(3)",
          scale: 10,
          rotate: -120,
          opacity: 0,
        },
        { duration: 1, x: 0, opacity: 1, y: 0, scale: 16 }
      )
      .fromTo(
        handRefLeft.current,
        {
          display: "block",
          opacity: 0,
          x: -1200,
          y: -400,
          ease: "back.out(3)",
          scale: 10,
          rotate: 120,
        },
        { duration: 1, x: 0, opacity: 1, y: 0, scale: 16 },
        0
      )
      .fromTo(
        handHeldRef.current,
        { display: "block", scale: 0, opacity: 0, rotate: 20 },
        { ease: "bounce", rotate: 0, scale: 30, opacity: 1 },
        0.8
      )
      .to(handRefRight.current, { opacity: 0, display: "none" }, 1.1)
      .to(handRefLeft.current, { opacity: 0, display: "none" }, 1.1)
      .to(handHeldRef.current, { opacity: 0, display: "none" }, 1.6)
      .pause();
    tLHug.current = gsap.timeline();
    tLHug.current
      .fromTo(
        manRef.current,
        {
          display: "block",
          scale: 1,
          x: 1000,
          rotateY: 180,
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 2,
          scale: 30,
          x: 100,
          ease: "power4 ",
        }
      )
      .fromTo(
        womanRef.current,
        {
          opacity: 0,
          display: "block",
          scale: 50,
          y: 40,
          x: -1000,
        },
        {
          opacity: 1,
          ease: "power2",
          duration: 1.8,
          scale: 26,

          x: -50,
        },
        0
      )
      .to(
        manRef.current,
        { display: "none", opacity: 0, duration: 1.5, scale: 10, x: 0 },
        1.9
      )
      .to(
        womanRef.current,
        { display: "none", opacity: 0, duration: 1.5, scale: 10, x: 1 },
        1.9
      )
      .pause();
  }, []);

  const closeSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const getUserSystemEnergy = () => {
    let message = 0;

    if (userSystem?.user?.energy != null) {
      message = userSystem.user.energy;
    }

    return message;
  };

  const canGive = (affectionType: String) => {
    switch (affectionType) {
      case "Hand":
        if (getUserSystemEnergy() >= 10) {
          return true;
        }

        return false;
      case "Hug":
        if (getUserSystemEnergy() >= 20) {
          return true;
        }

        return false;
      case "Kiss":
        if (getUserSystemEnergy() >= 40) {
          return true;
        }
        return false;

      default:
        return false;
    }
  };

  const handleGiveAffection = async (affectionType: String) => {
    if (!canGive(affectionType)) {
      setSnackMessage(
        affectionType === "Hand"
          ? "Not enough energy to hold hands."
          : `Not enough energy to give a ${affectionType.toLowerCase()}.`
      );
      setSnackStatus("error");
      setSnackOpen(true);
      return;
    }
    setIsLoading(true);
    const res = await fetch(`/api/giveA`, {
      method: "POST",
      body: JSON.stringify({
        partnerId: userSystem.user.partnerID,
        type: affectionType,
      }),
    });
    const result = await res.json();

    if (result.status === "error") {
      setSnackStatus("error");
      setSnackMessage("Something went wrong. Try again.");
      setSnackOpen(true);
    }

    if (result.status === "success") {
      setSnackStatus("success");
      setSnackMessage(
        affectionType === "Hand"
          ? "You squeezed your partner's hand."
          : `You have given your partner a ${affectionType.toLowerCase()}.`
      );
      switch (affectionType) {
        case "Hand":
          userSystem.setUser({
            ...userSystem.user,
            energy: userSystem.user.energy - 10,
          });
          break;
        case "Hug":
          userSystem.setUser({
            ...userSystem.user,
            energy: userSystem.user.energy - 20,
          });
          break;
        case "Kiss":
          userSystem.setUser({
            ...userSystem.user,
            energy: userSystem.user.energy - 40,
          });
          break;

        default:
          break;
      }
      setIsLoading(false);
      setSnackOpen(true);
    }
  };

  const allAffectionReceived = async () => {
    const res = await fetch(`/api/receiveA`, {
      method: "POST",
      body: JSON.stringify({
        user: userSystem.user.id,
      }),
    });
  };

  const checkIfAffectionCanBeReceived = (id: number, system: any) => {
    if (id === 1) {
      if (system.handForH > 0 || system.hugsForH > 0 || system.kissesForH > 0) {
        return true;
      }
    } else if (id === 2) {
      if (system.handForS > 0 || system.hugsForS > 0 || system.kissesForS > 0) {
        return true;
      }
    }
    return false;
  };

  const giveAffection = async (system: any) => {
    let { hugsForH, kissesForH, handForH, hugsForS, kissesForS, handForS } =
      system;
    if (userSystem.user.id === 1) {
      let { hugsRecieved, kissesRecieved, handsHeld } = userSystem.user;

      while (handForH > 0) {
        setHandActive(true);
        await playTimelineAndWait(tLHand.current.restart());
        setHandActive(false);
        userSystem.setUser({
          ...userSystem.user,
          handsHeld: handsHeld + 1,
        });
        handForH -= 1;
      }
      while (hugsForH > 0) {
        setHugActive(true);
        await playTimelineAndWait(tLHug.current.restart());
        userSystem.setUser({
          ...userSystem.user,
          hugsRecieved: hugsRecieved + 1,
        });

        setHugActive(false);
        hugsForH -= 1;
      }
      while (kissesForH > 0) {
        setKissActive(true);
        await playTimelineAndWait(tLKiss.current.restart());
        userSystem.setUser({
          ...userSystem.user,
          kissesRecieved: kissesRecieved + 1,
        });

        setKissActive(false);
        kissesForH -= 1;
      }
    }
    if (userSystem.user.id === 2) {
      let { hugsRecieved, kissesRecieved, handsHeld } = userSystem.user;
      while (handForS > 0) {
        setHandActive(true);
        await playTimelineAndWait(tLHand.current.restart());
        setHandActive(false);

        userSystem.setUser({
          ...userSystem.user,
          handsHeld: handsHeld + 1,
          hugsRecieved: hugsRecieved,
          kissesRecieved: kissesRecieved,
        });
        handsHeld += 1;
        handForS -= 1;
      }
      while (hugsForS > 0) {
        setHugActive(true);
        await playTimelineAndWait(tLHug.current.restart());
        userSystem.setUser({
          ...userSystem.user,
          handsHeld: handsHeld,
          hugsRecieved: hugsRecieved + 1,
          kissesRecieved: kissesRecieved,
        });
        hugsRecieved += 1;

        setHugActive(false);
        hugsForS -= 1;
      }
      while (kissesForS > 0) {
        setKissActive(true);

        await playTimelineAndWait(tLKiss.current.restart());
        userSystem.setUser({
          ...userSystem.user,
          handsHeld: handsHeld,
          hugsRecieved: hugsRecieved,
          kissesRecieved: kissesRecieved + 1,
        });

        kissesRecieved += 1;
        setKissActive(false);
        kissesForS -= 1;
      }
    }
    allAffectionReceived();
    setIsLoading(false);
  };

  const getUpToDateAffectionNumbers = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/receiveA`, {
      method: "GET",
    });
    const result = await res.json();

    if (result.status === "success") {
      if (!checkIfAffectionCanBeReceived(userSystem.user.id, result.system)) {
        setSnackStatus("info");
        setSnackMessage("Sorry there's no affection for you.");
        setSnackOpen(true);
        setIsLoading(false);
        return;
      }
      giveAffection(result.system);

      userSystem.setSystem(result.system);
    } else if (result.status === "error") {
      setSnackStatus("error");
      setSnackMessage("Something went wrong. Try again.");
      setSnackOpen(true);
      setIsLoading(false);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography
        style={{
          position: "absolute",
          zIndex: 10,
          opacity: 0,
          display: "none",
        }}
        ref={kissRef}
      >
        💋
      </Typography>
      <Typography
        style={{
          position: "absolute",
          zIndex: 10,
          opacity: 0,
          display: "none",
        }}
        ref={handRefRight}
      >
        ✋
      </Typography>
      <Typography
        style={{
          position: "absolute",
          zIndex: 10,
          opacity: 0,
          display: "none",
        }}
        ref={handRefLeft}
      >
        🤚
      </Typography>
      <Typography
        style={{
          position: "absolute",
          zIndex: 10,
          opacity: 0,
          display: "none",
        }}
        ref={handHeldRef}
      >
        🤝
      </Typography>
      <Typography
        style={{
          position: "absolute",
          zIndex: 10,
          opacity: 0,
          display: "none",
        }}
        ref={manRef}
      >
        🕺
      </Typography>
      <Typography
        style={{
          position: "absolute",
          zIndex: 10,
          opacity: 0,
          display: "none",
        }}
        ref={womanRef}
      >
        💃
      </Typography>

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
          display: "flex",
          justifyContent: "space-evenly",
          padding: "1rem",
          margin: "1rem",
          flexDirection: !matchesMD ? "column" : "row",
        }}
      >
        <NumberDisplay
          isActive={handActive}
          title="🤝"
          number={userSystem?.user?.handsHeld}
        />
        <NumberDisplay
          isActive={hugActive}
          title="🤗"
          number={userSystem?.user?.hugsRecieved}
        />
        <NumberDisplay
          isActive={kissActive}
          title="💋"
          number={userSystem?.user?.kissesRecieved}
        />
      </Container>

      <Button
        variant="outlined"
        disabled={isLoading}
        style={{
          display: "flex",
          marginTop: ".75rem",
          padding: "1rem",
          borderColor: "rgb(205 163 79)",
          color: "rgb(55 63 39)",
        }}
        onClick={() => {
          getUpToDateAffectionNumbers();
        }}
      >
        <Typography variant="h5"> Receive Affection</Typography>
      </Button>
      <Typography
        style={{ marginTop: "4rem", color: "rgb(55 63 39)" }}
        variant="h4"
      >
        Give Affection
      </Typography>
      <div className="flex align-items justify-center mt-8 relative">
        <BoltIcon
          sx={{
            right: 30,
            top: 10,
            color: "skyblue",
            display: "flex",
            fontSize: 50,
          }}
        />
        <Typography
          variant="h2"
          color="skyblue"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {getUserSystemEnergy()}
        </Typography>
      </div>
      <div className="flex justify-evenly p-4 m-4 flex-col md:flex-row w-9/12">
        <div className="flex justify-evenly flex-col align-middle text-center">
          <ThemeProvider theme={theme}>
            <span className="bg-gold m-4">
              <Button
                disabled={isLoading}
                variant="contained"
                color="primary"
                sx={{
                  display: "flex",
                  padding: "1rem",
                  width: "100%",
                  color: "rgb(233 231 218)",
                  "&:hover": { backgroundColor: "rgb(55 63 39)" },
                }}
                size="large"
                onClick={() => {
                  handleGiveAffection("Hand");
                }}
              >
                <Typography variant="h5"> Hold 👫</Typography>
              </Button>
            </span>
          </ThemeProvider>

          <Typography className="text-Greenery" variant="body1">
            Cost: 10
          </Typography>
        </div>
        <div className="flex justify-center flex-col align-middle text-center">
          <span className="bg-gold m-4">
            <Button
              disabled={isLoading}
              variant="contained"
              sx={{
                display: "flex",
                width: "100%",
                padding: "1rem",
                color: "rgb(233 231 218)",
                "&:hover": { backgroundColor: "rgb(55 63 39)" },
              }}
              onClick={() => {
                handleGiveAffection("Hug");
              }}
            >
              <Typography variant="h5"> Give 🤗</Typography>
            </Button>
          </span>

          <Typography className="text-Greenery" variant="body1">
            Cost: 20
          </Typography>
        </div>
        <div className="flex justify-center flex-col align-middle text-center">
          <span className="bg-gold m-4">
            <Button
              disabled={isLoading}
              variant="contained"
              sx={{
                display: "flex",
                padding: "1rem",
                width: "100%",
                color: "rgb(233 231 218)",
                "&:hover": { backgroundColor: "rgb(55 63 39)" },
              }}
              onClick={() => {
                handleGiveAffection("Kiss");
              }}
            >
              <Typography variant="h5"> Give 😘</Typography>
            </Button>
          </span>
          <Typography className="text-Greenery" variant="body1">
            Cost: 40
          </Typography>
        </div>
      </div>
      {isLoading ? <LinearProgress color="inherit" className="w-full" /> : null}
    </Container>
  );
};

export default AffectionCorner;
