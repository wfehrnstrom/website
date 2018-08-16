export default function Location(name, desc, yearString, coords, position){
  this.name = name
  this.desc = desc
  this.yearString = yearString
  this.coords = coords
  this.startYear = parseInt(yearString.substring(0, yearString.indexOf('-')))
  this.position = position
}
