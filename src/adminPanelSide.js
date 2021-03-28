// Redux
import React, { Fragment, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
// Components
import firebase from "firebase/app";
import "firebase/auth";
import { Scrollbars } from "rc-scrollbars";
import {
  setAProfiles,
  listenNotifications,
  closeChatA,
} from "./redux/actions/adminActions";
// MUI
import {
  Button,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  ListItemText,
  Paper,
  List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  titleBox: {
    backgroundColor: "#DB4183",
    color: "white",
    margin: "-16px 0px -8px 0px",
    padding: "12px 0px 15px 12px",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  paperChat: {
    position: "fixed",
    right: 0,
    top: 40,
    height: "88%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: theme.spacing(5),
    width: 236,
    display: "block",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "1.175rem",
    fontWeight: "500",
  },
  chatReqContainer: {
    overflowY: "hidden",
    height: "100%",
    backgroundColor: "white",
  },
  listItem: {
    height: "3rem",
    "&.MuiListItem-secondaryAction": {
      paddingRight: 34,
    },
  },
  userContainer: {
    display: "flex",
    height: "3rem",
  },
  handle: {
    paddingTop: 2,
    height: "auto",
    position: "relative",
    fontSize: 18,
    overflow: "hidden",
  },
  imageWrapper: {
    marginLeft: "-16px",
    display: "block",
    width: 120,
    height: "4rem",
    objectFit: "cover",
    marginRight: "auto",
  },
  chatBtn: {
    fontSize: 11.5,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 500,
    lineHeight: 1.167,
    letterSpacing: "0em",
    textTransform: "uppercase",
    borderRadius: 10,
    maxWidth: 50,
    minWidth: 40,
    marginRight: 8,
    "&:hover": {
      backgroundColor: "#bb1354",
    },
  },
  selected: {
    backgroundColor: "#8080801a",
  },
}));

function AdminPanelSide(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    const cat = localStorage.getItem("a");
    firebase.auth().onAuthStateChanged((user) => {
      if (user && cat === "true") {
        dispatch(listenNotifications());
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleClick = (docId, uid1, uid2) => (e) => {
    dispatch(setAProfiles(uid1, uid2, docId));
    firebase.firestore().doc(`adminMessages/${docId}`).update({
      read: true,
    });
  };
  const {
    data: { allNotifications },
  } = props;
  return (
    <Paper className={classes.paperChat} elevation={2} id="sideBar">
      <div className={classes.titleBox}>
        <span className={classes.title}>Paziņojumi</span>
      </div>
      <hr
        style={{
          border: "0.5px solid #C2C2C2",
          marginBottom: 0,
        }}
      />
      <div className={classes.chatReqContainer}>
        <Scrollbars style={{ height: "100%" }}>
          <List disablePadding>
            {allNotifications.length !== 0 ? (
              allNotifications.map((notif) => {
                let key = allNotifications.findIndex((chat) => chat === notif);
                let user1 = notif.recipient;
                let user2 = notif.userId;
                return (
                  <ListItem
                    key={key}
                    id={`listItem_${key}`}
                    button
                    onClick={handleClick(notif.docId, user1, user2)}
                    className={classes.listItem}
                    divider
                  >
                    <div className={classes.userContainer}>
                      <Avatar
                        alt=""
                        src={notif.imageUrl}
                        style={{
                          alignSelf: "center",
                          marginLeft: -7,
                          marginRight: 4,
                        }}
                      />
                      <div className={classes.handle}>
                        <ListItemText
                          primary={notif.handle}
                          secondary={
                            <Typography
                              style={{
                                marginTop: -7,
                                color: "black",
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                            >
                              {notif.type === "text" ? notif.msg : "Dāvana"}
                            </Typography>
                          }
                        />
                      </div>
                    </div>
                    <ListItemSecondaryAction style={{ right: 8 }}>
                      {notif.read ? (
                        <IconButton
                          className={classes.closeBtn}
                          size="small"
                          onClick={() => {
                            closeChatA(notif.docId);
                          }}
                        >
                          <CloseIcon edge="end" fontSize="inherit" />
                        </IconButton>
                      ) : (
                        <Button
                          className={classes.chatBtn}
                          color="primary"
                          variant="contained"
                          onClick={handleClick(notif.docId, user1, user2)}
                        >
                          Lasīt
                        </Button>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            ) : (
              <Fragment />
            )}
          </List>
        </Scrollbars>
      </div>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(AdminPanelSide);
