# @mateonunez/modulo

A simple tool to use ESM modules in a CommonJS environment.

## Install

```
npm i @mateonunez/modulo
```

## Usage

The `@mateonunez/modulo` module is designed to handle ESM imports within a CommonJS context. This is particularly useful when you are working in a Node.js application that uses CommonJS modules but need to import ESM modules.

Importing the Module
First, import @mateonunez/modulo into your Node.js project:

```js
const Modulo = require("@mateonunez/modulo");
```

### Importing ESM Modules

To import an ESM module, use Modulo by providing an object with the path property. The path should be a string pointing to the ESM module you want to import.

```js
const esmModule = Modulo({
  path: "./esm-module.js",
});
```

#### With default export

If the ESM module you are importing has a default export, the default export will be passed to the callback function as the second argument.

```js
// Without arguments
(async () => {
  const result = await esmModule();
  console.log(result);
})();

// With arguments
(async () => {
  const result = await esmModule("arg1", "arg2");
  console.log(result);
})();
```

#### With named exports

If the ESM module you are importing has named exports, the named exports will be passed to the callback function as the second argument.

```js
// No arguments
(async () => {
  const { namedExport1, namedExport2 } = await esmModule();
  console.log(namedExport1);
  namedExport2();
})();

// With arguments
(async () => {
  const { namedExport1, namedExport2 } = await esmModule("arg1", "arg2");
  console.log(namedExport1);
  namedExport2(); // If the named export is a function, you can call it like this
})();
```

### Error Handling

If the ESM module you are importing throws an error, the error will be passed to the callback function as the first argument. If the ESM module you are importing does not throw an error, the first argument will be null.

```js
(async () => {
  try {
    const result = await esmModule();
    console.log(result);
  } catch (err) {
    console.error("Error:", err);
  }
})();
```

## License

[MIT](./LICENSE)
