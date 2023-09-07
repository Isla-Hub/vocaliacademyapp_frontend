import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../config/theme";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useAuthUser } from "react-auth-kit";
import logoBlack from "../../assets/logos/logo_black.svg";
import logoWhite from "../../assets/logos/logo_white.svg";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} style={{ textDecoration: "none" }} />
    </MenuItem>
  );
};
const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const auth = useAuthUser();
  const user = auth();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* USER */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "20px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} ml={"15px"}>
                <Box
                  component="img"
                  sx={{
                    height: "50%",
                    width: "50%",
                  }}
                  alt="Vocali Academy Logo"
                  src={theme.palette.mode === "dark" ? logoWhite : logoBlack}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  {isCollapsed ? <MenuOutlinedIcon /> : <MenuOutlinedIcon />}
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && user && (
            <Box mb={"25px"}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <img
                  alt="profile-user"
                  height={"100px"}
                  width={"100px"}
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit"
                  style={{ borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign={"center"}>
                <Typography variant="h2" color={colors.grey[100]} fontWeight={"bold"} sx={{ m: "10px 0 0 0" }}>
                  {user.name} {user.lastName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user.role.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          )}
          {/* MENU ITEMS */}
          <Box pl={isCollapsed ? undefined : "10%"}>
            <Item
              title={"Dashboard"}
              to="/"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Usuarios"}
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Reservas"}
              to="/bookings"
              icon={<EventOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Eventos"}
              to="/events"
              icon={<LocalActivityOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Pagos"}
              to="/payments"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={"Salas"}
              to="/rooms"
              icon={<MeetingRoomOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;
