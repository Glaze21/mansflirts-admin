import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  textMessage: {
    float: "left",
    position: "relative",
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: "10px 10px 10px 0",
    border: "solid white 10px",
    boxShadow: " 0 1px 1px rgba(0, 0, 0, .2)",
    "&::before": {
      content: `''`,
      position: "absolute",
      bottom: 0,
      left: -1,
      border: "16px solid transparent",
      borderTopColor: "white",
      borderBottom: 0,
      borderLeft: 0,
      marginLeft: -9,
      marginBottom: -22,
    },
  },
  date: {
    position: "absolute",
    bottom: -10,
    left: 85,
    color: "grey",
  },
  textMessageSent: {
    direction: "ltr",
    float: "right",
    position: "relative",
    backgroundColor: "white",
    padding: "2px 10px 2px",
    borderRadius: "10px 10px 0 10px",
    border: "solid white 10px",
    boxShadow: " 0 1px 1px rgba(0, 0, 0, .2)",
    "&::after": {
      content: `''`,
      position: "absolute",
      bottom: 0,
      right: -10,
      border: "16px solid transparent",
      borderTopColor: "white",
      borderBottom: 0,
      borderRight: 0,
      marginLeft: -11,
      marginBottom: -22,
    },
  },
  dateSent: {
    position: "absolute",
    bottom: -10,
    right: 35,
    color: "grey",
  },
  gif: {
    borderRadius: 10,
    width: 200,
  },
}));

function Messages(props) {
  const classes = useStyles();
  const [chats, setChats] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const handleChats = () => {
      firebase
        .database()
        .ref("/chats/" + props.uid2)
        .on("value", (snapshot) => {
          var chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });
          setChats(chats);
        });
    };
    handleChats();
    return () => {
      firebase
        .database()
        .ref("/chats/" + props.uid2)
        .off();
    };
  }, [location, props.uid2]);

  return (
    <div className={classes.chat}>
      {chats !== undefined &&
        chats.map((chatMessage) => {
          const date = new Date(chatMessage.timestamp);
          if (
            ![firebase.auth().currentUser.uid, props.uid].includes(
              chatMessage.uid
            )
          ) {
            return (
              <ListItem
                id={"LI " + chatMessage.timestamp}
                alignItems="flex-start"
                key={chatMessage.timestamp}
                className="listItem"
                style={{ marginBottom: 10 }}
              >
                {chatMessage.type === "gift" ? (
                  <Fragment>
                    <ListItemAvatar style={{ alignSelf: "flex-end" }}>
                      <Avatar alt="Remy Sharp" src={props.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <img
                          style={{ float: "left" }}
                          alt=""
                          src={chatMessage.text}
                        />
                      }
                      secondary={
                        <Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.date}
                          >
                            {date.toLocaleTimeString(["lv-LV"], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </Fragment>
                      }
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <ListItemAvatar style={{ alignSelf: "flex-end" }}>
                      <Avatar alt="Remy Sharp" src={props.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          component="span"
                          variant="body1"
                          className={classes.textMessage}
                          color="textPrimary"
                        >
                          {chatMessage.text}
                        </Typography>
                      }
                      secondary={
                        <Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.date}
                          >
                            {date.toLocaleTimeString(["lv-LV"], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </Fragment>
                      }
                    />
                  </Fragment>
                )}
              </ListItem>
            );
          } else {
            return (
              <ListItem
                id={"LI " + chatMessage.timestamp}
                alignItems="flex-start"
                key={chatMessage.timestamp}
                style={{ marginBottom: 10, direction: "rtl" }}
              >
                {chatMessage.type === "gift" ? (
                  <ListItemText
                    primary={
                      <img
                        style={{ float: "right" }}
                        alt=""
                        src={chatMessage.text}
                      />
                    }
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.dateSent}
                        >
                          {date.toLocaleTimeString(["lv-LV"], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </Fragment>
                    }
                  />
                ) : (
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        variant="body1"
                        className={classes.textMessageSent}
                        color="textPrimary"
                      >
                        {chatMessage.text}
                      </Typography>
                    }
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.dateSent}
                        >
                          {date.toLocaleTimeString(["lv-LV"], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </Fragment>
                    }
                  />
                )}
              </ListItem>
            );
          }
        })}
    </div>
  );
}

export default Messages;
