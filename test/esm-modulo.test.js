const { test } = require('node:test')
const assert = require('node:assert/strict')
const Modulo = require('../modulo.js')
const { fail } = require('node:assert')

test('should return a function', (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  assert.strictEqual(typeof esmModule, 'function')
})

test('should return "esm"', (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  esmModule((err, result) => {
    if (err) fail(err)
    assert.strictEqual(result, 'esm')
  })
})

test('should return "esm" with arguments', (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  esmModule('foo', 'bar', (err, result) => {
    if (err) fail(err)
    assert.strictEqual(result, 'esm')
  })
})

test('should return the same instance when called multiple times with the same arguments', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  let result1
  let result2
  esmModule((err, result) => {
    if (err) fail(err)

    assert.strictEqual(result, 'esm')
    result1 = result
  })
  esmModule((err, result) => {
    if (err) fail(err)

    assert.strictEqual(result, 'esm')
    result2 = result
  })
  assert.strictEqual(result1, result2)
})

test('should return the same instance with two different arguments', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })
  let result1
  let result2
  esmModule('foo', (err, result) => {
    if (err) fail(err)

    assert.strictEqual(result, 'esm')
    result1 = result
  })
  esmModule('bar', (err, result) => {
    if (err) fail(err)

    assert.strictEqual(result, 'esm')
    result2 = result
  })
  assert.strictEqual(result1, result2)
})

test('should cache the module after the first call', async (t) => {
  const esmModule1 = Modulo({ path: './test/fixtures/esm/index.js' })
  esmModule1((err, result1) => {
    if (err) fail(err)

    const esmModule2 = Modulo({ path: './test/fixtures/esm/index.js' })
    esmModule2((err, result2) => {
      if (err) fail(err)

      assert.strictEqual(result1, result2)
    })
  })
})

test('should handle different argument sets', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/index.js' })

  esmModule('arg1', (err, result1) => {
    if (err) fail(err)

    esmModule('arg2', 'arg3', (err, result2) => {
      if (err) fail(err)

      assert.strictEqual(result1, result2)
    })
  })
})

test('should throw an error when the module does not exist', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/does-not-exist.js' })
  esmModule((err) => {
    assert.strictEqual(err.code, 'ERR_MODULE_NOT_FOUND')
  })
})

test('should return the passed arguments', async (t) => {
  const esmModule = Modulo({ path: './test/fixtures/esm/args.js' })
  esmModule('Hello, CJS!', (err, result) => {
    if (err) fail(err)

    assert.strictEqual(result, 'Hello, CJS!')
  })
})
