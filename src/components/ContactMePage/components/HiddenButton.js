import React from 'react'
import {COVER_COLOR} from '../../../constants'
import Button from '@material-ui/core/Button'

const HiddenButton = (props) => {
  // if directed to display alternate text on the button
  let toRender = props.buttonMode ? (<Button style={{textTransform: 'none', fontWeight: '100', fontSize: '1.1rem', borderColor: '#FF5959', borderRadius: '5px'}} variant={"outlined"} color={'primary'}>{props.text}</Button>) : (<div>{props.text}</div>)
  return (
    <div className='hidden-button' style={props.style} onClick={props.onClick}>
      {toRender}
    </div>
  )
}

export default HiddenButton
