// import { Routes, Route } from "react-router-dom"
// import Home from "./Components/Home"
// import Register from "./Components/Register"
// import Weights from "./Components/Weights"
// import Habits from "./Components/Habits"

// const Router = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/weight" element={<Weights />} />
//       <Route path="/habits" element={<Habits/>} />
//     </Routes>
//   )
// }

// export default Router

import { Routes, Route } from "react-router-dom"
import Home from "./Components/Home"
import Register from "./Components/Register"
import Weights from "./Components/Weights"
import Habits from "./Components/Habits"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/weight" element={<Weights />} />
      <Route path="/habits" element={<Habits/>} />
    </Routes>
  )
}

export default Router

