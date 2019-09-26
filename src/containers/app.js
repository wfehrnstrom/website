import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import {DESKTOP_BREAKPOINT, TABLET_BREAKPOINT, VIEWS} from '../constants'
import ViewContext from './viewContext'

const Loader = Loadable.Map({
  loader: {
    Home: () => import('../containers/homeContainer'),
    Media: () => import('../containers/mediaContainer'),
    Projects: () => import('../containers/projectsContainer'),
    Blog: () => import('../containers/BlogContainer'),
    Warning: () => import('../containers/warningContainer')
  },
  loading: () => null,
  render(loaded, props){
    return (
      <ViewContext.Provider value={props.activeView}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={loaded.Warning.default}/>
            <Route path='/options' component={loaded.Warning.default}/>
            <Route path='/home' component={loaded.Home.default}/>
            <Route path='/media' component={loaded.Media.default}/>
            <Route path='/blog' component={loaded.Blog.default}/>
            <Route path='/projects' component={loaded.Projects.default}/>
          </Switch>
        </BrowserRouter>
      </ViewContext.Provider>
    )
  }
})

class App extends Component {
  constructor(props){
    super(props)
    this.updateView = this.updateView.bind(this)
    let breakpoints
    if(props.breakpoint && props.breakpoints.length === 2){
      breakpoints = props.breakpoints
    }
    else{
      breakpoints = [TABLET_BREAKPOINT, DESKTOP_BREAKPOINT]
    }
    let sizeMap = new Map()
    for(let i = 0; i < 1500; i++){
      if(i <= breakpoints[0]){
        sizeMap.set(i, VIEWS["MOBILE"])
      }
      else if(i > breakpoints[0] && i <= breakpoints[1]){
        sizeMap.set(i, VIEWS["TABLET"])
      }
      else{
        sizeMap.set(i, VIEWS["DESKTOP"])
      }
    }
    let width = window.innerWidth
    let view
    if(width < 501){
      view = VIEWS["MOBILE"]
    }
    else if(width < 1001 && width > 500){
      view = VIEWS["TABLET"]
    }
    else{
      view = VIEWS["DESKTOP"]
    }

    this.state = {
      breakpoints: breakpoints,
      activeView: view,
      breakpointMap: sizeMap,
    }
  }

  getBreakpoints(){
    let {breakpoints} = this.props
    if(breakpoints && this.allBreakpointsDefined){
      return this.props.breakpoints
    }
    else{
      breakpoints = this.getPresetBreakpoints()
    }
  }

  allBreakpointsDefined(){
    return this.props.breakpoints.length === 2
  }

  getPresetBreakpoints(){
    return [TABLET_BREAKPOINT, DESKTOP_BREAKPOINT]
  }

  updateView(){
    if(this.state.activeView !== this.state.breakpointMap.get(window.innerWidth) && this.state.breakpointMap.get(window.innerWidth) !== undefined){
      if(window.innerWidth > 1500){
        this.setState({activeView: VIEWS["DESKTOP"]})
      }
      else{
        this.setState({activeView: this.state.breakpointMap.get(window.innerWidth)})
      }
    }
  }

  componentDidMount(){
    window.addEventListener('resize', this.updateView)
    this.updateView()
  }

  componentDidUpdate(){
    this.updateView()
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateView)
  }

  render() {
    return <Loader activeView = {this.state.activeView}/>
  }
}

export default App;
