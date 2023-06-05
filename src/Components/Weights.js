import React, { useState, useEffect } from "react"
import cookie from "cookie"
import Axios from "axios"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import ReactApexChart from "react-apexcharts"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Navigation from "./Navigation"
import { Grid } from "@mui/material"
import Alert from "@mui/material/Alert"

import dayjs from "dayjs"

export default function Weights() {
  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
    }
  }

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
  const [weight, setWeight] = useState("")
  const [date2, setDate2] = useState(`${year}-${month}-${day}`)
  const [weight2, setWeight2] = useState("")
  const [responseData, setResponseData] = useState([])
  const [errorMsg, setErrorMsg] = useState(false)
  const [good, setGood] = useState(false)
  const [screenSize, setScreenSize] = useState(getCurrentDimension())

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener("resize", updateDimension)

    return () => {
      window.removeEventListener("resize", updateDimension)
    }
  }, [screenSize])

  const cookies = cookie.parse(document.cookie)
  const userid = cookies.userid
  // const monthNames = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ]

  const getWeight = () => {
    Axios.get(`http://localhost:4001/weights/${userid}`)
      .then((response) => {
        setResponseData(response.data)
      })
      .catch((error) => {
        console.log("error getweight")
      })
  }
  useEffect(() => {
    getWeight()
  }, [])

  let sortedData = [0]
  let Months = "0"
  // console.log(typeof responseData, responseData);
  if (typeof responseData === "object" && responseData !== null) {
    responseData.sort((a, b) => new Date(a.weigh_in) - new Date(b.weigh_in))
    sortedData = responseData.map((item) => item.weight_lbs)
    Months = responseData.map(
      (item) =>
        new Date(item.weigh_in).toLocaleString("en-us", { month: "short" }) +
        " " +
        item.weigh_in.slice(8, 10)
    )
  }

  const addWeight = () => {
    Axios.post("http://localhost:4001/weights", {
      userId: userid,
      date: date,
      weight: weight,
    })
      .then(() => {
        console.log("success")
        setErrorMsg(false)
        reloadPage()
        setGood(true)
      })
      .catch((error) => {
        console.log("error")
        setGood(false)
        setErrorMsg(true)
      })
  }

  const deleteWeight = () => {
    Axios.delete(`http://localhost:4001/weights/${userid}/${date2}/${weight2}`)
      .then(() => {
        console.log("success")
        setErrorMsg(false)
        reloadPage()
        setGood(true)
      })
      .catch((error) => {
        console.log("error")
        setGood(false)
        setErrorMsg(true)
      })
  }

  const series = [
    {
      name: "Weight",
      data: sortedData,
    },
  ]

  const options = {
    chart: {
      foreColor: "#FFFFFF",
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#FCA311"],
    },
    title: {
      text: "",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#E5E5E5", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: Months,
    },
    colors: ["#FCA311"],
  }

  const reloadPage = () => {
    window.location.reload()
  }

  const newFunction = (obj) => {
    const outputDate = obj.$d
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-")

    const formattedDate = `${outputDate.split("-")[2]}-${
      outputDate.split("-")[0]
    }-${outputDate.split("-")[1]}`
    return formattedDate
  }

  return (
    <Box
      component="form"
      // sx={{
      //   "& > :not(style)": { m: 1, width: "98vw" },
      // }}
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Navigation />
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
        width={window.innerWidth - 50}
        colors={"#FFFFFF"}
      />
      <Box
        sx={{
          "& > :not(style)": {
            display: "flex",
            width: "98vw",
            marginTop: "10px",
            color: "white",
            borderColor: "white",
          },
        }}
      >
        <Grid alignItems="center" justifyContent="space-around">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              defaultValue={dayjs(d)}
              onChange={(newValue) => setDate(newFunction(newValue))}
              sx={{
                svg: { color: "#FFFFFF" },
                input: { color: "#FFFFFF" },
                label: { color: "#FFFFFF" },
              }}
              xs={8}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              defaultValue={dayjs(d)}
              onChange={(newValue) => setDate2(newFunction(newValue))}
              sx={{
                svg: { color: "#FFFFFF" },
                input: { color: "#FFFFFF" },
                label: { color: "#FFFFFF" },
              }}
              xs={4}
            />
          </LocalizationProvider>
        </Grid>

        <Grid alignItems="center" justifyContent="space-around">
          <TextField
            id="Weight"
            label="Weight"
            variant="standard"
            color="success"
            onChange={(e) => {
              setWeight(e.target.value)
            }}
            InputLabelProps={{
              style: { color: "#FFFFFF" },
            }}
            sx={{ input: { color: "#FFFFFF" } }}
          />
          <TextField
            id="Weight"
            label="Weight"
            variant="standard"
            color="success"
            onChange={(e) => {
              setWeight2(e.target.value)
            }}
            InputLabelProps={{
              style: { color: "#FFFFFF" },
            }}
            sx={{ input: { color: "#FFFFFF" } }}
          />
        </Grid>
        <Grid alignItems="center" justifyContent="space-around">
          <Button
            onClick={addWeight}
            variant="contained"
            sx={{
              backgroundColor: "#FCA311",
              ":hover": {
                bgcolor: "#E5E5E5",
                color: "#FCA311",
              },
            }}
          >
            Log
          </Button>
          <Button
            onClick={deleteWeight}
            variant="contained"
            sx={{
              backgroundColor: "#FCA311",
              ":hover": {
                bgcolor: "red",
                color: "#FCA311",
              },
            }}
          >
            Delete
          </Button>
        </Grid>

        {errorMsg ? (
          <Grid alignItems="center" justifyContent="center">
            <Alert variant="filled" severity="error" sx={{ width: "135px" }}>
              Error occurred!
            </Alert>
          </Grid>
        ) : (
          <p></p>
        )}
        {good ? (
          <Grid alignItems="center" justifyContent="center">
            <Alert variant="filled" severity="success">
              Success!
            </Alert>
          </Grid>
        ) : (
          <p></p>
        )}
      </Box>
    </Box>
  )
}
