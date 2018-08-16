import React from 'react'
import '../../styles/App.css'
import {DESKTOP_BREAKPOINT, TABLET_BREAKPOINT, VIEWS} from '../../constants'
import StarterPage from './components/StarterPage'
import LocationPageContainer from '../../containers/LocationPageContainer'
import Spacer from '../Spacer'


class Home extends React.Component {
  constructor(props){
    super(props)
    this.updateView = this.updateView.bind(this)
    let matchers = []
    let matches = []
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
      view = VIEWS["TABLE"]
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

  updateView(){
    if(this.state.activeView !== this.state.breakpointMap.get(window.innerWidth)){
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

  render(){
    return (
      <div className ='page-root'>
        <StarterPage activeView={this.state.activeView}/>
        <div className = 'pages' style={{backgroundColor: '#FFFFFF'}}>
          <Spacer>
            <LocationPageContainer activeView={this.state.activeView}/>
          </Spacer>
        </div>
      </div>
    )
  }
}

export default Home
