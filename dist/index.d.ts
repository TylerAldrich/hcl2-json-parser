declare module "hcl2-json-parser"

type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {  [key: string]: AnyJson; }
interface JsonArray extends Array<AnyJson> {}

declare function parseToString(input: string): Promise<string>
declare function parseToObject(input: string): Promise<AnyJson>
