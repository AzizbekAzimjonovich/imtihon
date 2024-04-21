import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="align-element">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
