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
  let _Modulo
  const { path } = args[0]

  function getInstance (...args) {
    const callback = args.pop()

    if (_Modulo) {
      callback(null, _Modulo)
      return
    }

    getModule(path, (err, module) => {
      if (err) {
        callback(err, null)
        return
      }

      _Modulo = module.default(...args)
      callback(null, _Modulo)
    })
  }

  return function (...args) {
    getInstance(...args)
  }
}
