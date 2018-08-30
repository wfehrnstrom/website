import React from 'react'

export default function withFilter(Component){
  return class extends React.Component {
    filterThrough(map){
      let {filter, filterOn} = this.props
      let filteredMap = new Map([])
      if(!map){
        return new Map([])
      }
      if(!filter){
        return map
      }
      map.forEach(function(obj, key){
        if(this.passFilter(obj)){
          filteredMap.set(key, obj)
        }
      }.bind(this))
      return filteredMap
    }

    passFilter(obj){
      let {filterFunc, filterOn, filter} = this.props
      if(filterFunc){
        return filterFunc(obj[filterOn], filter)
      }
      return obj[filterOn] === filter
    }

    render(){
      let {filterThrough} = this.props
      let filtered = this.filterThrough(this.props[filterThrough])
      let propsToPass = Object.assign({}, this.props)
      propsToPass[filterThrough] = filtered
      return (
        <Component {...propsToPass}/>
      )
    }
  }
}
