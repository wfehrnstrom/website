import React from 'react'
import '../../styles/Navbar.css'
import { NavLink } from 'react-router-dom'

const COLUMN = 1
const ROW = 0

class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orientation: this.props.className.includes("row") ? ROW : (this.props.className.includes("column") || this.props.className.includes("vertical") ? COLUMN : ROW),
      noRotate: this.props.noRotate ? true : ((this.props.className.includes("column") || this.props.className.includes("row")) ? true : false),
      navbarBreakpoint: this.props.navbarBreakpoint ? this.props.navbarBreakpoint : 500,
    }
    this.orientation = this.orientation.bind(this)
    this.addBackOpacityTransition = this.addBackOpacityTransition.bind(this)
    this.dotSpring = this.dotSpring.bind(this)
  }

  componentWillMount(){
    let coloring = [];
    for(let i = 0; i < 2; i++){
      if(this.props.textColor && this.props.textColor[i]){
        coloring.push(this.props.textColor[i])
      }
      else{
        coloring.push('black')
      }
    }
    let urls = this.props.elements.map(function(element, i){
      return element.trim().replace(/ /, /_/).toLowerCase()
    })
    this.setState({textColor: coloring, urls: urls})
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.orientation)
    document.removeEventListener('transitionend', this.dotSpring)
    document.removeEventListener('transitionend', this.addBackOpacityTransition)
  }

  addBackOpacityTransition(e){
    e.target.style.transitionProperty = "opacity";
    document.removeEventListener('transitionend', this.addBackOpacityTransition)
  }

  dotSpring(e){
    let target = e.target
    if(target.className === "navbar-dot"){
      target.style.transform = "rotate(0deg)"

    }
    document.removeEventListener('transitionend', this.dotSpring)
    this.transitionEndHandler = document.addEventListener('transitionend', this.addBackOpacityTransition)
  }

  componentDidMount(){
    if(!this.state.noRotate){
      this.resizeHandler = window.addEventListener('resize', this.orientation)
    }
    this.orientation()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.style){
      this.setState({style: nextProps.style})
    }
  }

  setOrientation(orientation){
    this.setState({orientation: orientation})
  }

  orientation(){
    if(this.state.orientation !== COLUMN){
      if(window.innerWidth < this.state.navbarBreakpoint){
        this.setOrientation(COLUMN)
      }
    }
    else if(this.state.orientation !== ROW){
      if(window.innerWidth > this.state.navbarBreakpoint){
        this.setOrientation(ROW)
      }
    }
  }

  navElements(){
    return this.props.elements.map(function(element, i){
      if(this.state.orientation === COLUMN){
        return (
          <NavLink key={i} to={this.state.urls[i]} style={{color: this.state.textColor[1]}}>
            <div className="navbar-item">
              <div className="navbar-text" style={{}}>{element}</div>
              <div className="navbar-dot"></div>
            </div>
          </NavLink>
        )
      }
      else{
        return (
          <NavLink key={i} to={this.state.urls[i]} style={{color: this.state.textColor[0]}}>
            <div className="navbar-item">
              <div className="navbar-text">{element}</div>
              <div className="navbar-dot"></div>
            </div>
          </NavLink>
        )
      }
    }.bind(this))
  }

  render(){
    let classes = `navbar ${this.props.className}`
    if(this.state.orientation === COLUMN){
      // TODO: replace this statement with one that varies depending on whether element is absolutely positioned or in the flow of the page
      let height = '60vh'
      return (<div className={classes} style={{flexDirection: 'column', alignItems: 'flex-start', margin: this.props.margin[1].join(" "), padding: this.props.padding[1].join(" "), height: height, color: this.state.textColor[1], ...this.state.style}}>
          {this.navElements()}
      </div>)
    }
    else{
      return (<div className={classes} style={{flexDirection: 'row', margin: this.props.margin[0].join(" "), padding: this.props.padding[0].join(" "), color: this.state.textColor[0], backgroundColor: '#FFFFFF', ...this.state.style}}>
          {this.navElements()}
      </div>)
    }
  }
}

export default Navbar
