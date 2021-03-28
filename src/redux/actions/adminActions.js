import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import axios from "axios";

export const loginA = (userData, history) => (dispatch) => {
  dispatch({
    type: "SET_LOADING",
  });
  firebase
    .auth()
    .signInWithEmailAndPassword(userData.email, userData.password)
    .then(() => {
      axios
        .post("/loginA")
        .then(() => {
          localStorage.setItem("a", "true");
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: "SET_ERRORS",
            payload: {
              general: "Kaut kas nogāja greizi, lūdzu, mēģiniet vēlreiz",
            },
          });
        });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "SET_ERRORS",
        payload: {
          general: "Kaut kas nogāja greizi, lūdzu, mēģiniet vēlreiz",
        },
      });
    });
};

export const logoutUser = () => {
  firebase.auth().signOut();
  localStorage.removeItem("a");
  window.location = "/login";
};

export const updateUserState = (state) => {
  firebase
    .firestore()
    .collection("users")
    .where("admin", "==", true)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.update({
          state: state,
        });
      });
    });
};

export const setAProfiles = (uid1, uid2, docId) => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios
    .get(`/user/${uid1}`)
    .then((res) => {
      dispatch({
        type: "SET_MYUSER",
        payload: res.data.user,
      });
      axios
        .get(`/user/${uid2}`)
        .then((res) => {
          if (docId) res.data.user.docId = docId;
          dispatch({
            type: "SET_OTHERUSER",
            payload: res.data.user,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const getAllUsers = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      axios
        .post("/getAllUsers", { limit: 5000, lookingFor: "any" })
        .then((res) => {
          dispatch({
            type: "SET_ALLUSERS",
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: "SET_ALLUSERS",
            payload: [],
          });
        });
    }
  });
};

export const listenNotifications = () => (dispatch) => {
  const collection = firebase.firestore().collection("/adminMessages/");
  let users2 = [];

  const observer = collection.onSnapshot(
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          change.doc
            .data()
            .ref.get()
            .then((doc) => {
              users2.push({
                userId: change.doc.data().uid,
                msg: change.doc.data().msg,
                type: change.doc.data().type,
                read: change.doc.data().read,
                recipient: change.doc.data().recipient,
                docId: change.doc.id,
                handle: doc.data().handle,
                imageUrl: doc.data().imageUrl,
                state: doc.data().state,
              });
              dispatch({
                type: "SET_ALLNOTIFICATIONS",
                payload: users2.reverse(),
              });
            });
        }
        if (change.type === "modified") {
          let index = users2.findIndex((x) => x.docId === change.doc.id);
          users2[index].msg = change.doc.data().msg;
          users2[index].read = change.doc.data().read;
          users2[index].type = change.doc.data().type;
          dispatch({
            type: "SET_ALLNOTIFICATIONS",
            payload: users2,
          });
        }
        if (change.type === "removed") {
          let index = users2.findIndex((x) => x.docId === change.doc.id);
          users2.splice(index, 1);
          dispatch({
            type: "SET_ALLNOTIFICATIONS",
            payload: users2,
          });
        }
      });
    },
    () => {
      observer();
    }
  );
};

export const closeChatA = () => {};

export const editUserDetails = (userDetails) => (dispatch, getState) => {
  axios
    .post(
      "/user",
      {
        ...userDetails,
      },
      {
        headers: {
          userId: getState().data.myProfile.userId,
        },
      }
    )
    .then(() => {
      axios
        .get(`/user/${getState().data.myProfile.userId}`)
        .then((res) => {
          console.warn(res.data);
          dispatch({
            type: "SET_MYUSER",
            payload: res.data.user,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const deleteUser = (headers) => {
  axios
    .delete("/deleteProfile", headers)
    .then(() => {
      alert("Profils izdzēsts");
    })
    .catch((err) => {
      console.log(err);
      alert("Kaut kas nogāja greizi");
    });
};
