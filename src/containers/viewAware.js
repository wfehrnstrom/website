import ViewContext from './viewContext'
import React from 'react'

export default function viewAware(Component){
  return class extends React.Component{
    render(){
      return  (
        <ViewContext.Consumer>
          {(activeView) => (
            <Component {...this.props} activeView={activeView}/>
          )}
        </ViewContext.Consumer>
      )
    }
  }
}
