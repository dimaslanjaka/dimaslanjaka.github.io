interface JSON {
    /**
     * @see {@link https://stackoverflow.com/a/61962964/6404439}
     * @example
     * console.log(JSON.stringify({a:{a:{a:{a:[{a:{hello:"world"}}]}}}}))
     */
    stringifyWithCircularRefs: (obj: any, space?: number) => string;
}
