import { expectType, expectError } from "tsd";
import Modulo from "../../modulo";

expectType<Promise<() => Promise<any>>>(
  Modulo({ path: "./test/fixtures/named-exports.js" })
);
expectType<Promise<{ foo: string }>>(
  Modulo<{ foo: string }>({ path: "./test/fixtures/named-exports.js" })
);
expectError(Modulo({ path: undefined }));
