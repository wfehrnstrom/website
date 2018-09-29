import React from 'react'
import PageTitle from '../../PageTitle'
import Fade from '@material-ui/core/Fade'
import Grow from '@material-ui/core/Grow'
import HomeLink from '../../HomeLink'
import BackLink from '../../BackLink'
import {STATUS} from '../../../constants'
import '../../../styles/DefaultProjectPage.css'
import github from '../../../res/img/logos/github.png'

class DefaultProjectPage extends React.Component {
  constructor(props){
    super(props)
    this.STATUS_MAPPING = new Map([[STATUS["COMPLETED"], {tag: "COMPLETED", tagColor: "#06C806"}], [STATUS["ACTIVE"], {tag: "ACTIVE", tagColor: "#4BB2FD"}], [STATUS["TERMINATED"], {tag: "TERMINATED", tagColor: "#EF1010"}]])
  }

  renderStatus(){
    let status = this.STATUS_MAPPING.get(this.props.project.status).tag
    let statusColor = this.STATUS_MAPPING.get(this.props.project.status).tagColor
    return (
        <div className='header-link project-status'>
          <div className='sublabel'>Status</div>
          <Grow in timeout={750}>
            <div className='status label' style={{marginTop: '10px', backgroundColor: statusColor, padding: '5px', borderRadius: '2px'}}>{status}</div>
          </Grow>
        </div>
    )
  }

  renderDates(){
    return (
      <div className='header-link project-dates'>
        <div className='sublabel'>Start</div>
        <div className='label' style={{marginTop: '10px'}}>{this.props.project.createdOn.toDateString()}</div>
      </div>
    )
  }

  renderLinks(){
    return (
      <div className='header-link project-links'>
        {this.mapLinksToImages()}
      </div>
    )
  }

  mapLinksToImages(){
    return this.props.project.urls.map((url) => {
      let image = this.selectImageBasedOnURL(url)
      return (<a className='project-link' key={url} href={url}><img src={image} alt={url}/></a>)
    })
  }

  selectImageBasedOnURL(url){
    if(url.toLowerCase().indexOf("github") !== -1){
      return github
    }
    return ""
  }

  render(){
    return (
      <div className='page-root'>
        <div className='project-title-bar'>
          <Fade in timeout={400}>
            <PageTitle className='page-title' text={[this.props.project.title, '']}/>
          </Fade>
          <HomeLink/>
          <BackLink history={this.props.history}/>
          {this.props.project && this.renderProjectContents()}
        </div>
      </div>
    )
  }

  renderProjectContents(){
    return (
      <div className='project-contents'>
        {this.renderProjectHeader()}
        {this.renderProjectSummary()}
      </div>
    )
  }

  renderProjectHeader(){
    return (
      <div className='project-header-links main-section'>
        {this.props.project.status !== null && this.renderStatus()}
        {this.props.project.createdOn && this.renderDates()}
        {this.props.project.urls && this.renderLinks()}
      </div>
    )
  }

  renderProjectSummary(){
    return (
      <div className='project-summary main-section'>
        <div className='superlabel' style={{marginBottom: '10px'}}>Project Summary</div>
        <div className='project-summary-text'>
          {this.props.project.summary}
        </div>
      </div>
    )
  }
}

export default DefaultProjectPage
