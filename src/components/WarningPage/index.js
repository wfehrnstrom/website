import React from 'react'
import Fade from '@material-ui/core/Fade'
import {NavLink} from 'react-router-dom'

import viewAware from '../../containers/viewAware'
import Button from '../Button'

class WarningPage extends React.Component {
  render(){
    return (
      <Fade in={true} timeout={400}>
        <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontWeight: 200, width: '70%', marginTop: '150px'}}>This website uses flashing effects, potentially causing problems for those with epilepsy.
              Are you okay viewing these effects? Your preferences will be locally cached.</div>
            <NavLink to='/home'>
              <Button style={{marginBottom: '40px', marginTop: '40px', width: '175px', alignSelf: 'center'}} text='Yes, continue' color='primary' type='contained'
                onClick={() => {this.props.setFlashing(true)}}/>
            </NavLink>
            <NavLink to='/home'>
              <Button style={{alignSelf: 'center', width: '350px', height: '75px'}} text='Disable all strobing elements and continue' color='primary'
                onClick={() => {this.props.setFlashing(false)}}/>
            </NavLink>
        </div>
      </Fade>
    )
  }
}

export default viewAware(WarningPage)
