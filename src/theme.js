import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  // typography: {
  //   fontFamily: [
  //     "-apple-system,BlinkMacSystemFont",
  //     "Segoe UI",
  //     "Roboto",
  //     "Oxygen",
  //     "Ubuntu",
  //     "Cantarell",
  //     "Fira Sans",
  //     "Droid Sans",
  //     "Helvetica Neue",
  //     "sans-serif",
  //   ].join(","),
  // },
  palette: {
    primary: {
      light: "#ffffff",
      main: "#EF4183",
      dark: "#c7c7c7",
      contrastText: "#FFF9FC",
    },
    secondary: {
      light: "#ffa7d6",
      main: "#ed75a5",
      dark: "#b84476",
      contrastText: "#fafafa",
    },
    userPreview: {
      light: "#f988c8",
      main: "#461a61",
      dark: "#c45797",
      contrastText: "#ef4183",
    },
  },
});
export default theme;
