# @mateonunez/modulo

A simple tool to use ESM modules in a CommonJS environment.

## Install

```
npm i @mateonunez/modulo
```

## Usage

### Default export

```js
const Modulo = require("@mateonunez/modulo");

const myEsmModule = await Modulo({ path: "./my-esm-module.mjs" });
const result = myEsmModule();
```

### Named export

```js
const Modulo = require("@mateonunez/modulo");

const { namedExportVar, namedExportFunc } = await Modulo({
  path: "./my-esm-module.mjs",
});

console.log(namedExportVar);
const result = namedExportFunc();
```

### With TypeScript

```ts
import Modulo from "@mateonunez/modulo";
import * as originalEsmModule from "esm-module";

const myEsmModule = await Modulo<typeof originalEsmModule>({
  path: "./my-esm-module.mjs",
});
const result = myEsmModule();
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
