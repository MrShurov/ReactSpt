export class SptParserService {
    public parseArrayOrValue(value: object, fn: (item: object) => void) {
        const array: object[] = value instanceof Array ? value : [value];
        array.forEach((item) => fn(item));
    }
}