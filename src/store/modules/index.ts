import { camelCase } from 'lodash'

const files = require.context('.', false, /\.ts$/)
const modules: { [key: string]: any } = {}

files.keys().forEach((fileName: string) => {
  if (fileName === './index.ts')
    return
  const moduleName = camelCase(
    fileName.replace(/(\.\/|\.ts)/g, '')
  )
  modules[moduleName] = files(fileName).default

});

export default modules