import React from 'react'
import PageTitle from '../PageTitle'
import PhotoGrid from '../PhotoGrid'
// TODO: REMOVE
import Image from '../Image'

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
        <PageTitle text={['media', 'peruse()']} style={{marginLeft: '5vw', paddingTop: '2vh'}}/>
        {this.props.media && <PhotoGrid rowHeight={'300px'} images={this.props.media}/>}
      </div>
    )
  }
}

export default Media
