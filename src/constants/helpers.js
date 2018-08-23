export function approximatelyEqual(a, b){
  return (Math.abs(a - b) < 0.001)
}

export function getDisplayName(Component){
  return Component.displayName || Component.name || 'Component'
}

export function JSONToBlog(blogJSON){

}
