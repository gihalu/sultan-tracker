import { fromPairs, get, map, split, trim } from 'lodash'
const CryptoJs = require('crypto-js')

class ConfigState {
  public apiKey: string | null = null
  public clientId: string = '528211752834-cmtsp33ed07uc1lfhq92f4q7p11e2vl1.apps.googleusercontent.com'
  public encryptedApiKey: string = 'U2FsdGVkX1+uPVoMzUqXcXw8JEgQKHLDNgKNFEDtcQNrNrilodrNqWckUXLSi3Ghs/JcR/ferPyCpNsxsPLZWg=='
  public scope: string = 'email profile openid https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'
}

const configState = new ConfigState()

console.log(`https://developers.google.com/identity/protocols/OAuth2ServiceAccount for using a service account to log in instead of passing in user OAuth`)

export const DecodedCookies = () => {
  const cookies: string[] = split(document.cookie, ';');
  const decodedCookies: {} = fromPairs(
    map(cookies, cookie => {
      return map(split(cookie, '='), value => {
        return trim(decodeURIComponent(value));
      });
    })
  );

  return decodedCookies
}

export const HasValidKey = () => {
  return Boolean(configState.apiKey)
}

export const GetApiKey = () => {
  /* DrunkenSultans */
  const cookieKey = get(DecodedCookies(), 'GAPI_KEY')
  if (cookieKey) {
    configState.apiKey = cookieKey
    return
  }
  const secret = 'DrunkenSultans' //prompt('Please enter the validation code (case sensitive) to proceed with this app')
  if (!secret) return
  const bytes = CryptoJs.AES.decrypt(configState.encryptedApiKey, secret)
  const decryptedKey = bytes.toString(CryptoJs.enc.Utf8)
  if (!decryptedKey) {
    console.warn(`GetApiKey could not validate '${secret}'`)
    return
  }
  const cookie = `GAPI_KEY=${decryptedKey}; path=/`
  document.cookie = cookie
  configState.apiKey = decryptedKey
}

export const apiConfig = {
  apiKey: configState.apiKey,
  clientId: configState.clientId,
  scope: configState.scope
}