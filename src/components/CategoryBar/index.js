import React from 'react'
import memoize from 'memoize-one'
import {COLORS, OTHER, OTHER_COLOR} from '../../constants'
import ActiveCategory from './components/ActiveCategory'


/**
 * DistributionBar
 * @extends React
 *  @prop data - the data to place into groups
 *  @prop filter - the property of the data object which is used to sort the objects.  If none is specified,
 *    1. if the data is an object, the first key is the filter
 *    2. if the data is not an object, the data itself is the filter
 *  @prop groups - map with key value pairs of the form ['propertyInCommonVal', 'uiColor']
 *  @prop strict - controls grouping behavior.  If strict mode is applied (true), any property that does not match a grouping within
 *  groups is put into an 'other' group.  If strict mode is not applied (false), any property that does not match a grouping within
 *  groups is put into it's own group
 *  @prop style - the style to apply to the distribution bar
 */

const barColors = Object.assign({}, COLORS)

class CategoryBar extends React.Component {
  constructor(props){
    super(props)
    let grouping
    if(!this.state || !this.state.categories){
      grouping = this.initializeGroups()
    }
    else{
      grouping = this.state.categories
    }
    let filter = this.getGroupingFilter()
    this.state = {
      categories: this.calculateGroups(filter, grouping),
      focusedCategory: null,
    }
    this.focusCategory = this.focusCategory.bind(this)
    this.onWindowClick = this.onWindowClick.bind(this)
  }

  componentDidMount(){
    window.addEventListener('click', this.onWindowClick)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.onWindowClick)
  }

  onWindowClick(e){
    let barWrapper = document.querySelector('.bar-wrapper')
    if(!barWrapper.contains(e.target)){
      this.setState({focusedCategory: null})
      if(this.props.onGroupSelect){
        this.props.onGroupSelect(null)
      }
    }
  }

  hasData(){
    return (this.props.data && this.props.data.length > 0)
  }

  dataIsObject(){
    return (this.hasData() && this.props.data[0] instanceof Object)
  }

  getGroupingFilter(){
    let filter = ''
    if(this.props.filter){
      filter = this.props.filter
    }
    else if(this.dataIsObject()){
      // set our filter to the first object key
      filter = Object.keys(this.props.data[0])[0]
    }
    return filter
  }

  static useColor(colors, color){
    if(colors[color]){
      colors[color] = false
    }
    return color
  }

  static getUnusedColor(colors){
    let chosenColor
    Array.from(Object.keys(colors)).some(function(color){
      if(colors[color]){
        console.log(color)
        CategoryBar.useColor(colors, color)
        chosenColor = color
        return true
      }
    })
    if(chosenColor){
      return chosenColor
    }
    else{
      console.warn("CategoryBar Color Generator has run out of colors to use, and is now relying on random colors.")
      return CategoryBar.getRandomColor()
    }
  }

  static getRandomColor(){
    let hexString = '0123456789ABCDEF'
    let color = '#'
    for(let colorDigit = 0; colorDigit < 6; colorDigit++){
      let hexDigit = Math.floor(Math.random() * 16)
      color += hexString[hexDigit]
    }
    return color
  }

  focusCategory(category){
    if(this.state && this.state.focusedCategory !== category && this.state.categories.get(category)){
      this.setState({focusedCategory: category})
      if(this.props.onGroupSelect){
        this.props.onGroupSelect(category)
      }
      let barWidths = this.getBarWidthMap(this.state.categories)
    }
  }

  initializeGroups(){
    // if we are passed a valid grouping
    let dataGrouping = new Map([])
    if(this.props.groups){
      this.props.groups.forEach(function(colorVal, groupPropertyVal){
        dataGrouping.set(groupPropertyVal, [0, colorVal])
        CategoryBar.useColor(barColors, colorVal)
      })
      if(this.props.strict && !dataGrouping.get(OTHER)){
        dataGrouping.set(OTHER, [0, OTHER_COLOR])
      }
    }
    return dataGrouping
  }

  calculateGroups = memoize((filter, grouping) => {
    if(this.dataIsObject() && filter){
      // sort by object key name
      this.props.data.forEach(function(pieceOfData){
        let groupName = pieceOfData[filter]
        grouping = this.sortDataIntoGroups(groupName, grouping)
      }.bind(this))
    }
    else{
      if(this.props.data){
        // sort by actual data value
        this.props.data.forEach(function(pieceOfData){
          grouping = this.sortDataIntoGroups(pieceOfData, grouping)
        }.bind(this))
      }
    }
    return grouping
  })

  sortDataIntoGroups(groupName, grouping){
    let groupMatch = grouping.get(groupName)
    if(groupMatch){
      let numGroupMembers = groupMatch[0]
      grouping.set(groupName, [numGroupMembers + 1, groupMatch[1]])
    }
    else{
      if(this.props.strict){
        let numOthers = grouping.get(OTHER) ? grouping.get(OTHER)[0] : 0
        grouping.set(OTHER, [numOthers + 1, OTHER_COLOR])
      }
      else{
        grouping.set(groupName, [1, CategoryBar.getUnusedColor(barColors)])
      }
    }
    return grouping
  }

  /**
   * getBarWidthMap - calculates the percentage width each div of the Category Bar should take up
   * @return {Map} key is the category type, value is the percentage width that should be taken up by the category's div
   */
  getBarWidthMap(groupMap){
    let widthMap = new Map([])
    if(groupMap){
      if(this.state.focusedCategory){
        groupMap.forEach((numberAndColor, category) => {
          if(category === this.state.focusedCategory){
            widthMap.set(category, '100%')
          }
          else{
            widthMap.set(category, '0%')
          }
        })
      }
      else{
        let sum = 0
        groupMap.forEach((numberAndColor, category) => {
          widthMap.set(category, numberAndColor[0])
          sum += numberAndColor[0]
        })
        widthMap.forEach((numberInCategory, category) => {
          let percentage = Math.floor((numberInCategory / sum) * 100)
          widthMap.set(category, `${percentage}%`)
        })
      }
    }
    return widthMap
  }

  renderGroups(){
    let barDivs = []
    let barWidths = this.getBarWidthMap(this.state.categories)
    barWidths.forEach((percentageWidth, category) => {
      let div = (<div className='category' style={{width: percentageWidth, height: '100%', backgroundColor: this.state.categories.get(category)[1]}} onClick={this.focusCategory.bind(this, category)}></div>)
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

export default CategoryBar
