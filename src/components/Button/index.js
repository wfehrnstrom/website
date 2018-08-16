import React from 'react'
import Button from '@material-ui/core/Button'
import '../../styles/Button.css'

const MyButton = (props) => {
    let {text, color, type, onClick} = props
    return (
      <Button className="primary-button" variant={type} color={color} fullWidth={false} style={{textTransform: "none", ...props.style}} onClick={onClick}>
        {text}
      </Button>
    )
}

export default MyButton;
