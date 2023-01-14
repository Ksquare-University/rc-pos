import * as React from "react";
import { styled } from "@mui/material/styles";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from '@mui/icons-material/Logout';

import {
  Box,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface Props extends MuiAppBarProps {
  open?: boolean;
  children: React.ReactNode;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function DefaultTemplateMenu({ children }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerButtonClick = (e: React.SyntheticEvent) => {
    navigate(`/${e.currentTarget.id}`);
  };
  return (
    <Box>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: "none" }) }}
        >
          <MenuIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Toolbar>
      <Main open={open}>{children}</Main>
      <Drawer
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ marginBottom: "2vh", marginTop: "2vh" }}
          >
            <ListItemButton id="home" onClick={handleDrawerButtonClick}>
              <ListItemIcon>
                <HomeIcon sx={{ fontSize: "35px" }} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ marginBottom: "2vh", marginTop: "2vh" }}
          >
            <ListItemButton id="orders" onClick={handleDrawerButtonClick}>
              <ListItemIcon>
                <ReceiptLongIcon sx={{ fontSize: "35px" }} />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </ListItem>
        </List>
        <List 
        sx={{marginTop: "auto"}}>
        <ListItem
            disablePadding
            sx={{ marginBottom: "2vh", marginTop: "2vh"}}
          >
            <ListItemButton id="logout" onClick={handleDrawerButtonClick}>
              <ListItemIcon>
                <LogoutIcon sx={{ fontSize: "35px" }} />
              </ListItemIcon>
              <ListItemText primary={"login"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
