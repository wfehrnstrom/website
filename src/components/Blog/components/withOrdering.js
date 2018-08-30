import React from 'react'
import {getDisplayName} from '../../../constants/helpers'

function withOrdering(Component){
  class WrappedComponent extends React.Component {
    sortThrough(map){
      let sortableEntries = Array.from(map.entries())
      sortableEntries = this.quicksortHelper(sortableEntries)
      let sortedMap = new Map([])
      sortableEntries.forEach(function(entry){
        let [key, value] = entry
        sortedMap.set(key, value)
      })
      return sortedMap
    }

    quicksortHelper(arr){
      if(arr.length < 2){
        return arr
      }
      let pivot = arr[0]
      let lesser = []
      let greater = []
      for(let i = 1; i < arr.length; i++){
        if(this.compare(arr[i][1], pivot[1]) <= 0){
          lesser.push(arr[i])
        }
        else{
          greater.push(arr[i])
        }
      }
      return this.quicksortHelper(lesser).concat([pivot], this.quicksortHelper(greater))
    }

    compare(obj1, obj2){
      let {cmpFunc} = this.props
      if(cmpFunc){
        return cmpFunc(obj1, obj2)
      }
      else{
        return this.defaultCmpFunc(obj1, obj2)
      }
    }

    defaultCmpFunc(obj1, obj2){
      return this.defaultCmpObj(obj1, obj2)
    }

    defaultCmpObj(obj1, obj2){
      while(obj1 instanceof Object){
        let key1 = obj1.keys()[0]
        obj1 = obj1[key1]
        obj2 = obj2[key1]
      }
      return this.defaultCmpNotObj(obj1, obj2)
    }

    defaultCmpNotObj(a, b){
      if(a < b){
        return -1
      }
      else if(a > b){
        return 1
      }
      else{
        return 0
      }
    }

    render(){
      let {sortThrough} = this.props
      let sortedItems = this.sortThrough(this.props[sortThrough])
      let propsToPass = {...this.props}
      propsToPass[sortThrough] = sortedItems
      return <Component {...propsToPass}/>
    }
  }
  WrappedComponent.displayName = `withOrdering(${getDisplayName(Component)})`
  return WrappedComponent
}

export default withOrdering
