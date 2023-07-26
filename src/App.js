import { ColorModeContext } from "./theme";
import { useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TopBar from "./views/UI/TopBar";
import SideBar from "./views/UI/SideBar";
import Dashboard from "./views/dashboard";
import Users from "./views/users";
import Payments from "./views/payments";
import Bookings from "./views/bookings";
import Rooms from "./views/rooms";
import Events from "./views/events";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
