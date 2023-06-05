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

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    //* START OF AXIOS

    Axios.post("http://localhost:4001/login", {
      username: data.get("username"),
      password: data.get("password"),
    })
      .then((results) => {
        // console.log(results.data)
        document.cookie = `userid=${results.data[0]};max-age=60*100000`
        document.cookie = `name=${results.data[1]};max-age=60*100000`
        document.cookie = `loggedIn=True;max-age=60*1000`

        console.log("success")
        setNavigate(true)
      })
      .catch((error) => {
        console.log("error")
        setErrorMsg(true)
      })
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
            Sign in
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
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
              sx={{ input: { color: "#FFFFFF" } }}
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
                Username or Password are incorrect!
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
              Sign In
            </Button>
            <Link
              href="/register"
              variant="body2"
              sx={{
                display: "block",
                textAlign: "center",
                color: "#E5E5E5",
                textDecorationColor: "white",
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
