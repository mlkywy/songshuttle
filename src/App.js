import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BrowserRouter>
        <div
          className={
            theme === "dark"
              ? "theme-dark"
              : theme === "light"
              ? "theme-light"
              : theme === "custom1"
              ? "theme-custom1"
              : ""
          }
        >
          <Header />
          <Home />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
