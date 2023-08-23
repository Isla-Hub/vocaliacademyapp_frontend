import { ColorModeContext } from "./config/theme";
import { useMode } from "./config/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import TopBar from "./views/UI/TopBar";
import SideBar from "./views/UI/SideBar";
import Dashboard from "./views/dashboard";
import Users from "./views/users";
import Payments from "./views/payments";
import Bookings from "./views/bookings";
import Rooms from "./views/rooms";
import Events from "./views/events";
import SignIn from "./views/auth";
import { useIsAuthenticated } from "react-auth-kit";
import { useEffect } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/login" />;
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {auth && <SideBar />}
          <main className="content">
            <TopBar />
            <Routes>
              <Route
                path="/"
                element={<PrivateRoute Component={Dashboard} />}
              />
              <Route
                path="/users"
                element={<PrivateRoute Component={Users} />}
              />
              <Route
                path="/payments"
                element={<PrivateRoute Component={Payments} />}
              />
              <Route
                path="/bookings"
                element={<PrivateRoute Component={Bookings} />}
              />
              <Route
                path="/rooms"
                element={<PrivateRoute Component={Rooms} />}
              />
              <Route
                path="/events"
                element={<PrivateRoute Component={Events} />}
              />
              <Route
                path="/login"
                element={auth ? <Navigate to="/" /> : <SignIn />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
