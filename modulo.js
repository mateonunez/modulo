'use strict'

const { resolve } = require('node:path')

const moduloCache = {}

function getModule (relativePath, callback) {
  if (moduloCache[relativePath]) {
    callback(null, moduloCache[relativePath])
    return
  }

  const modulePath = resolve(process.cwd(), relativePath)

  import(modulePath)
    .then(_module => {
      moduloCache[relativePath] = _module
      callback(null, _module)
    })
    .catch(err => {
      callback(err, null)
    })
}

module.exports = function (...args) {
  let _Module
  const { path } = args[0]

  function getInstance (...args) {
    const callback = args.pop()

    if (_Module) {
      callback(null, _Module)
      return
    }

    getModule(path, (err, module) => {
      if (err) {
        callback(err, null)
        return
      }

      _Module = module.default ? module.default(...args) : module
      callback(null, _Module)
    })
  }

  return function (...args) {
    getInstance(...args)
  }
}
