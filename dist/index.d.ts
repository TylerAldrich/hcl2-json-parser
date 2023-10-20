declare module "hcl2-parser"

type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {  [key: string]: AnyJson; }
interface JsonArray extends Array<AnyJson> {}

declare async function parseToString(input: string): Promise<string>
declare async function parseToObject(input: string): Promise<AnyJson>
