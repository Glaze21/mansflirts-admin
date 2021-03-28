// React
import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
// Components
import {
  setAProfiles,
  closeChatA,
  getAllUsers,
  deleteUser,
} from "./redux/actions/adminActions";
import AdminSidePanel from "./adminPanelSide";
import EditDetails from "./EditDetails";
import Messages from "./Messages";
// Util
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import styled from "styled-components";
// MUI
import {
  Select,
  Button,
  ButtonBase,
  Paper,
  List,
  ClickAwayListener,
  Hidden,
  FormControl,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { faKissWinkHeart } from "@fortawesome/free-solid-svg-icons";
import AdminButtons from "./adminButtons";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    maxWidth: 1950,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  centerDiv: {
    maxWidth: 1450,
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    placeContent: "center",
  },
  middleSection: {
    height: "calc(100vh - 9rem)",
    display: "flex",
    flexDirection: "column",
    maxWidth: 950,
    minWidth: 280,
    width: "100%",
    padding: theme.spacing(1, 1, 8, 1),
  },
  leftSection: {
    [theme.breakpoints.up("md")]: {
      height: "calc(100vh - 9rem)",
      maxWidth: "13rem",
      minWidth: "13rem",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(1, 1, 8, 1),
    },
  },
  //
  selectText: {
    fontSize: 21,
    margin: 8,
  },
  submit: {
    placeItems: "center",
    width: "auto",
    margin: "20px auto 36px auto",
    "&:hover": {
      backgroundColor: "#bb1354",
    },
  },
  // USER DETAILS SECTION (LEFT SECTION)
  image: {
    paddingTop: "90%",
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFacts: {
    padding: "0 0.6rem",
  },
  name: {
    fontSize: 24,
    margin: "4px 0 0 0",
  },
  info: {
    marginTop: 6,
    fontSize: 17,
    color: "grey",
  },
  profileFacts: {
    color: "grey",
    fontSize: 16,
    padding: "0.6rem",
    display: "flex",
    flexDirection: "column",
  },
  infoBlock: {
    padding: "6px 0px",
    flexBasis: "100%",
  },
  infoBlockQ: {
    display: "block",
  },
  infoBlockA: {
    display: "block",
  },
  // MIDDLE SECTION
  header: {
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: "0.6rem",
    marginBottom: 3,
    flex: "0 0",
  },
  aboutUser: {
    display: "flex",
    paddingLeft: 12,
    paddingTop: 12,
  },
  title: {
    color: "black",
    height: "auto",
    position: "relative",
    fontSize: 23,
    paddingBottom: 2,
    textDecoration: "none",
    "&:visited": {
      textDecoration: "none",
      color: "black",
    },
  },
  redBadge: {
    width: 12,
    height: 12,
    backgroundColor: "#f53939",
    borderRadius: "50%",
    position: "absolute",
  },
  ringingRed: {
    border: "3px solid #ff4646",
    borderRadius: 30,
    height: 12,
    width: 12,
    top: -3,
    left: -3,
    position: "absolute",
    animation: "$ripple 1.2s infinite ease-in-out",
    opacity: 0.0,
  },
  greenBadge: {
    width: 12,
    height: 12,
    backgroundColor: "#62bd19",
    borderRadius: "50%",
    position: "absolute",
  },
  ringingGreen: {
    border: "3px solid #62bd19",
    borderRadius: 30,
    height: 12,
    width: 12,
    top: -3,
    left: -3,
    position: "absolute",
    animation: "$ripple 1.2s infinite ease-in-out",
    opacity: 0.0,
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.4)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0,
    },
  },
  //
  main: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: "auto",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textLogs: {
    flex: "1 1",
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  list: {
    height: 100,
    padding: ".3rem",
  },
  emojiArea: {
    display: "flex",
    position: "relative",
  },
  emojis: {
    display: "flex",
  },
  textArea: {
    flex: "0 0",
  },
  form: {
    display: "flex",
    height: 55,
  },
  textField: {
    fontSize: 17,
    paddingLeft: 12,
    flex: "1 1",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    border: "0.5px solid grey",
    "&:focus": {
      outline: "grey solid 0px",
      border: "1px solid black",
    },
    "&:hover": {
      border: "0.5px solid black",
    },
  },
  button: {
    fontSize: 16.5,
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 500,
    lineHeight: 1.167,
    letterSpacing: "0em",
    textTransform: "uppercase",
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  giftShopContainer: {
    width: "inherit",
  },
  giftShop: {
    display: "flex",
    flexDirection: "row",
  },
}));

