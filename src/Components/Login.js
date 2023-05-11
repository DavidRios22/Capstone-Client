import React from 'react'
import { useState } from 'react'
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

export default function Login() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="username" label="Standard" variant="standard" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
  )
}