'use strict'

const { resolve } = require('node:path')

let Modulo
function getModule (path, callback) {
  if (Modulo) {
    callback(null, Modulo)
    return
  }

  const modulePath = resolve(path)
  import(modulePath).then(_module => {
    Modulo = _module
    callback(null, Modulo)
  }).catch(err => {
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