const GiftArea = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-right: 78px;
  display: flex;
  position: absolute;
  bottom: 55px;
  width: -webkit-fill-available;
  width: -moz-available;
  overflow-x: auto;
  /* width */
  ::-webkit-scrollbar {
    height: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  /* Mozilla */
  scrollbar-color: #888 white;
  scrollbar-width: thin;
`;

const StyledImg = styled.img`
  margin: 15px 11px 0 11px;
  :hover {
    margin: 0;
    padding: 0 11px 15px 11px;
    cursor: pointer;
  }
`;

const gifts = [25, 25, 25, 25, 25, 25, 25, 25, 25];

function AdminPanel(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({
    userName1: "",
    userName2: "",
    text: "",
    emojisOpen: false,
    giftsOpen: false,
  });
  const { userName1, userName2 } = state;
  const { allUserData, profile, myProfile } = props.data;
  useEffect(() => {
    if (!localStorage.a) {
      window.location.replace("/login");
    }
    dispatch(getAllUsers());
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    console.log("wtf");
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleScrollBottom = () => {
    let elm = document.getElementById("chatViewport");
    elm.scrollTop = elm.scrollHeight - elm.clientHeight;
  };
  const handleEmojiClick = (emoji) => {
    let text1 = (document.getElementById("textBoxInput").value += emoji.native);
    setState({
      ...state,
      text: text1,
    });
  };
  const handleSubmit = (giftUrl, e) => {
    e.preventDefault();
    if (state.text !== "" || giftUrl) {
      firebase
        .database()
        .ref("/chats/" + props.match.params.usersIds)
        .push({
          text: giftUrl ? giftUrl : state.text,
          timestamp: Date.now(),
          uid: myProfile.userId,
          type: giftUrl ? "gift" : "text",
        })
        .then(() => {
          setState({
            ...state,
            text: "",
          });
          handleScrollBottom();
          closeChatA(profile.docId);
        });
    }
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.leftSection}>
          <Hidden smDown>
            <p className={classes.selectText}> Izvēlēties lietotāju #1</p>{" "}
            <FormControl className={classes.formControl}>
              <Select
                native
                name="userName1"
                value={userName1}
                onChange={handleChange}
              >
                <option value="" />
                {allUserData
                  .filter((data) => data.admin === false)
                  .map((data, key) => (
                    <option key={key} value={[data.userId, data.handle]}>
                      {data.handle}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <br />
            <p className={classes.selectText}>Izvēlēties lietotāju #2</p>
            <FormControl className={classes.formControl}>
              <Select
                native
                name="userName2"
                value={userName2}
                onChange={handleChange}
              >
                <option value="" />
                {allUserData
                  .filter((data) => data.admin === true)
                  .map((data, key) => (
                    <option key={key} value={[data.userId, data.handle]}>
                      {data.handle}
                    </option>
                  ))}
              </Select>
            </FormControl>{" "}
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() =>
                dispatch(
                  setAProfiles(userName2.substr(0, 28), userName1.substr(0, 28))
                )
              }
            >
              {console.log(userName1)}
              Iet
            </Button>{" "}
          </Hidden>
        </div>
        {profile && myProfile && (
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            {console.log(profile)}
            {console.log(myProfile)}
            <div className={classes.leftSection}>
              <Hidden smDown>
                <Paper elevation={5}>
                  <div
                    style={{
                      backgroundImage: `url(${profile.imageUrl})`,
                    }}
                    className={classes.image}
                  />
                  <div className={classes.mainFacts}>
                    <p className={classes.name}>{profile.handle}</p>
                    <p className={classes.info}>
                      {profile.age} gadus
                      {profile.gender === "male"
                        ? " vecs vīrietis "
                        : " veca sieviete "}
                      {profile.location ? "no " + profile.location : ""}
                    </p>
                  </div>
                  <hr style={{ border: "0.1px solid #EF4183", margin: 0 }} />
                  <div className={classes.profileFacts}>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Meklē</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {profile.lookingFor === undefined
                          ? "Nav atbildes"
                          : profile.lookingFor === "female"
                          ? "Sievieti"
                          : profile.lookingFor === "male"
                          ? "Vīrieti"
                          : "Jebkuru"}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Garums</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {profile.height === undefined
                          ? "Nav atbildes"
                          : profile.height}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Smēķē</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {profile.smoke === undefined
                          ? "Nav atbildes"
                          : profile.smoke}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Alkohols</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {profile.drink === undefined
                          ? "Nav atbildes"
                          : profile.drink}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Profesija</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {profile.work === undefined
                          ? "Nav atbildes"
                          : profile.work}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Izglītība</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {profile.education === undefined
                          ? "Nav atbildes"
                          : profile.education}
                      </span>
                    </div>
                  </div>
                </Paper>
              </Hidden>
            </div>
            <div className={classes.middleSection}>
              <Paper elevation={5} className={classes.header}>
                <div>
                  <div className={classes.aboutUser}>
                    <div className={classes.title}>{profile.handle}</div>
                    <div
                      style={{
                        position: "relative",
                        marginTop: 8,
                        marginLeft: 5,
                      }}
                    >
                      {profile.state === "online" ? (
                        <Fragment>
                          <div className={classes.greenBadge} />
                          <div className={classes.ringingGreen} />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div className={classes.redBadge} />
                          <div className={classes.ringingRed} />
                        </Fragment>
                      )}
                    </div>
                    <div style={{ marginLeft: 16 }}>
                      <Button
                        onClick={() =>
                          deleteUser({
                            headers: {
                              userId: profile.userId,
                            },
                          })
                        }
                        style={{ padding: 0 }}
                      >
                        Dzēst
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
              <Paper elevation={4} className={classes.main}>
                <div
                  id="chatViewport"
                  className={classes.textLogs}
                  onLoad={handleScrollBottom}
                >
                  <List className={classes.list}>
                    <Messages
                      uid={myProfile.userId}
                      uid2={props.match.params.usersIds}
                      imageUrl={profile.imageUrl}
                    />
                  </List>
                </div>
                <ClickAwayListener
                  onClickAway={() =>
                    state.giftsOpen && setState({ ...state, giftsOpen: false })
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <GiftArea>
                      <Collapse
                        in={state.giftsOpen}
                        timeout={400}
                        collapsedHeight={27}
                      >
                        <Paper
                          className={classes.giftShopContainer}
                          id="giftShopContainer"
                          onClick={() =>
                            setState({ ...state, giftsOpen: true })
                          }
                        >
                          <div
                            style={{
                              padding: "12px 8px 6px 8px",
                            }}
                          >
                            <div className={classes.giftShop}>
                              {gifts.map((gift, key) => (
                                <div key={key} style={{ textAlign: "center" }}>
                                  <StyledImg
                                    src={`https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/icon_00${
                                      key + 1
                                    }.svg?alt=media`}
                                    alt=""
                                    onClick={handleSubmit.bind(
                                      this,
                                      `https://firebasestorage.googleapis.com/v0/b/mansflirts-5add7.appspot.com/o/icon_00${
                                        key + 1
                                      }.svg?alt=media`
                                    )}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </Paper>
                      </Collapse>
                    </GiftArea>
                    <div className={classes.emojis}>
                      <div style={{ marginTop: "auto", padding: "0px 8px" }}>
                        <ButtonBase
                          onClick={() =>
                            setState({ ...state, emojisOpen: true })
                          }
                          style={{
                            marginRight: 6,
                            borderRadius: 9,
                          }}
                        >
                          <FontAwesomeIcon icon={faKissWinkHeart} size="2x" />
                        </ButtonBase>
                        <ButtonBase
                          onClick={() =>
                            setState({ ...state, giftsOpen: true })
                          }
                          style={{ borderRadius: 5 }}
                        >
                          <FontAwesomeIcon icon={faGift} size="2x" />
                        </ButtonBase>
                      </div>
                      {state.emojisOpen ? (
                        <ClickAwayListener
                          onClickAway={() =>
                            setState({ ...state, emojisOpen: false })
                          }
                        >
                          <div className="picker">
                            <Picker
                              style={{ width: "18em" }}
                              showPreview={false}
                              showSkinTones={false}
                              defaultSkin={1}
                              onClick={handleEmojiClick.bind(this)}
                              native
                              exclude={["flags"]}
                              i18n={{
                                search: "Meklēt",
                                categories: {
                                  recent: "Bieži lietotie",
                                  smileys: "Smaidiņi & cilvēki",
                                  people: "Cilvēki & ķermenis",
                                  nature: "Dzīvnieki & daba",
                                  foods: "Pārtika & dzērieni",
                                  activity: "Aktivitātes",
                                  places: "Ceļojumi & vietas",
                                  objects: "Objekti",
                                  symbols: "Simboli",
                                },
                              }}
                            />
                          </div>
                        </ClickAwayListener>
                      ) : null}
                    </div>
                  </div>
                </ClickAwayListener>
                <div className={classes.textArea}>
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit.bind(this, undefined)}
                    autoComplete="off"
                  >
                    <input
                      id="textBoxInput"
                      name="text"
                      type="text"
                      value={state.text}
                      onChange={handleChange}
                      className={classes.textField}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Sūtīt
                    </Button>
                  </form>
                </div>
              </Paper>
            </div>
            <div className={classes.leftSection}>
              <Hidden xsDown>
                <Paper elevation={5}>
                  <div
                    style={{
                      backgroundImage: `url(${myProfile.imageUrl})`,
                    }}
                    className={classes.image}
                  />
                  <div className={classes.mainFacts}>
                    <div className={classes.name}>
                      {myProfile.handle}{" "}
                      {myProfile.admin && (
                        <Fragment>
                          <span style={{ fontSize: 18 }}>(admin)</span>
                          <EditDetails />
                        </Fragment>
                      )}
                    </div>
                    <p className={classes.info}>
                      {myProfile.age} gadus
                      {myProfile.gender === "male"
                        ? " vecs vīrietis "
                        : " veca sieviete "}
                      {myProfile.location ? "no " + myProfile.location : ""}
                    </p>
                  </div>
                  <hr style={{ border: "0.1px solid #EF4183", margin: 0 }} />
                  <div className={classes.profileFacts}>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Meklē</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {myProfile.lookingFor === undefined
                          ? "Nav atbildes"
                          : myProfile.lookingFor === "female"
                          ? "Sievieti"
                          : myProfile.lookingFor === "male"
                          ? "Vīrieti"
                          : "Jebkuru"}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Garums</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {myProfile.height === undefined
                          ? "Nav atbildes"
                          : myProfile.height}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Smēķē</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {myProfile.smoke === undefined
                          ? "Nav atbildes"
                          : myProfile.smoke}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Alkohols</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {myProfile.drink === undefined
                          ? "Nav atbildes"
                          : myProfile.drink}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Profesija</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {myProfile.work === undefined
                          ? "Nav atbildes"
                          : myProfile.work}
                      </span>
                    </div>
                    <div className={classes.infoBlock}>
                      <span className={classes.infoBlockQ}> Izglītība</span>
                      <span className={classes.infoBlockA}>
                        {" "}
                        {myProfile.education === undefined
                          ? "Nav atbildes"
                          : myProfile.education}
                      </span>
                    </div>
                  </div>
                </Paper>
              </Hidden>
            </div>
          </div>
        )}
        <AdminSidePanel />
        <AdminButtons />
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(AdminPanel);
