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

async function Modulo (options = {}) {
  if (!options.path) {
    throw new Error('Modulo requires a path to the module you want to load')
  }

  const moduleResolver = async (...args) => {
    const _module = await loadModule(options.path)
    if (typeof _module.default === 'function') {
      return _module.default
    }

    return _module
  }

  return await moduleResolver(options)
}

module.exports = Modulo
