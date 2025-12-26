import {
  useState,
  useArray,
  mount
} from "priy";
import {
  Router,
  Route,
  replace
} from "priy/router"

/*import Icon from "./utils/lucide.js"
import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import Cart from "./pages/Cart.jsx"
import Profile from "./pages/Profile.jsx"
import Order from "./pages/Order.jsx"
import Nav from "./components/Navbar.jsx"

function App() {
  return <>
    <Router>
      <Route path="/home" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/cart" component={Cart} />
      <Route path="/order" component={Order} />
    </Router>
    <Nav/>
  </>

}
import {
  motion,
  useTransform,
  useMotionValue
} from "@/utils/motion.jsx"
*/
import burgerImg from "@assets/generated_images/gourmet_cheeseburger.png"

function App() {
  const t = {
    style :{
      color:"red"
    }
  }
  return <p {...t}>
      Hello
    </p>
}

const root = document.getElementById('root')
mount(App, root);