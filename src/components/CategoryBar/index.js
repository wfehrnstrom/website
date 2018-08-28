import React from 'react'
import memoize from 'memoize-one'
import {COLORS, OTHER, OTHER_COLOR} from '../../constants'
import ActiveCategory from './components/ActiveCategory'
import withFilter from '../Blog/components/withFilter'
import ColorManager from '../../constants/ColorManager'


/**
 * DistributionBar
 * @extends React
 *  @prop data - the data to place into groups
 *  @prop filterGroupsWith - the property of the data object which is used to sort the objects into groups.  If none is specified,
 *    1. if the data is an object, the first key is the filter
 *    2. if the data is not an object, the data itself is the filter
 *  @prop groups - map with key value pairs of the form ['propertyInCommonVal', 'uiColor']
 *  @prop strict - controls grouping behavior.  If strict mode is applied (true), any property that does not match a grouping within
 *  groups is put into an 'other' group.  If strict mode is not applied (false), any property that does not match a grouping within
 *  groups is put into its own group type
 *  @prop style - the style to apply to the distribution bar
 */

const barColors = Object.assign({}, COLORS)

class CategoryBar extends React.Component {
  constructor(props){
    super(props)
    let grouping = this.initializeGroups()
    let filter = this.getGroupingFilter()
    this.state = {
      categories: this.calculateGroupSizes(filter, grouping),
      focusedCategory: null,
    }
    this.focusCategory = this.focusCategory.bind(this)
  }

  getGroupingFilter(){
    let {filterGroupsWith} = this.props
    return (filterGroupsWith ? filterGroupsWith : '')
  }

  toggleFocus(category){
    if(this.categoryNotValid(category)){
      return
    }
    let newlyFocusedCategory
    if(this.isNotFocused(category)){
      newlyFocusedCategory = this.focusCategory(category)
    }
    else{
      newlyFocusedCategory = this.unfocusCategory()
    }
    this.propagateUpFocusEvent(newlyFocusedCategory)
  }

  focusCategory(category){
    this.setState({focusedCategory: category})
    return category
  }

  unfocusCategory(){
    this.setState({focusedCategory: null})
    return null
  }

  // NOTE: null is a valid category, as this is used to unfocus the category bar
  categoryNotValid(category){
    return (!this.state || this.categoryNotFound(category))
  }

  categoryNotFound(category){
    if(category !== null && !this.state.categories.get(category)){
      return true
    }
    return false
  }

  isNotFocused(category){
    return this.state.focusedCategory !== category
  }

  propagateUpFocusEvent(category){
    if(this.props.onGroupSelect){
      this.props.onGroupSelect(category)
    }
  }

  initializeGroups(){
    let propertyAndColorMapping = this.props.groups
    let dataGrouping = this.copyOverPropertyMappings(propertyAndColorMapping)
    if(this.props.strict && this.otherGroupNotInitialized(dataGrouping)){
      this.initializeOtherGroup(dataGrouping)
    }
    return dataGrouping
  }

  copyOverPropertyMappings(map){
    let dataGrouping = new Map([])
    if(!map){
      return dataGrouping
    }
    map.forEach(function(color, propertyVal){
      dataGrouping.set(propertyVal, [0, color])
      ColorManager.useColor(barColors, color)
    })
    return dataGrouping
  }

  otherGroupNotInitialized(grouping){
    return !grouping.get(OTHER)
  }

  initializeOtherGroup(grouping){
    grouping.set(OTHER, [0, OTHER_COLOR])
  }

  calculateGroupSizes = memoize((field, grouping) => {
    if(this.dataIsObject() && field){
      grouping = this.incrementGroupSizeWithObjects(this.props.data, field, grouping)
    }
    else if(this.props.data){
      grouping = this.incrementGroupSizeWithPrimitives(this.props.data, grouping)
    }
    return grouping
  })

  incrementGroupSizeWithObjects(objects, field, groupsToIncrement){
    objects.forEach(function(object){
      groupsToIncrement = this.incrementGroupSizeWithObject(object, field, groupsToIncrement)
    }.bind(this))
    return groupsToIncrement
  }

  incrementGroupSizeWithObject(object, field, groupsToIncrement){
    let groupNameToIncrement = object[field]
    groupsToIncrement = this.incrementGroupSizeByOne(groupNameToIncrement, groupsToIncrement)
    return groupsToIncrement
  }

