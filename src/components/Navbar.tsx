import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Management App 
        </Typography>
      
        <PrimaryButton
            label="Logout"
            onClick={() => {
                localStorage.removeItem("isAuthenticated");
                navigate("/login", { replace: true });
            }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
