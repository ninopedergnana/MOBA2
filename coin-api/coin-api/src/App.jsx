import Navbar from './components/Navbar'
import InputView from './views/InputView'
import TableView from './views/TableView'
import DetailView from './views/DetailView'

import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Router>
        <Switch>
          <Route exact path="/">
          <InputView />
          </Route>
          <Route path="/table">
            <TableView />
          </Route>
          <Route path="/detail">
            <DetailView />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
