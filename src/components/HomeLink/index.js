import React from 'react'
import wfsmall from '../../res/vector/home.svg'
import '../../styles/ButtonPageLink.css'
import {Link} from 'react-router-dom'
import Image from '../Image'
import Zoom from '@material-ui/core/Zoom'

const HomeLink = (props) => {
  return (
    <Link to='/home'>
      <div className = 'button-page-link home-link' style={{zIndex: '10'}}>
        <Zoom in>
          <div className='circle-button' style={{width: '100%', height: '100%'}}>
            <Image src={wfsmall} alt={'w.f'} style={{objectFit: 'contain'}}/>
          </div>
        </Zoom>
      </div>
    </Link>
  )
}

export default HomeLink
