import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: "width 225ms ease-in-out",
    overflowX: "hidden",
  },
  drawerClose: {
    transition: "width 225ms ease-in-out",
    overflowX: "hidden",
    width: 64,
    "@media (min-width: 600px)": {
      width: 90,
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 8px",
    minHeight: 64,
  },
  aside: {
    backgroundColor: "white",
    //boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "16px",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  profileImg: {
    borderRadius: "50%",
    marginRight: "8px",
  },
  profileNameInitial: {
    fontSize: "2rem",
    marginBottom: "-25px",
    marginTop: "-10px",
    fontWeight: 600,
    display: (props) => (props.open ? "none" : "block"),
  },
  profileName: {
    fontSize: "1.125rem",
    fontWeight: 600,
    display: (props) => (props.open ? "block" : "none"),
  },
  profileJob: {
    fontSize: "0.875rem",
    color: "#71717A",
    display: (props) => (props.open ? "block" : "none"),
  },
  listItemIcon: {
    justifyContent: "center",
    minWidth: 0,
  },
  listItemButton: {
    minHeight: 48,
    justifyContent: "center",
  },
  listItemText: {
    transition: "opacity 225ms ease-in-out",
    display: (props) => (props.open ? "block" : "none"),
  },
  activeButton: {
    backgroundColor: "red",
  },
}));

export default useStyles;
