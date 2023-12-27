const { test } = require('node:test')
const assert = require('node:assert/strict')
const Modulo = require('../modulo.js')

test('should return a function', async (t) => {
  const esmModule = await Modulo({ path: './test/fixtures/esm/index.js' })
  assert.strictEqual(typeof esmModule, 'function')
})

test('should return "esm"', async () => {
  // Loading the module
  const esmModule = await Modulo({ path: './test/fixtures/esm/index.js' })

  const result = esmModule()
  assert.strictEqual(result, 'esm')
})

test('should return "esm" with arguments', async (t) => {
  const esmModule = await Modulo({ path: './test/fixtures/esm/index.js' })
  assert.strictEqual(esmModule('foo'), 'esm')
})

test('should return the same instance when called multiple times with the same arguments', async (t) => {
  const esmModule = await Modulo({ path: './test/fixtures/esm/index.js' })
  const result1 = esmModule()
  const result2 = esmModule()
  assert.strictEqual(result1, result2)
})

test('should cache the module after the first call', async (t) => {
  const esmModule1 = await Modulo({ path: './test/fixtures/esm/index.js' })
  const esmModule2 = await Modulo({ path: './test/fixtures/esm/index.js' })
  const result1 = esmModule1()
  const result2 = esmModule2()
  assert.strictEqual(result1, result2)
})

test('should handle different argument sets', async (t) => {
  const esmModule = await Modulo({ path: './test/fixtures/esm/index.js' })
  const result1 = esmModule('arg1')
  const result2 = esmModule('arg2')
  assert.strictEqual(result1, result2)
})

test('should throw an error when the module does not exist', async (t) => {
  try {
    await Modulo({ path: './test/fixtures/esm/non-existent.js' })
    assert.fail('Should have thrown an error')
  } catch (error) {
    assert.strictEqual(error.code, 'ERR_MODULE_NOT_FOUND')
  }
})

test('should return the passed arguments', async (t) => {
  const esmModule = await Modulo({ path: './test/fixtures/esm/args.js' })
  const result = esmModule('Hello, CJS!')
  assert.strictEqual(result, 'Hello, CJS!')
})

test('should import a named export', async (t) => {
  const esmModuleProxy = await Modulo({ path: './test/fixtures/esm/named-export.js' })
  const { check, check2 } = esmModuleProxy
  assert.strictEqual(check(), true)
  assert.strictEqual(check2(), false)
})

test('should access a named export', async (t) => {
  const esmModule = await Modulo({ path: './test/fixtures/esm/named-export.js' })
  const foo = esmModule.foo
  assert.strictEqual(foo, 'bar')
})

test('named exports aren\'t available also with the default export', async (t) => {
  const esmModule = await Modulo({ path: './test/fixtures/esm/multiple-exports.js' })
  assert.strictEqual(typeof esmModule, 'function')
  assert.strictEqual(esmModule.sleep, undefined)
})

test('should access a named export with arguments', async (t) => {
  const esmModule = await Modulo({ path: './test/fixtures/esm/named-export.js' })
  const sayHi = esmModule.sayHi
  assert.strictEqual(sayHi(), 'Hi!')
})

test('should destruct named exports', async (t) => {
  {
    const esmModule = await Modulo({ path: './test/fixtures/esm/multiple-exports-without-default.js' })
    const { sleep, pi, ...rest } = esmModule
    assert.strictEqual(typeof sleep, 'function')
    assert.strictEqual(pi, 3.14159)
    assert.strictEqual(typeof rest, 'object')
    assert.strictEqual(rest.greeting, 'Hello World')
    assert.strictEqual(typeof rest.square, 'function')
    assert.strictEqual(typeof rest.hello, 'object')
  }

  {
    const esmModule = await Modulo({ path: './test/fixtures/esm/multiple-exports-without-default.js' })
    const { sleep, pi, square, greeting } = esmModule

    assert.strictEqual(typeof sleep, 'function')
    assert.strictEqual(pi, 3.14159)
    assert.strictEqual(typeof greeting, 'string')
    assert.strictEqual(typeof square, 'function')
  }

  {
    const esmModule = await Modulo({ path: './test/fixtures/esm/multiple-exports.js' })
    const resultDefault = esmModule('CJS')

    assert.strictEqual(resultDefault, 'Hello, CJS!')
    assert.strictEqual(resultDefault.sleep, undefined)
    assert.strictEqual(resultDefault.pi, undefined)
  }
})

test('should throw if the path is not provided', async (t) => {
  try {
    await Modulo()
    assert.fail('Should have thrown an error')
  } catch (error) {
    assert.strictEqual(error.message, 'Modulo requires a path to the module you want to load')
  }
})
