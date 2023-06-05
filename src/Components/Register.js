// import React from "react"
// import { useState } from "react"
// import Axios from "axios"
// import Box from "@mui/material/Box"
// import TextField from "@mui/material/TextField"
// import Button from "@mui/material/Button"

import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Axios from "axios"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import Alert from "@mui/material/Alert"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#14213D",
    },
  },
})

export default function SignIn() {
  const [navigate, setNavigate] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [errorMsg2, setErrorMsg2] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = data.get("username")
    if (
      data.get("username").includes(" ") ||
      data.get("password").includes(" ") ||
      data.get("firstName").includes(" ")
    ) {
      setErrorMsg(false)
      setErrorMsg2(true)
    } else {
      //* START OF AXIOS

      Axios.post("http://localhost:4001/register", {
        username: username,
        password: data.get("password"),
        firstName: data.get("firstName"),
      })
        .then((results) => {
          console.log("success")
          Axios.post("http://localhost:4001/userid", {
            username: username,
          }).then((results) => {
            console.log("this", username)
            console.log(results)
            console.log(results.data[0].id)
            document.cookie = `userid=${results.data[0].id};max-age=60*1000`
            document.cookie = `name=${results.data[0].first_name};max-age=60*100000`
            document.cookie = `loggedIn=True;max-age=60*1000`
          })
          setNavigate(true)
        })
        .catch((error) => {
          console.log(error.response.data)
          setErrorMsg2(false)

          setErrorMsg(true)
        })
    }

    // Axios.post("http://localhost:4001/login", {
    //   username: data.get("first nam"),
    //   username: data.get("username"),
    //   password: data.get("password")
    // })
    //   .then((results) => {
    //     console.log(results.data)
    //     document.cookie = `userid=${results.data};max-age=60*1000`
    //     console.log("success")
    //     setNavigate(true)
    //   })
    //   .catch((error) => {
    //     console.log("error")
    //     setErrorMsg(true)
    //   })
  }

  return (
    <ThemeProvider theme={defaultTheme} sx={{ outerHeight: "10px" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#FCA311" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "white" }}>
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="First Name"
              type="firstName"
              id="firstName"
              autoComplete="current-firstName"
              sx={{ color: "white", input: { color: "#FFFFFF" } }}
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{ color: "white", input: { color: "#FFFFFF" } }}
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ color: "white", input: { color: "#FFFFFF" } }}
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
            />
            {navigate ? <Navigate to="/weight" /> : <p></p>}
            {errorMsg ? (
              <Alert
                variant="filled"
                severity="error"
                sx={{
                  textAlign: "center",
                }}
              >
                Username already exists!
              </Alert>
            ) : (
              <p></p>
            )}
            {errorMsg2 ? (
              <Alert
                variant="filled"
                severity="error"
                sx={{
                  textAlign: "center",
                }}
              >
                Cannot contain spaces!
              </Alert>
            ) : (
              <p></p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#FCA311",
                ":hover": {
                  bgcolor: "#E5E5E5",
                  color: "#FCA311",
                },
              }}
            >
              Sign Up
            </Button>
            <Link
              href="/"
              variant="body2"
              sx={{
                display: "block",
                textAlign: "center",
                color: "#E5E5E5",
                textDecorationColor: "white",
              }}
            >
              {"Have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

// export default function Register() {

//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [name, setName] = useState("")

//   const addUser = () => {
//     Axios.post("http://localhost:4001/register", {
//       username: username,
//       password: password,
//       firstName: name
//     }).then(() => {
//       console.log("success");
//     })
//   }

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& > :not(style)": { m: 1, width: "25ch" },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField
//         id="Username"
//         label="Username"
//         variant="standard"
//         onChange={(e) => {
//           setUsername(e.target.value)
//         }}
//       />
//       <TextField
//         id="Password"
//         label="Password"
//         variant="standard"
//         onChange={(e) => {
//           setPassword(e.target.value)
//         }}
//       />
//       <TextField
//         id="Name"
//         label="Name"
//         variant="standard"
//         onChange={(e) => {
//           setName(e.target.value)
//         }}
//       />
//       <Button onClick={addUser} variant="text">Register</Button>
//     </Box>
//   )
// }
