import '../../styles/App.css'
import React from 'react'
import LocationPageContainer from '../../containers/LocationPageContainer'
import StarterPage from './components/StarterPage'
import AboutMePage from '../AboutMePage'
import ContactMePage from '../ContactMePage'
import Spacer from '../Spacer'
import viewAware from '../../containers/viewAware'


class HomePage extends React.Component {
  constructor(props){
    super(props)
    window.scrollTo(0, 0)
  }

  componentDidMount(){
    document.title = 'Will Fehrnstrom'
  }

  render(){
    return (
      <div className ='page-root'>
        <StarterPage shouldFlash={this.props.shouldFlash}/>
        <div className = 'pages' style={{backgroundColor: '#FFFFFF'}}>
          <Spacer>
            <AboutMePage/>
            <LocationPageContainer/>
            <ContactMePage/>
          </Spacer>
        </div>
      </div>
    )
  }
}

const Home = viewAware(HomePage)

export default Home
