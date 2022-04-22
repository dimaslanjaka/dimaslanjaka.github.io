import { Nullable } from './resolveQueryUrl';
/**
 * Parse Query URL and Hash
 * @param  query query key, null = return all objects
 * @param  url target query, ex: {@link location.search}
 */
export declare function parseQuery(query: Nullable<string>, url: Nullable<string>): string | {
    [k: string]: string;
};
export default parseQuery;
