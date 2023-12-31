import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { ColorModeContext, useMode } from "./config/theme";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Dashboard from "./views/dashboard";
import Users from "./views/users";
import Payments from "./views/payments";
import Bookings from "./views/bookings";
import Rooms from "./views/rooms";
import Events from "./views/events";
import SignIn from "./views/auth";
import { RequireAuth } from "react-auth-kit";
import useSideBarToggle from "./hooks/useSideBarToggle";
import Profile from "./views/profile";

function App() {
  const [theme, colorMode] = useMode();
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  const [isSideBarOpen, setIsSideBarOpen] = useSideBarToggle();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {auth && <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />}
          <main className="content">
            <TopBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth loginPath={"/login"}>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/users"
                element={
                  <RequireAuth loginPath={"/login"}>
                    <Users />
                  </RequireAuth>
                }
              />
              <Route
                path="/payments"
                element={
                  <RequireAuth loginPath={"/login"}>
                    <Payments />
                  </RequireAuth>
                }
              />

              <Route
                path="/bookings"
                element={
                  <RequireAuth loginPath={"/login"}>
                    <Bookings />
                  </RequireAuth>
                }
              />
              <Route
                path="/rooms"
                element={
                  <RequireAuth loginPath={"/login"}>
                    <Rooms />
                  </RequireAuth>
                }
              />
              <Route
                path="/events"
                element={
                  <RequireAuth loginPath={"/login"}>
                    <Events />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth loginPath={"/login"}>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={auth ? <Navigate to="/" /> : <SignIn />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
