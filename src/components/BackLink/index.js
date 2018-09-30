import React from 'react'
import Image from '../Image'
import '../../styles/ButtonPageLink.css'
import backArrow from '../../res/vector/back_arrow.svg'
import Zoom from '@material-ui/core/Zoom'


const BackLink = (props) => {
  let checked = true
  return (
    <div className = 'button-page-link back-link'>
      <Zoom in={checked}>
        <div className='circle-button' style={{width: '100%', height: '100%'}} onClick={() => {
          checked = false;
          props.history.goBack();
        }}>
          <Image src={backArrow} alt='Back Arrow' style={{objectFit: 'contain'}}/>
        </div>
      </Zoom>
    </div>
  )
}

export default BackLink
