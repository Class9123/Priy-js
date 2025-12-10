import Home from "./pages/Home.pri"
import Cart from "./pages/Cart.pri"
import Notification from "./pages/Notification.pri";
import NavBar from "./ui/navbar.pri";
import {
  Router,
  Route
} from "priy/router";

<div>
  <Router default="/cart">
    <Route path="/" component={Home} />
    <Route path="/cart" component={Cart} />
    <Route path="/notification" component={Notification} />
  </Router>
  <NavBar />
</div>