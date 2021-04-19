import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import BooksList from "./BooksList"
import BookForm from "./BookForm"
import BookShow from "./BookShow"
import Stats from "./Stats.js";

import "../assets/main.css"

const App = (props) => {
  // <Route exact path="/under/drawn" component={UnderDrawn} />
  // <Route exact path="/over/due" component={OverDue} />
  // <Route exact path="best/picks" component={BestPicks} />
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/stats" component={Stats} />

      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
