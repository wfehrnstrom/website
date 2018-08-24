import React from 'react'
import PageTitle from '../PageTitle'
import PhotoGrid from '../PhotoGrid'
import Fade from '@material-ui/core/Fade'
import wfsmall from '../../res/vector/wfsmall.svg'
import Image from '../Image'
import {Link} from 'react-router-dom'

class Media extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.loadMedia()
  }

  render(){
    return (
        <div className='page-root'>
          <Fade in={true} timeout={400}>
            <PageTitle text={['media', 'peruse()']} style={{marginLeft: '5vw', paddingTop: '2vh'}}/>
          </Fade>
          <Link to='/home'>
            <Image src={wfsmall} alt={'w.f'} style={{backgroundColor: 'white', position: 'fixed', width: '3rem', height: '2rem', top: '5vh', right: '5vw', objectFit: 'contain'}}/>
          </Link>
          {this.props.media && <PhotoGrid rowHeight={'300px'} images={this.props.media}/>}
        </div>
    )
  }
}

export default Media
