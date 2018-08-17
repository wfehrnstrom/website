import React from 'react'
import '../../styles/index.css'
import '../../styles/PageTitle.css'

/**
 * PageTitle
 * @param {Object} props - the props accepted by this PageTitle Component
 *    @prop {String Array} text - string array of length 2 that will be rendered as the title.
 *    The first piece of text will be bold, the second is normal weight, separated by a red square
 *    which downscales as appropriate
 */
const PageTitle = (props) => (
  <div className='page-title' style={props.style}>
    <div style={{fontWeight: 900}}>{props.text[0]}</div>
    <div className='title-rect'></div>
    <div style={{fontWeight: 400}}>{props.text[1]}</div>
  </div>
)

export default PageTitle
