import { VIEWS } from './index'
import Breakpoint from './Breakpoint'

export default class ViewRange {
  /** NOTE: ViewRange is lower end inclusive, upper end exclusive **/
  constructor(minSize, maxSize, dimension, name){
    this.bounds = this.getBreakpointsFromRange(minSize, maxSize)
    this.dimension = dimension
    this.name = name
  }

  getBreakpointsFromRange(minSize, maxSize){
    if(minSize <= maxSize){
      return [new Breakpoint(minSize), new Breakpoint(maxSize)]
    }
    else{
      return [new Breakpoint(minSize), new Breakpoint(minSize + 1)]
    }
  }

  terminateOnDifferentDimensions(otherViewRange){
    if(!this.hasSameDimensionAs(otherViewRange)){
      console.error("To Compare View Ranges, they must have the same dimension!")
      throw "To Compare View Ranges, they must have the same dimension!"
    }
  }

  hasSameDimensionAs(otherViewRange){
    return this.dimension === otherViewRange.dimension
  }

  contains(length){
    this.terminateOnDifferentDimensions()
    return (length >= this.bounds[0].value && length < this.bounds[1].value)
  }

  overlaps(otherViewRange){
    this.terminateOnDifferentDimensions()
    return !this.includes(otherViewRange) && !this.excludes(otherViewRange)
  }

  excludes(otherViewRange){
    this.terminateOnDifferentDimensions()
    return (this.exclusivelyLessThan(otherViewRange) || this.exclusivelyLargerThan(otherViewRange))
  }

  includes(otherViewRange){
    this.terminateOnDifferentDimensions()
    return this.bounds[0].value <= otherViewRange.bounds[0].value && this.bounds[1].value >= otherViewRange.bounds[1].value
  }

  exclusivelyLessThan(otherViewRange){
    this.terminateOnDifferentDimensions()
    return this.bounds[1].value < otherViewRange.bounds[0].value
  }

  exclusivelyLargerThan(otherViewRange){
    this.terminateOnDifferentDimensions()
    return this.bounds[0].value > otherViewRange.bounds[1].value
  }

}
