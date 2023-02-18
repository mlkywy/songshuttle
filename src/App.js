import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { ThemeContext } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "react-query";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";

import { PlaylistProvider } from "./context/PlaylistContext";
import { SearchProvider } from "./context/SearchContext";
import { AudioProvider } from "./context/AudioContext";

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    /*
     * Determine the user's theme preferences
     * If they have used the site before, it will be stored in local storage
     * If not, we will use their computer's default dark/light settings
     */
    if (theme === null) {
      const localStorageTheme = localStorage.getItem("theme-choice");
      const userDefaultDark = window.matchMedia("(prefers-color-scheme:dark)");

      if (localStorageTheme) {
        setTheme(localStorageTheme !== "dark" ? localStorageTheme : "");
      } else {
        setTheme(() => (userDefaultDark ? "dark" : "light"));
      }
    }
  }, [theme]);

  const themeDictionary = {
    dark: "theme-dark",
    light: "theme-light",
    custom1: "theme-custom1",
    custom2: "theme-custom2",
    custom3: "theme-custom3",
    custom4: "theme-custom4",
    custom5: "theme-custom5",
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <QueryClientProvider client={queryClient}>
        <PlaylistProvider>
          <SearchProvider>
            <AudioProvider>
              <BrowserRouter>
                <div className={themeDictionary[theme]}>
                  <Header />
                  {/* <Home /> */}
                  <Routes>
                    <Route path="/songshuttle/" element={<Home />} exact />
                    <Route
                      path="/songshuttle/documentation"
                      element={<Documentation />}
                    />
                  </Routes>
                  <Footer />
                </div>
              </BrowserRouter>
            </AudioProvider>
          </SearchProvider>
        </PlaylistProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;
