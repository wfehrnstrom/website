import React from 'react'
import PageTitle from '../PageTitle'
import PhotoGrid from '../PhotoGrid'
import Fade from '@material-ui/core/Fade'

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
          {this.props.media && <PhotoGrid rowHeight={'300px'} images={this.props.media}/>}
        </div>
    )
  }
}

export default Media
