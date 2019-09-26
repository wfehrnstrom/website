export const PREFERENCES = 'PREFERENCES'
export const FLASHING = 'flashing'

export function setPreferences(flash){
  setCookie(FLASHING, flash);
  return {flash: flash, type: PREFERENCES}
}

function setCookie(key, value){
  let expiration = new Date();
  expiration.setTime(expiration.getTime()+(1000*60*60*24*365*10))
  let cookie = escape(key)+'='+escape(value.toString())+';expires='+expiration.toUTCString()+';'
  document.cookie = cookie;
}
