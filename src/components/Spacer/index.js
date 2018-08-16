import React from 'react'
import '../../styles/App.css'

class Spacer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
    }
    this.pageSpacer = React.createRef()
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll(){
    if(this.pageSpacer.current){
      let windowTop = (window.pageYOffset || document.documentElement.scrollTop)
      let windowBottom = windowTop + window.innerHeight
      let elementBottom = this.pageSpacer.current.offsetTop
      if(windowBottom > elementBottom){
        this.setState({collapsed: true})
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
  }

  render(){
    return (
      <div>
        {this.state.collapsed && this.props.children}
        {!this.state.collapsed && <div className='page-section-spacer' ref={this.pageSpacer}></div>}
      </div>
    )
  }
}

export default Spacer
