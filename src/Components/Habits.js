import React from "react"
import Navigation from "./Navigation"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Axios from "axios"
import cookie from "cookie"
import { useState, useEffect } from "react"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import DeleteIcon from "@mui/icons-material/Delete"
import { Grid } from "@mui/material"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Alert from "@mui/material/Alert"


export default function Habits() {
  const cookies = cookie.parse(document.cookie)
  const userid = cookies.userid
  const reloadPage = () => {
    window.location.reload()
  }

  const [habitName, setHabitName] = useState("")
  const [responseData, setResponseData] = useState([])
  const [errorMsg, setErrorMsg] = useState(false)
  const [errorMsg2, setErrorMsg2] = useState(false)



  //   const [checked, setChecked] = useState(false)

  const d = new Date()
  const year = d.getFullYear()
  const addZero = (int) => {
    if (int < 10) {
      return "0" + int
    } else {
      return int
    }
  }
  const month = addZero(d.getMonth() + 1)
  const day = addZero(d.getDate())
  const [date, setDate] = useState(`${year}-${month}-${day}`)

  const getHabits = () => {
    Axios.get(`http://localhost:4001/habits/${userid}`)
      .then((response) => {
        setResponseData(response.data)
        console.log("success GET")
      })
      .catch((error) => {
        console.log("error")
      })
  }

  useEffect(() => {
    getHabits()
  }, [])

  const createHabit = () => {
    if (habitName.length > 0) {
      Axios.post("http://localhost:4001/habits", {
        userId: userid,
        habit_name: habitName,
        last_logged: date,
      })
        .then(() => {
          console.log("Success CREATE")
          setErrorMsg(false)
          reloadPage()
        })
        .catch((error) => {
          console.log("error")
        })
    } else {
      setErrorMsg(true)
    }
  }

  const deleteHabit = (id) => {
    Axios.delete(`http://localhost:4001/habits/${userid}/${id}`)
      .then(() => {
        console.log("success DELETE")
        reloadPage()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //   const [checkedItems, setCheckedItems] = useState({})
  //   const [number, setNumber] = useState()

  //   const handleCheckChange = (id) => {
  //     setCheckedItems((prevCheckedItems) => ({
  //       ...prevCheckedItems,
  //       [id]: !prevCheckedItems[id],
  //     }))
  //   }

  const updateStreak = (id, last) => {
    console.log(last)
    console.log(date)

    if (last == date) {
      setErrorMsg2(true)
    } else {
      Axios.put(`http://localhost:4001/habits/1/${date}/${id}`)

        .then(() => {
          console.log("SUCESSSS UPDATE")
          // reloadPage()
        })
        .catch((error) => {
          console.log(error)
        })
    }

    // if (last == date) {
    //     setErrorMsg(true)
    // } else {
    //     // Axios.put(`http://localhost:4001/habits/1/${date}/${id}`)
    //     Axios.put(`http://localhost:4001/habits/1/2023-06-05/${id}`)

    //       .then(() => {
    //         console.log("SUCESSSS UPDATE")
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    // }
  }
    const fix = (logged) => {
        console.log(logged);
        if (logged == date) {
            return "Completed"
          } else {
            return "Not completed"
          }
    }  

  const card = responseData.map((item) => (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      key={item.id}
      sx={{ backgroundColor: "#14213D", color: "white" }}
    >
      <CardContent sx={{ m: 0, textAlign: "left" }}>
        <Typography variant="h5" component="div">
          {item.habit_name}
        </Typography>
        <Typography variant="body1">
          {fix(item.last_logged.substring(0, item.last_logged.indexOf("T")))}
        </Typography>
        <Typography variant="body1">Streak: {item.streak}</Typography>
      </CardContent>
      <CardActions>
        {/* <Checkbox
          checked={checkedItems[item.id] || false}
          onChange={() => updateStreak(item.streak, item.id)}
          sx={{
            color: "white",
            "&.Mui-checked": {
              color: "white",
            },
          }}
        /> */}
        <Button
          onClick={() =>
            updateStreak(
              item.id,
              item.last_logged.substring(0, item.last_logged.indexOf("T"))
            )
          }
          sx={{
            backgroundColor: "#FCA311",
            color: "white",
            ":hover": {
              bgcolor: "#E5E5E5",
              color: "#FCA311",
            },
            m: 1,
          }}
        >
          Completed
        </Button>

        <Button size="small" onClick={() => deleteHabit(item.id)}>
          <DeleteIcon sx={{ color: "white" }} />
        </Button>
      </CardActions>
    </Grid>
  ))

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        color: "white",
        borderColor: "white",
      }}
    >
      <Navigation />
      <Card variant="outlined">{card}</Card>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          id="Name"
          label="Habit Name"
          variant="standard"
          color="success"
          onChange={(e) => {
            setHabitName(e.target.value)
          }}
          InputLabelProps={{
            style: { color: "#FFFFFF" },
          }}
          sx={{ input: { color: "#FFFFFF" } }}
        />
        <Button
          onClick={createHabit}
          sx={{
            backgroundColor: "#FCA311",
            color: "white",
            ":hover": {
              bgcolor: "#E5E5E5",
              color: "#FCA311",
            },
            m: 1,
          }}
        >
          Create Habit
        </Button>
        {errorMsg ? (
          <Grid alignItems="center" justifyContent="center">
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: "135px", m: 1 }}
            >
              Error occurred!
            </Alert>
          </Grid>
        ) : (
          <p></p>
        )}
        {errorMsg2 ? (
          <Grid alignItems="center" justifyContent="center">
            <Alert
              variant="filled"
              severity="error"
              sx={{ width: "300px", m: 1 }}
            >
              You've already completed habit for today!
            </Alert>
          </Grid>
        ) : (
          <p></p>
        )}
      </Grid>
    </Box>
  )
}
