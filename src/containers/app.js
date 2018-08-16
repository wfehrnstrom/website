import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Media from '../components/Media'
import Projects from '../components/Projects'
import Blog from '../components/Blog'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/home' component={Home}/>
          <Route path='/media' component={Media}/>
          <Route path='/projects' component={Projects}/>
          <Route path='/blog' component={Blog}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
