import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Context
import { ThemeContext } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "react-query";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeDev from "./pages/HomeDev";
import { PlaylistProvider } from "./context/PlaylistContext";
import { SearchProvider } from "./context/SearchContext";

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
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <QueryClientProvider client={queryClient}>
        <PlaylistProvider>
          <SearchProvider>
            <BrowserRouter>
              <div className={themeDictionary[theme]}>
                <Header />
                <HomeDev />
                <Footer />
              </div>
            </BrowserRouter>
          </SearchProvider>
        </PlaylistProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;
