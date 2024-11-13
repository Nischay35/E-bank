import './App.css'
import Home from "./components/Home"
import LoginForm from "./components/LoginForm"
import NotFound from "./components/NotFound"
import {Route,Switch} from "react-router-dom"
const App = () => (
   <Switch>
   <Route exact path="/ebank/login" component={LoginForm}/>
   <Route exact path="/" component={Home}/>
   <Route component={NotFound}/>
   </Switch>
)
export default App