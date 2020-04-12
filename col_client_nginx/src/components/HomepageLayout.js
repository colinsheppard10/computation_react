import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeCol from "./HomeCol";
import HomeJess from "./HomeJess";

class HomepageLayout extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
              <Route path='/col' render={(props) => <HomeCol {...props} name='colin' />}/>
              <Route path='/jess' render={(props) => <HomeJess {...props} name='jess' />}/>
            </Switch>
        </BrowserRouter>
    );
  }
}



export default HomepageLayout;
