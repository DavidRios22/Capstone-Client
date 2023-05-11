import React from "react"
import { useState } from "react"
import Axios from "axios"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"


export default function Register() {
  // let username = req.body.username
  // let password = req.body.password
  // let firstName = req.body.firstName

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const addUser = () => {
    Axios.post("http://localhost:4001/register", {
      username: username,
      password: password,
      firstName: name
    }).then(() => {
      console.log("success");
    })
  }


  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="Username"
        label="Username"
        variant="standard"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <TextField
        id="Password"
        label="Password"
        variant="standard"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <TextField
        id="Name"
        label="Name"
        variant="standard"
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <Button onClick={addUser} variant="text">Register</Button>
    </Box>
  )
}
