'use strict'

const { resolve } = require('node:path')

const moduloCache = {}

async function getModule (relativePath) {
  if (moduloCache[relativePath]) {
    return moduloCache[relativePath]
  }

  const modulePath = resolve(process.cwd(), relativePath)
  const _module = await import(modulePath)
  moduloCache[relativePath] = _module
  return _module
}

module.exports = function (config) {
  let _Module
  const { path } = config

  async function getInstance () {
    if (!_Module) {
      _Module = await getModule(path)
    }
    return _Module
  }

  return async function (...args) {
    const module = await getInstance()
    return module.default ? module.default(...args) : module
  }
}
