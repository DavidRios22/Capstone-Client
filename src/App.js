// import "./App.css"
// import { Provider } from "react-redux"
// import { BrowserRouter } from "react-router-dom"
// import Router from "./Router"
// import store from "./Redux/store"
// // import Navigation from "./Components/Navigation"

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Router />
//       </BrowserRouter>
//     </Provider>
//   )
// }

// export default App

import "./App.css"
import { Provider } from "react-redux"
import { BrowserRouter, HashRouter } from "react-router-dom"
import Router from "./Router"
import store from "./Redux/store"
// import Navigation from "./Components/Navigation"

function App() {
  return (
    <Provider store={store}>
        <Router />
    </Provider>
  )
}

export default App
