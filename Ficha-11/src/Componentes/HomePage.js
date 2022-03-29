import { Navigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import "./HomePage.css";

export function HomePage(props) {
  const navigate = useNavigate();
  return (
    <div>
      <Grid
        container
        spacing={5}
        maxWidth="xl"
        style={{ marginLeft: "50px", marginTop: "50px" }}
      >
        {props.veggies &&
          props.veggies.map((e) => {
            return (
              <Grid key={e.name} item xs={3}>
                <Card onClick={() => navigate("/home/" + e.id)}>
                  <CardMedia
                    component="img"
                    alt={e.name}
                    height="400"
                    image={e.url}
                  />
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
