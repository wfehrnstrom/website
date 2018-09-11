const ColorManager = {
  useColor(colors, color){
    if(colors[color]){
      colors[color] = false
    }
    return color
  },

  getUnusedColor(colors){
    let chosenColor
    Array.from(Object.keys(colors)).some(function(color){
      if(colors[color]){
        this.useColor(colors, color)
        chosenColor = color
        return true
      }
    }.bind(this))
    if(chosenColor){
      return chosenColor
    }
    else{
      console.warn("Color Manager has run out of colors to use, and is now relying on random colors.")
      return this.getRandomColor()
    }
  },

  getRandomColor(){
    let hexString = '0123456789ABCDEF'
    let color = '#'
    for(let colorDigit = 0; colorDigit < 6; colorDigit++){
      let hexDigit = Math.floor(Math.random() * 16)
      color += hexString[hexDigit]
    }
    return color
  },
}

export default ColorManager
