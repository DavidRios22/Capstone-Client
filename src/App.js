import "./App.css"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import Router from "./Router.js"
import store from "./Redux/store"

function App() {
  return (
    <Provider store={store}>
        {/* <Navigation /> */}
        <Router />
    </Provider>
  )
}

export default App
