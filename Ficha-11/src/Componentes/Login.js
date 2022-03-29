import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export function Login(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logIn = () => {
    if (user === "David" && password === "123456") {
      navigate("/home");
      props.doLogin({ name: "David" });
    }
  };

  return (
    <form className="form">
      <TextField
        label="Email"
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
        style={{ backgroundColor: "white" }}
        type="text"
      />
      <br></br>
      <TextField
        label="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        style={{ backgroundColor: "white" }}
        type="password"
      />
      <Button
        type="button"
        color="primary"
        style={{ backgroundColor: "white" }}
        className="form__custom-button"
        onClick={logIn}
      >
        Log in
      </Button>
    </form>
  );
}
