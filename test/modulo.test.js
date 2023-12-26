const { test } = require('node:test')
const assert = require('node:assert/strict')
const Modulo = require('../modulo.js')
// const { fail } = require('node:assert')

test('should return a function', (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  assert.strictEqual(typeof esmModule, 'function')
})

test('should return "esm"', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  assert.strictEqual(await esmModule(), 'esm')
})

test('should return "esm" with arguments', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  assert.strictEqual(await esmModule('foo'), 'esm')
})

test('should return the same instance when called multiple times with the same arguments', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  const result1 = await esmModule()
  const result2 = await esmModule()
  assert.strictEqual(result1, result2)
})

test('should cache the module after the first call', async (t) => {
  const esmModule1 = Modulo({ path: './test/fixtures/esm/index.js' })
  const esmModule2 = Modulo({ path: './test/fixtures/esm/index.js' })
  const result1 = await esmModule1()
  const result2 = await esmModule2()
  assert.strictEqual(result1, result2)
})

test('should handle different argument sets', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  const result1 = await esmModule('arg1')
  const result2 = await esmModule('arg2')
  assert.strictEqual(result1, result2)
})

test('should throw an error when the module does not exist', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/does-not-exist.js' })
  await esmModule().catch(err => {
    assert.strictEqual(err.code, 'ERR_MODULE_NOT_FOUND')
  })
})

test('should return the passed arguments', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/args.js' })
  const result = await esmModule('Hello, CJS!')
  assert.strictEqual(result, 'Hello, CJS!')
})

test('should import a named export', async (t) => {
  const esmModuleProxy = Modulo({ path: './test/fixtures/esm/named-export.js' })
  const { check, check2 } = await esmModuleProxy()
  assert.strictEqual(check(), true)
  assert.strictEqual(check2(), false)
})

test('should access a named export', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/named-export.js' })
  const foo = (await esmModule()).foo
  assert.strictEqual(foo, 'bar')
})

test('named exports are available also with the default export', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/multiple-exports.js' })
  assert.strictEqual(typeof esmModule, 'function')
  assert.strictEqual(typeof await esmModule.sleep, 'function')
})

test('should access a named export with arguments', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/named-export.js' })
  const sayHi = (await esmModule()).sayHi
  assert.strictEqual(sayHi(), 'Hi!')
})

test('should destruct named exports', async (t) => {
  {
    const esmModule = Modulo({ path: './test/fixtures/esm/multiple-exports.js' })
    const { sleep, pi, ...rest } = await esmModule

    assert.strictEqual(typeof await sleep, 'function')
    assert.strictEqual(await pi, 3.14159)
    assert.strictEqual(typeof rest, 'object')
    assert.strictEqual(JSON.stringify(rest), '{}') // (?)
  }

  {
    const esmModule = Modulo({ path: './test/fixtures/esm/multiple-exports.js' })
    const { sleep, pi, square, greeting } = await esmModule

    assert.strictEqual(typeof await sleep, 'function')
    assert.strictEqual(await pi, 3.14159)
    assert.strictEqual(typeof await greeting, 'string')
    assert.strictEqual(typeof await square, 'function')
  }

  {
    const esmModule = Modulo({ path: './test/fixtures/esm/multiple-exports.js' })
    const resultDefault = await esmModule('CJS')

    assert.strictEqual(resultDefault, 'Hello, CJS!')
    assert.strictEqual(typeof resultDefault.sleep, 'undefined')
    assert.strictEqual(typeof resultDefault.pi, 'undefined')
  }
})
