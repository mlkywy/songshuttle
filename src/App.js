import Header from "./components/Header";
import Home from "./screens/Home";
import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ThemeContext } from "./helper/ThemeContext";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    /*
     * determine the user's theme preferences
     * if they have used the site before, it will be stored in local storage
     * if not, we will use their computer's default dark/light settings
     */
    if (theme === null) {
      const localStorageTheme = localStorage.getItem("theme-choice");
      const userDefaultDark = window.matchMedia("(prefers-color-scheme:dark)");
      if (localStorageTheme) {
        setTheme(localStorageTheme !== "default" ? localStorageTheme : "");
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
