import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/useGlobalContext";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

function darkMode() {
  return localStorage.getItem("mode") || themes.winter;
}

function Navbar() {
  const { navbarBgColor, user } = useContext(GlobalContext);

  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [theme, setTheme] = useState(darkMode);
  const handleClick = () => {
    const newTheme = theme == themes.winter ? themes.dracula : themes.winter;
    setTheme(newTheme);
    localStorage.setItem("mode", newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div
        className="duration-300 transition "
        style={{ backgroundColor: navbarBgColor }}
      >
        <div className="navbar align-element">
          <div className="navbar-start">
            <Link to="/" className="font-bold ">
              Kitcheen app
            </Link>
            <div className="dropdown lg:hidden">
              <button
                tabIndex={0}
                role="button"
                className="btn  btn-primary lg:btn-lg mt-3"
              >
                MK
              </button>
            </div>
          </div>

          <div className="navbar-end">
            {user && <p className="mr-3">{user.displayName}</p>}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={`${user.displayName ?? "user"}image`}
                    src={user.photoURL}
                  />
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <NavLinks />

                <button
                  className="btn btn-ghost hover:bg-neutral hover:text-white"
                  onClick={handleClick}
                >
                  <p>Change theme</p>
                </button>
                <button
                  onClick={signOutFunc}
                  className="btn btn-ghost hover:bg-neutral hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ borderWidth: "1.5px", borderColor: "rgba(0, 0, 0, 0.1)" }} />
    </>
  );
}

export default Navbar;
