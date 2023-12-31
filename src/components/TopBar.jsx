import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../config/theme";
import { useNavigate } from "react-router-dom";
import { tokens } from "../config/theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";

const TopBar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  const signOut = useSignOut();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (to) => {
    setAnchorEl(null);
    if (to) {
      navigate(to);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      {auth && (
        <>
          {!isNonMobile && (
            <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
              <MenuOutlinedIcon />
            </IconButton>
          )}

          <Box display="flex" backgroundColor={colors.primary[400]} borderRadius={"3px"}>
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Buscar usuarios..." />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </>
      )}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={() => colorMode.toggleColorMode()}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        {auth && (
          <>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={handleMenu}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <PersonOutlinedIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: 100,
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose("/profile")}>
                <ListItemIcon>
                  <PersonOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Mi cuenta</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOut();
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Cerrar sesión</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TopBar;
