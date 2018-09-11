import React from 'react'
import {getDisplayName} from '../../../constants/helpers'

function withOrdering(Component){
  class WrappedComponent extends React.Component {
    sortThrough(data){
      let sortedData
      if(data instanceof Map){
        let sortableEntries = Array.from(data.entries())
        sortableEntries = this.quicksortHelper(sortableEntries)
        sortedData = new Map(sortableEntries)
      }
      else if(data instanceof Array){
        sortedData = this.quicksortHelper(data)
      }
      return sortedData
    }

    quicksortHelper(arr){
      if(arr && arr.length < 2){
        return arr
      }
      let pivot = arr[0]
      let lesser = []
      let greater = []
      for(let i = 1; i < arr.length; i++){
        let comparison = this.getComparisonBasedOnDataType(arr[i], pivot)
        if(comparison <= 0){
          lesser.push(arr[i])
        }
        else{
          greater.push(arr[i])
        }
      }
      return this.returnAppropriateDataType(lesser, greater, pivot)
    }

    returnAppropriateDataType(lesser, greater, pivot){
      if(pivot instanceof Array){
        return this.quicksortHelper(lesser).concat([pivot], this.quicksortHelper(greater))
      }
      return this.quicksortHelper(lesser).concat(pivot, this.quicksortHelper(greater))
    }


    getComparisonBasedOnDataType(obj1, obj2){
      if(obj1 instanceof Array && obj2 instanceof Array){
        return this.compare(obj1[1], obj2[1])
      }
      else {
        return this.compare(obj1, obj2)
      }
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
        let key1 = Object.keys(obj1)[0]
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
