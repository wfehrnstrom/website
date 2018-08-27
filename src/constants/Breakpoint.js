export default class Breakpoint {
  constructor(value){
    this.value = value
  }

  get value(){
    return this.value
  }

  /**
   * within
   * @param  {View} view
   * @return {Boolean} checks whether this breakpoint is within [view.minSize, view.maxSize)
   */
  within(viewRange){
    return viewRange.contains(this.value)
  }
}
