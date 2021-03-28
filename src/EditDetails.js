import React, { Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { editUserDetails } from "./redux/actions/adminActions";
// MUI
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/styles";

const cities = require("./cities.js");

const useStyles = makeStyles((theme) => ({
  button: {
    verticalAlign: "middle",
    float: "right",
  },
  editIcon: {
    fontSize: 24,
  },
  formControl: {
    alignSelf: "center",
    margin: "5px auto 5px auto",
    paddingBottom: 10,
  },
}));

const CssSelectField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "pink",
      },
      "&:hover fieldset": {
        borderColor: "#EF4183",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#EF4183",
      },
    },
  },
})(FormControl);

function EditDetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    handle: "",
    bio: "",
    website: "",
    location: "",
    education: "",
    work: "",
    drink: "",
    smoke: "",
    height: "",
  });
  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = (credentials) => {
    setInfo({
      handle: credentials.handle ? credentials.handle : "",
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
      education: credentials.education ? credentials.education : "",
      work: credentials.work ? credentials.work : "",
      drink: credentials.drink ? credentials.drink : "",
      smoke: credentials.smoke ? credentials.smoke : "",
      height: credentials.height ? credentials.height : "",
    });
  };
  const maxLengthCheck = (e) => {
    if (info.height.length > 2) {
      e.target.value = e.target.value.slice(0, 3);
    }
  };
  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(props.data.myProfile);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    const userDetails = {
      handle: info.handle,
      bio: info.bio,
      website: info.website,
      location: info.location,
      education: info.education,
      work: info.work,
      drink: info.drink,
      smoke: info.smoke,
      height: info.height,
    };
    dispatch(editUserDetails(userDetails));
    handleClose();
  };
  return (
    <Fragment>
      <Button
        tip="Rediģēt informāciju"
        onClick={handleOpen}
        className={classes.button}
      >
        <EditIcon className={classes.editIcon} />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle> Izmainīt savu informāciju </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="handle"
              type="text"
              label="Vārds"
              placeholder="Kā tevi sauc?"
              className={classes.textField}
              value={info.handle}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: "17" }}
            />
            <TextField
              name="bio"
              type="text"
              label="Apraksts"
              multiline
              rows="6"
              placeholder="Īss apraksts par tevi."
              className={classes.textField}
              value={info.bio}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: "260" }}
            />
            <CssSelectField className={classes.formControl} fullWidth>
              <InputLabel>Dzīves vieta</InputLabel>
              <Select
                margin="dense"
                id="locationSelect"
                value={info.location}
                onChange={handleChange}
                name="location"
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </CssSelectField>
            <TextField
              name="education"
              type="text"
              label="Izglītība"
              placeholder="Iestāde kuru esi pabeidzis vai kurā šobrīd studē."
              className={classes.textField}
              value={info.education}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: "32" }}
            />
            <TextField
              name="work"
              type="text"
              label="Darba vieta"
              placeholder="Kur tu strāda?"
              className={classes.textField}
              value={info.work}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: "32" }}
            />
            <CssSelectField className={classes.formControl} fullWidth>
              <InputLabel>Vai tu dzer alkaholu?</InputLabel>
              <Select
                margin="dense"
                name="drink"
                value={info.drink}
                onChange={handleChange}
              >
                <MenuItem value="Nedzeru">Nedzeru</MenuItem>
                <MenuItem value="Tikai svētkos">Tikai svētkos</MenuItem>
                <MenuItem value="Dažreiz">Dažreiz</MenuItem>
                <MenuItem value="Bieži">Bieži</MenuItem>
              </Select>
            </CssSelectField>
            <CssSelectField className={classes.formControl} fullWidth>
              <InputLabel>Vai tu smēķē?</InputLabel>
              <Select
                margin="dense"
                name="smoke"
                value={info.smoke}
                onChange={handleChange}
              >
                <MenuItem value="Nesmēķēju">Nesmēķēju</MenuItem>
                <MenuItem value="Dažreiz">Dažreiz</MenuItem>
                <MenuItem value="Bieži">Bieži</MenuItem>
              </Select>
            </CssSelectField>
            <TextField
              name="height"
              label="Garums (cm)"
              placeholder="Tavs augums cm"
              className={classes.textField}
              value={info.height}
              onChange={handleChange}
              fullWidth
              type="number"
              onInput={maxLengthCheck}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Atcelt</Button>
          <Button onClick={handleSubmit}>Saglabāt</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(EditDetails);
