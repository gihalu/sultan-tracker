const CryptoJs = require('crypto-js')

class ConfigState {
  public apiKey: string | null = null
  public clientId: string = '528211752834-cmtsp33ed07uc1lfhq92f4q7p11e2vl1.apps.googleusercontent.com'
  public encryptedApiKey: string = 'U2FsdGVkX19JHshZxJIt6l2fvfc2Kj3Ep/GwN1laKBqHCL8VBPQAoR1SElchGX4hU9Q+VQHwCqbJOQBETERrdA=='
  public scope: string = 'email profile openid https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'
}

const configState = new ConfigState()

export const HasValidKey = () => {
  return Boolean(configState.apiKey)
}

export const GetApiKey = () => {
  /* DrunkenSultans */
  const secret = prompt('Please enter the validation code (case sensitive) to proceed with this app')
  if (!secret) return
  const bytes = CryptoJs.AES.decrypt(configState.encryptedApiKey, secret)
  const decryptedKey = bytes.toString(CryptoJs.enc.Utf8)
  if (!decryptedKey) {
    console.warn(`GetApiKey could not validate '${secret}'`)
    return
  }
  configState.apiKey = decryptedKey
}

export const apiConfig = {
  apiKey: configState.apiKey,
  clientId: configState.clientId,
  scope: configState.scope
}