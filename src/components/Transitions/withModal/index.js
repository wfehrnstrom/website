import React from 'react'
import Modal from '@material-ui/core/Modal'
import {getDisplayName} from '../../../constants/helpers'

function withModal(Component, ComponentInModal = null){
  if(!ComponentInModal){
    class withModal extends React.Component {
      constructor(props){
        super(props)
        this.state = {
          open: false
        }
        this.close = this.close.bind(this)
      }

      close(){
        this.setState({open: true})
      }

      modalStyle(){
        return {position: 'relative', top: '8vh', left: '5vw', width: '90vw', height: '90vh', ...this.props.style}
      }

      render(){
        return (
          <div style={{height: '100%', width: '100%'}}>
            <div style={{height: '100%', width: '100%'}} onClick={this.open}>
              <Component {...this.props}/>
            </div>
            <Modal open={this.state.open} onClose={this.close} style={this.modalStyle()}>
              <Component {...this.props} style={{width: '100%', height: '100%', ...this.props.style}}/>
            </Modal>
          </div>
        )
      }
    }
    withModal.displayName = `withModal(${getDisplayName(Component)})`
    return withModal
  }
  else{
    class withModal extends React.Component {
      constructor(props){
        super(props)
        this.state = {
          open: false
        }
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.modalStyle = this.modalStyle.bind(this)
      }

      open(){
        this.setState({open: true})
      }

      close(){
        this.setState({open: false})
      }

      modalStyle(){
        return {position: 'relative', top: '8vh', left: '5vw', width: '90vw', height: '90vh', ...this.props.style}
      }

      render(){
        return (
          <div style={{height: '100%', width: '100%'}}>
            <div style={{height: '100%', width: '100%'}} onClick={this.open}>
              <Component {...this.props}/>
            </div>
            <Modal open={this.state.open} onClose={this.close} style={this.modalStyle()}>
              <ComponentInModal {...this.props} style={{width: '100%', height: '100%', ...this.props.style}}/>
            </Modal>
          </div>
        )
      }
    }
    withModal.displayName = `withModal(${getDisplayName(Component)})`
    return withModal
  }
}

export default withModal
