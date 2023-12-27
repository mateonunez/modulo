'use strict'

const path = require('path')

const moduleCache = {}

async function loadModule (relativePath) {
  if (moduleCache[relativePath]) {
    return moduleCache[relativePath]
  }

  const modulePath = path.resolve(process.cwd(), relativePath)
  const module = await import(modulePath).catch(error => {
    console.error('Error loading module:', error)
    throw error
  })

  moduleCache[relativePath] = module
  return module
}

async function Modulo (options = {}) {
  if (!options.path) {
    throw new Error('Modulo requires a path to the module you want to load')
  }

  async function moduleResolver () {
    const _module = await loadModule(options.path)
    if (typeof _module.default === 'function') {
      return _module.default
    }

    return _module
  }

  return await moduleResolver()
}

module.exports = Modulo
