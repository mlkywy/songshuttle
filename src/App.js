import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Context
import { ThemeContext } from "./context/ThemeContext";

// Components
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <BrowserRouter>
        <div className={themeDictionary[theme]}>
          <Header />
          <Home />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
