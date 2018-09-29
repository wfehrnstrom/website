import React from 'react'
import '../../styles/ContactMePage.css'
import {toLinkString} from '../../constants/helpers'
import TextField from '@material-ui/core/TextField'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import SendIcon from '@material-ui/icons/Send'
import memoize from 'memoize-one'
import Button from '@material-ui/core/Button'
import green from '@material-ui/core/colors/green'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242'
    },
    secondary: green,
    error: {
      main: '#FF5959'
    }
  }
})

class ContactMePage extends React.Component {
  constructor(props){
    super(props)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
    this.resetFormValues = this.resetFormValues.bind(this)
    this.state = {
      showButton: false,
      validEmail: true,
      email: '',
      title: '',
      message: ''
    }
  }

  validEmail(email){
    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/
    return regex.test(String(email).toUpperCase()) || email.length === 0
  }

  validForm = memoize((email, title, message) => {
    return (this.validEmail(email) && email.length > 0 && title.length > 0 && message.length > 0)
  })

  onEmailChange(event){
    let email = event.target.value
    if(!this.validEmail(email) && this.state.validEmail){
      this.setState({validEmail: false})
    }
    else if(this.validEmail(email) && !this.state.validEmail){
      this.setState({validEmail: true})
    }
    this.setState({email: email})
  }

  onTitleChange(event){
    let title = event.target.value
    this.setState({title: title})
  }

  onMessageChange(event){
    let message = event.target.value
    this.setState({message: message})
  }

  renderSubmit(){
    let subject = toLinkString(this.state.title)
    let body = toLinkString(this.state.message)
    return (
      <Fade in={true} timeout={1000}>
        <a href={`mailto:wfehrnstrom@gmail.com?subject=${subject}&body=${body}`} onClick={this.resetFormValues}>
          <Button style={{textTransform: 'none', marginTop: '40px', borderRadius: '2px'}} variant='outlined'>
            Submit
            <SendIcon style={{marginLeft: '10px'}}/>
          </Button>
        </a>
      </Fade>
    )
  }

  resetFormValues(){
    this.setState({
      email: '',
      title: '',
      message: ''
    })
  }

  render(){
    return (
      <div className='contact-me page-section'>
        <div className='contact-title-container' style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <div className='contact-me-title'>find me</div>
          <div className='contact-me-title' style={{color: '#FF5959'}}>.</div>
        </div>
        <div className='contact-content-container' style={{height: '80vh'}}>
          <div className='contact-content-subheading' style={{fontWeight: '100'}}>
            <div>Start a Conversation.</div>
            <div>Contact Me.</div>
          </div>
          <div id='contact-form' className='form-container'>
            <MuiThemeProvider theme={theme}>
              <TextField id='email' label='Email' error={!this.state.validEmail} style={{width: '100%', marginBottom: '30px'}} value={this.state.email} onChange={this.onEmailChange}/>
              <TextField id='subject' label='Title' style={{width: '100%', marginBottom: '30px'}} value={this.state.title} onChange={this.onTitleChange}/>
              <TextField id='message' label='Message' multiline style={{width: '100%'}} value={this.state.message} onChange={this.onMessageChange}/>
            </MuiThemeProvider>
            {this.validForm(this.state.email, this.state.title, this.state.message) && this.renderSubmit()}
          </div>
        </div>
      </div>
    )
  }
}

export default ContactMePage
