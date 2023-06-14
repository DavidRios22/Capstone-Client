import { Routes, Route, HashRouter } from "react-router-dom"
import Home from "./Components/Home"
import Register from "./Components/Register"
import Weights from "./Components/Weights"
import Habits from "./Components/Habits"

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/weight" element={<Weights />} />
        <Route path="/habits" element={<Habits />} />
      </Routes>
    </HashRouter>
  )
}

export default Router
