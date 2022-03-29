import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import styles from "./VeggieInfoLayout.module.css";

export function HomeVegetable(props) {
  const params = useParams();
  let [veggie, setVeggie] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    //Simular um pedido pelo vegetal
    if (!params.id) {
      alert("There's no veggie like that in our shopping list app");
      return;
    }
    setVeggie(props.veggies.find((e) => e.id == params.id));
  }, []);

  return veggie !== {} ? (
    <>
      <img src={veggie.url} />
      <Typography
        variant="h3"
        sx={{
          marginBottom: "2em",
        }}
      >
        {veggie.name}
      </Typography>

      <Typography
        variant="p"
        sx={{
          marginBottom: "2em",
        }}
      >
        {veggie.description}
      </Typography>
    </>
  ) : (
    <Typography variant="h1">I could not find a veggie like that</Typography>
  );
}
