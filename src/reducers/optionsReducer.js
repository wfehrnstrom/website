import * as preferenceActions from '../actions/preferenceActions'

function readFlashingPrefFromCookies(){
  const name = preferenceActions.FLASHING;
  const key = name + '=';
  let cookies = document.cookie.split(';');
  for (let cookie of cookies){
    cookie = cookie.trim()
    if (cookie.indexOf(key) === 0){
      return (cookie.substring(key.length, cookie.length).toLowerCase() === 'true')
    }
  }
  return null;
}

export function hydrateState(){
  let flashingPref = readFlashingPrefFromCookies();
  if (flashingPref == null){
    return {flashing: false, set: false};
  }
  return {flashing: flashingPref, set: true};
}

const optionsReducer = (state = hydrateState(), action) => {
  switch (action.type) {
    case preferenceActions.PREFERENCES:
      return {...state, flashing: action.flash}
    default:
      return state
  }
}

export default optionsReducer
