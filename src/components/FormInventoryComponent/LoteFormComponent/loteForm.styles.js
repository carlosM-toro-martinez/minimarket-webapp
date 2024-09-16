import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
