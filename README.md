# @mateonunez/modulo

A simple tool to manage ESM modules in a CommonJS environment.

## Install

```
npm i @mateonunez/modulo
```

## Usage

The `@mateonunez/modulo` module is designed to handle ESM imports within a CommonJS context. This is particularly useful when you are working in a Node.js application that uses CommonJS modules but need to import ESM modules.

Importing the Module
First, import @mateonunez/modulo into your Node.js project:

```js
const Modulo = require('@mateonunez/modulo');
```

### Importing ESM Modules

To import an ESM module, use Modulo by providing an object with the path property. The path should be a string pointing to the ESM module you want to import.

```js
const esmModule = Modulo({
  path: './esm-module.js',
});
```

#### With default export

If the ESM module you are importing has a default export, the default export will be passed to the callback function as the second argument.

```js
// No arguments
esmModule((_, result) => {
  console.log(result);
});

// With arguments
esmModule('arg1', 'arg2', (_, result) => {
  console.log(result);
});
```

#### With named exports

If the ESM module you are importing has named exports, the named exports will be passed to the callback function as the second argument.

```js
// No arguments
esmModule((_, { namedExport1, namedExport2 }) => {
  console.log(namedExport1, namedExport2());
});

// With arguments
esmModule('arg1', 'arg2', (_, { namedExport1, namedExport2 }) => {
  console.log(namedExport1, namedExport2());
});
```

### Error Handling

If the ESM module you are importing throws an error, the error will be passed to the callback function as the first argument. If the ESM module you are importing does not throw an error, the first argument will be null.

```js
esmModule((err, result) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(result);
});
```

## License

[MIT](./LICENSE)
