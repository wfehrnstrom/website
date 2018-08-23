import React from 'react'
import '../../styles/App.css'
import StarterPage from './components/StarterPage'
import LocationPageContainer from '../../containers/LocationPageContainer'
import Spacer from '../Spacer'
import viewAware from '../../containers/viewAware'


class HomePage extends React.Component {
  render(){
    return (
      <div className ='page-root'>
        <StarterPage/>
        <div className = 'pages' style={{backgroundColor: '#FFFFFF'}}>
          <Spacer>
            <LocationPageContainer/>
          </Spacer>
        </div>
      </div>
    )
  }
}

const Home = viewAware(HomePage)

export default Home
