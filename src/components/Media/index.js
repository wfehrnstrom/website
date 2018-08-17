import React from 'react'
import PageTitle from '../PageTitle'
import PhotoGrid from '../PhotoGrid'

class Media extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='page-root'>
        <PageTitle text={['media', 'peruse()']} style={{marginLeft: '5vw', paddingTop: '2vh'}}/>
        {/* <PhotoGrid/> */}
      </div>
    )
  }
}

export default Media