  incrementGroupSizeWithPrimitives(primitives, groupsToIncrement){
    primitives.forEach(function(primitive){
      groupsToIncrement = this.incrementGroupSizeWithPrimitive(primitive, groupsToIncrement)
    }.bind(this))
    return groupsToIncrement
  }

  incrementGroupSizeWithPrimitive(primitive, groupsToIncrement){
    let groupNameToIncrement = primitive
    groupsToIncrement = this.incrementGroupSizeByOne(groupNameToIncrement, groupsToIncrement)
    return groupsToIncrement
  }

  dataIsObject(){
    return (this.hasData() && this.props.data[0] instanceof Object)
  }

  hasData(){
    return (this.props.data && this.props.data.length > 0)
  }

  incrementGroupSizeByOne(groupName, grouping){
    let groupMatch = grouping.get(groupName)
    if(groupMatch){
      let numGroupMembers = groupMatch[0]
      grouping.set(groupName, [numGroupMembers + 1, groupMatch[1]])
    }
    else{
      if(this.props.strict){
        grouping = this.incrementOthersByOne(grouping)
      }
      else{
        grouping = this.addGroup(groupName, grouping)
      }
    }
    return grouping
  }

  incrementOthersByOne(grouping){
    let numOthers = grouping.get(OTHER) ? grouping.get(OTHER)[0] : 0
    grouping.set(OTHER, [numOthers + 1, OTHER_COLOR])
    return grouping
  }

  /**
   * getBarWidthMap - calculates the percentage width each div of the Category Bar should take up
   * @return {Map} key is the category type, value is the percentage width that should be taken up by the category's div
   */
  getBarWidthMap(groupMap){
    let widthMap = new Map([])
    if(groupMap){
      if(this.hasFocus()){
        widthMap = this.setWidthsAccordingToFocus(groupMap)
      }
      else{
        widthMap = this.setWidthsAccordingToGroupSizes(groupMap)
      }
    }
    return widthMap
  }

  setWidthsAccordingToFocus(groupMap){
    let percentageWidthMap = new Map([])
    groupMap.forEach(function(quantityAndColor, category){
      if(category === this.state.focusedCategory){
        percentageWidthMap.set(category, '100%')
      }
      else{
        percentageWidthMap.set(category, '0%')
      }
    }.bind(this))
    return percentageWidthMap
  }

  setWidthsAccordingToGroupSizes(groupMap){
    if(groupMap){
      let percentageWidthMap = new Map([])
      let groupNumberArr = this.getGroupSizesFromGroupMap(groupMap)
      let sum = this.getTotalNumberOfGroupMembers(groupNumberArr)
      let percentageArr = groupNumberArr.map((numberElementsInCategory) => {
        return Math.floor((numberElementsInCategory / sum) * 100)
      })
      let i = 0
      groupMap.forEach(function(numberAndColor, category){
        percentageWidthMap.set(category, `${percentageArr[i++]}%`)
      })
      return percentageWidthMap
    }
  }

  getGroupSizesFromGroupMap(groupMap){
    return Array.from(groupMap.values()).map(function(numAndColorArr){
      return numAndColorArr[0]
    })
  }

  getTotalNumberOfGroupMembers(groupNumberArr){
    function getSum(total, num){
      return total + num
    }
    return groupNumberArr.reduce(getSum)
  }

  hasFocus(){
    return (this.state && this.state.focusedCategory !== null && !this.categoryNotValid(this.state.focusedCategory))
  }

  renderGroups(){
    let barDivs = []
    let barWidths = this.getBarWidthMap(this.state.categories)
    barWidths.forEach((percentageWidth, category) => {
      let div = (<div className='category' key={category} style={{width: percentageWidth, height: '100%', backgroundColor: this.state.categories.get(category)[1]}} onClick={this.toggleFocus.bind(this, category)}></div>)
      barDivs.push(div)
    })
    return barDivs
  }

  render(){
    return (
      <div className = 'bar-wrapper' style={{marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '30px', ...this.props.style}}>
        <div className='div-container' style={{marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '50%'}}>
          {this.renderGroups()}
        </div>
        <ActiveCategory name={this.state.focusedCategory} bgColor={this.state.categories.get(this.state.focusedCategory) ? this.state.categories.get(this.state.focusedCategory)[1] : null}/>
      </div>
    )
  }
}

export default withFilter(CategoryBar)
