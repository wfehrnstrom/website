import ViewContext from './viewContext'
import React from 'react'

export default function viewAware(Component){
  return function ViewAwareComponent(props){
    return  (
      <ViewContext.Consumer>
        {(activeView) => (
          <Component {...props} activeView={activeView}/>
        )}
      </ViewContext.Consumer>
    )
  }
}
