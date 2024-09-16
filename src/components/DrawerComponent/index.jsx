import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReportIcon from "@mui/icons-material/Report";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import useStyles from "./drawer.styles";
import { Link, useLocation } from "react-router-dom";

export default function DrawerComponent({ children }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });
  const location = useLocation();
  const theme = useTheme();

  const handleDrawerOpen = () => setOpen(!open);

  const routes = [
    { path: "/", name: "Inicio", icon: <HomeIcon /> },
    { path: "/ventas", name: "Ventas", icon: <ShoppingCartIcon /> },
    // { path: "/compras", name: "Compras", icon: <ShoppingCartIcon /> },
    {
      path: "/movimiento-caja",
      name: "Movimiento de Caja",
      icon: <AttachMoneyIcon />,
    },
    { path: "/reportes", name: "Reportes", icon: <ReportIcon /> },
    { path: "/almacenes", name: "Almacenes", icon: <StoreIcon /> },
    { path: "/perfil", name: "Perfil", icon: <PersonIcon /> },
    { path: "/trabajadores", name: "Trabajadores", icon: <GroupIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Drawer
        variant="permanent"
        className={open ? classes.drawerOpen : classes.drawerClose}
        classes={{
          paper: open ? classes.drawerOpen : classes.drawerClose,
        }}
      >
        <div className={classes.drawerHeader}>
          <aside className={classes.aside}>
            <div className={classes.profile}>
              {/* <img
                src="https://placehold.co/50x50"
                alt="Profile Picture"
                className={classes.profileImg}
              /> */}
              <div>
                <h2
                  className={classes.profileNameInitial}
                  style={{ display: open ? "none" : "block" }}
                >
                  K
                </h2>
                <h2
                  className={classes.profileName}
                  style={{ display: open ? "block" : "none" }}
                >
                  Kacie Miller
                </h2>
                <p
                  className={classes.profileJob}
                  style={{ display: open ? "block" : "none" }}
                >
                  Principal Applications Officer
                </p>
              </div>
            </div>
          </aside>
        </div>
        <Divider />
        <List>
          {routes.slice(0, 6).map(({ path, name, icon }) => (
            <ListItem key={path} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={path}
                style={{
                  backgroundColor: location.pathname === path ? "red" : "",
                }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  className={classes.listItemText}
                  style={{ display: open ? "block" : "none" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {routes.slice(6).map(({ path, name, icon }) => (
            <ListItem key={path} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={path}
                className={
                  location.pathname === path ? classes.activeButton : ""
                }
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  className={classes.listItemText}
                  style={{ display: open ? "block" : "none" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          flexDirection: "column",
          backgroundColor: "#f9fafc",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        {children}
      </Box>
    </Box>
  );
}
