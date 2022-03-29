import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Info", "Contacts"];
const navigation = ["/home", "/info", "/contacts"];

export const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="x1">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => {
                  navigate(navigation[index]);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
/*export function () {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home Page
      </button>
      <button
        onClick={() => {
          navigate("/contacts");
        }}
      >
        Info
      </button>
      <button
        onClick={() => {
          navigate("/info");
        }}
      >
        Contacts
      </button>
    </>
  );
}*/
