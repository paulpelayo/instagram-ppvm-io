import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import QueueComponent from '../queue/QueueComponent';
import ViewComponent from '../view/ViewComponent';
import App from '../app/App';

import {
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap/';




function RoutesComponent() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/view">View</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/queue">Queue</Link>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <div>
        <Switch>
          <Route path="/view">
            <ViewComponent />
          </Route>
          <Route path="/queue">
            <QueueComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default RoutesComponent;
