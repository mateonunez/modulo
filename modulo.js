'use strict'

const { resolve } = require('node:path')

const moduloCache = {}

async function loadModule (relativePath) {
  if (moduloCache[relativePath]) {
    return moduloCache[relativePath]
  }

  const modulePath = resolve(process.cwd(), relativePath)
  const _module = await import(modulePath)
  moduloCache[relativePath] = _module
  return _module
}

function Modulo (config) {
  const { path } = config
  let loadedModule

  async function loadAndReturnModule () {
    if (!loadedModule) {
      loadedModule = await loadModule(path)
    }
    return loadedModule
  }

  return new Proxy(loadAndReturnModule, {
    apply: async (_, thisArg, args) => {
      const module = await loadAndReturnModule()
      if (typeof module.default === 'function') {
        return module.default.apply(thisArg, args)
      }

      return module
    },
    get: async (_, prop) => {
      const module = await loadAndReturnModule()
      return module[prop]
    }
  })
}

module.exports = Modulo
