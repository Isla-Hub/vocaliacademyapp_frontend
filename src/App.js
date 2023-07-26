import { ColorModeContext } from "./theme";
import { useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./views/UI/TopBar";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <TopBar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;