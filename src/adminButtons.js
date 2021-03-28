import React from "react";
import { logoutUser, updateUserState } from "./redux/actions/adminActions";
// MUI
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  adminBtns: {
    top: 15,
    right: 0,
    position: "absolute",
  },
}));

export function AdminButtons() {
  const classes = useStyles();

  const handlePanel = () => {
    var s = document.getElementById("sideBar");
    if (s.value === "open") {
      s.style.right = "0";
      s.value = "closed";
    } else {
      s.style.right = "-250px";
      s.value = "open";
    }
  };
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className={classes.adminBtns}>
      <Button
        tip="Online"
        color="inherit"
        onClick={() => updateUserState("online")}
      >
        Online
      </Button>
      <Button
        tip="Offline"
        color="inherit"
        onClick={() => updateUserState("offline")}
      >
        Offline
      </Button>
      <Button tip="Rādīt paziņojumus" color="inherit" onClick={handlePanel}>
        <ArrowBackIosIcon style={{ fontSize: 30 }} />
      </Button>
      <Button tip="Izrakstīties" color="inherit" onClick={handleLogout}>
        <KeyboardReturn style={{ fontSize: 30 }} />
      </Button>
    </div>
  );
}

export default AdminButtons;
