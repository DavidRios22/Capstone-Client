import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"
import cookie from "cookie"
import Button from "@mui/material/Button"
import LogoutIcon from "@mui/icons-material/Logout"



const checkAuth = () => {
  const cookies = cookie.parse(document.cookie)
  return cookies["loggedIn"] ? true : false
}


const handleClearCookiesClick = () => {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.trim().split("=")
    console.log(name);
    document.cookie = `${name[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
  window.location.reload(false)
}

export default function Navigation() {
  const cookies = cookie.parse(document.cookie)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#FCA311", color: "#FFFFFF" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello {cookies["name"]}
          </Typography>
          <Button href="/habits" sx={{ color: "#FFFFFF" }}>
            Habits
          </Button>
          <Button sx={{ color: "#FFFFFF" }} href="/weight">
            Weight
          </Button>
          {/* <Link color="inherit" to="/">
            Listings
          </Link> */}

          {checkAuth() ? (
            <Button
              sx={{ color: "#FFFFFF" }}
              href="/"
              onClick={handleClearCookiesClick}
            >
              <LogoutIcon/>
            </Button>
          ) : (
            <Link color="inherit" to="/login">
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
      {/* <AppBar position="static">
        {checkAuth() ? (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            You are logged is as {cookies["name"]}
          </Typography>
        ) : (
          <></>
        )}
      </AppBar> */}
    </Box>
  )
}
