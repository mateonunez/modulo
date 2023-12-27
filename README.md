# @mateonunez/modulo

A simple tool to use ESM modules in a CommonJS environment.

## Install

```
npm i @mateonunez/modulo
```

## Usage

### Default export

```js
const modulo = require("@mateonunez/modulo");

const myEsmModule = await modulo({ path: "./my-esm-module.mjs" });
const result = myEsmModule();
```

### Named export

```js
const modulo = require("@mateonunez/modulo");

const { namedExportVar, namedExportFunc } = await modulo({
  path: "./my-esm-module.mjs",
});

console.log(namedExportVar);
const result = namedExportFunc();
```

### Error handling

```js
const modulo = require("@mateonunez/modulo");

const myEsmModule = await modulo({ path: "./my-esm-module.mjs" }).catch(
  (err) => {
    console.error(err);
  }
);
```

> Note: if your ESM module exports a default export and named exports, you can use only the default export.

## License

[MIT](./LICENSE)
