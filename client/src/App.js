import React from 'react';
import NavBar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Todos from './Components/Todos';
import Admin from './Components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';



function App() {

  
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/todos" roles={["user", "admin"]} component={Todos} />
      <PrivateRoute path="/admin" roles={[ "admin"]} component={Admin} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
    </Router>
  );
}

export default App;
