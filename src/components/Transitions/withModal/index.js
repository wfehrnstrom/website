import React from 'react'
import Modal from '@material-ui/core/Modal'
import {getDisplayName} from '../../../constants/helpers'

function withModal(Component, ComponentInModal = null){
  class withModal extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        open: false
      }
      this.toggle = this.toggle.bind(this)
      this.close = this.close.bind(this)
      this.open = this.open.bind(this)
    }

    toggle(){
      this.setState({open: !this.state.open})
    }

    open(){
      this.setState({open: true})
    }

    close(){
      this.setState({open: false})
    }

    modalStyle(){
      return {marginTop: '5vh', marginLeft: '5vw', width: '90vw', height: '90vh', ...this.props.style}
    }

    render(){
      return (
        <div className='clickable' style={{height: '100%', width: '100%'}}>
          <div ref={this.scrollHook} style={{height: '100%', width: '100%'}} onClick={this.open}>
            <Component {...this.props}/>
          </div>
          <Modal className={'clickable'} disableAutoFocus open={this.state.open} onClose={this.close} style={this.modalStyle()}>
            {this.renderComponentInModal()}
          </Modal>
        </div>
      )
    }

    renderComponentInModal(){
      let propsPassed = {...this.props, onClick: this.toggle}
      if(ComponentInModal){
        return <ComponentInModal {...propsPassed} style={{width: '100%', height: '100%', ...propsPassed.style}}/>
      }
      else{
        return <Component {...propsPassed} style={{width: '100%', height: '100%', ...propsPassed.style}}/>
      }
    }
  }
  withModal.displayName = `withModal(${getDisplayName(Component)})`
  return withModal
}

export default withModal
