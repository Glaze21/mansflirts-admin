import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// MUI
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  CssBaseline,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
// Redux
import { connect, useDispatch } from "react-redux";
import { loginA } from "./redux/actions/adminActions";

const useStyles = makeStyles((theme) => ({
  paperLogin: {
    flexShrink: 1,
    margin: theme.spacing(41, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  image: {
    margin: "10px auto 5px auto",
    width: 100,
  },
  submit: {
    display: "grid",
    placeItems: "center",
    width: "auto",
    margin: "40px auto 36px auto",
    "&:hover": {
      backgroundColor: "#bb1354",
    },
  },
}));

function Admin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errors, setErr] = useState({});

  const { loading } = props.data;

  useEffect(() => {
    if (localStorage.a) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (props.data.errors !== null) setErr(props.data.errors);
  }, [props.data.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    dispatch(loginA(userData, history));
  };
  return (
    <Fragment>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paperLogin}>
            <img src="/logo1.jpeg" alt="logo" className={classes.image} />
            <Typography component="h1" variant="h5">
              Ienākt Admin
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                variant="outlined"
                error={errors.email ? true : false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <TextField
                id="password"
                name="password"
                type="password"
                variant="outlined"
                error={errors.password ? true : false}
                value={password}
                onChange={(e) => setPass(e.target.value)}
                margin="normal"
                autoComplete="current-password"
                style={{ display: "block" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Ienākt
              </Button>
              {errors.general && (
                <Typography variant="body2" color="error">
                  {errors.general}
                </Typography>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(Admin);
