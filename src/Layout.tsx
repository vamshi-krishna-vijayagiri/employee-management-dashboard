import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box p={3}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
