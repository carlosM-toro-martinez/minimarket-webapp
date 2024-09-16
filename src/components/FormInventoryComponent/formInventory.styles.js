import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  formWrapper: {
    padding: theme.spacing(2),
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    margin: theme.spacing(2),
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
}));

export default useStyles;
