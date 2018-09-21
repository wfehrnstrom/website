import React from 'react'
import wfsmall from '../../res/vector/home.svg'
import '../../styles/HomeLink.css'
import {Link} from 'react-router-dom'
import Image from '../Image'

const HomeLink = (props) => {
  return (
    <Link to='/home'>
      <div className='home-link'>
        <Image src={wfsmall} alt={'w.f'} style={{objectFit: 'contain'}}/>
      </div>
    </Link>
  )
}

export default HomeLink
