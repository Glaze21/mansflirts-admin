import "./App.css";
// React-router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// Pages
import Login from "./login";
import AdminPanel from "./adminPanel";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Util
import Theme from "./theme.js";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

// eslint-disable-next-line
const history = createBrowserHistory();

firebase.initializeApp({
  apiKey: "AIzaSyAFIeOHjYb3eEItcVrh0d5Sad_6q9rL-Yk",
  authDomain: "mansflirts-5add7.firebaseapp.com",
  databaseURL:
    "https://mansflirts-5add7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mansflirts-5add7",
  storageBucket: "mansflirts-5add7.appspot.com",
  messagingSenderId: "219742985728",
  appId: "1:219742985728:web:3373c63fead92679edc2e5",
  measurementId: "G-35QVFG7SGP",
});

axios.defaults.baseURL =
  "https://europe-west3-mansflirts-5add7.cloudfunctions.net/api";

function onGetCall(config) {
  return config.method === "post";
}
axios.interceptors.request.use(
  async function (config) {
    const idToken = await firebase.auth().currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${idToken}`;
    return config;
  },
  null,
  { runWhen: onGetCall }
);

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={AdminPanel} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
