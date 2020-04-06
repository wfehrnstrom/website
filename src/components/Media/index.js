import React from 'react'
import PageTitle from '../PageTitle'
import PhotoGrid from '../PhotoGrid'
import Fade from '@material-ui/core/Fade'
import HomeLink from '../HomeLink'

class Media extends React.Component {
  componentDidMount(){
    this.props.loadMedia()
    document.title = "Will's Photos"
  }

  render(){
    return (
        <div className='page-root'>
          <Fade in={true} timeout={400}>
            <PageTitle text={['media', 'peruse()']} style={{marginLeft: '5vw', paddingTop: '2vh'}}/>
          </Fade>
          <HomeLink/>
          {this.props.media && <PhotoGrid rowHeight={'300px'} images={this.props.media}/>}
        </div>
    )
  }
}

export default Media
