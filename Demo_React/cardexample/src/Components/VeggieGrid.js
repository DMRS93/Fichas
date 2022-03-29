import { Grid, Card, CardMedia, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function VeggieGrid(props) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={5} maxWidth="xl">
      {props.veggies &&
        props.veggies.map((e) => {
          return (
            <Grid key={e.name} item xs={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt={e.name}
                  height="400"
                  image={e.url}
                  onClick={() => {
                    navigate("/veggie/" + e.id);
                  }}
                />
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      props.addItem(e);
                    }}
                  >
                    {" "}
                    Add To List {e.price}€
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}
