/**
 * convert type to be writeable
 * * https://stackoverflow.com/a/43001581
 */
export type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
/**
 * convert type to be writeable recursively
 * * https://stackoverflow.com/a/43001581
 */
export type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
/**
 * null | undefined | type
 */
export type Nullable<T> = T | null | undefined;
