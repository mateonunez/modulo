'use strict'

const path = require('path')

const moduleCache = {}

function loadModule (relativePath) {
  if (moduleCache[relativePath]) {
    return moduleCache[relativePath]
  }

  const modulePath = path.resolve(process.cwd(), relativePath)
  const modulePromise = import(modulePath)
    .then(_module => {
      moduleCache[relativePath] = _module
      return _module
    })
    .catch(error => {
      console.error('Error loading module:', error)
      throw error
    })

  moduleCache[relativePath] = modulePromise
  return modulePromise
}

async function Modulo (...args) {
  const { path } = args[0]

  const moduleResolver = async () => {
    const _module = await loadModule(path)
    if (typeof _module.default === 'function') {
      return _module.default
    }

    return _module
  }

  return await moduleResolver()
}

module.exports = Modulo
