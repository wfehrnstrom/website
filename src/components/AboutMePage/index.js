import React from 'react'
import Button from '@material-ui/core/Button'
import '../../styles/AboutMePage.css'

class AboutMePage extends React.Component {
  constructor(props){
    super(props)
  }

  contactMe(){
    let contactPage = document.querySelectorAll('.contact-me-title')[0]
    contactPage.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
  }

  render(){
    return (
      <div className='about-me page-section' style={{paddingTop: '20vh', backgroundColor: '#FF5959'}}>
        <div className='about-me-title' style={{color: 'white'}}>About Me.</div>
        <div className='about-me-content' style={{color: 'black', marginTop: '30px'}}>They say brevity is the soul of wit, so I'll keep this short. I'm studying Computer Science at UCLA.
          I love to solve problems, write, read, run, hike, and climb.  <br/><Button variant='outlined' style={{textTransform: 'none', marginTop: '20px'}}><strong onClick={this.contactMe}>Let's get in touch.</strong></Button>
        </div>
      </div>
    )
  }
}

export default AboutMePage
