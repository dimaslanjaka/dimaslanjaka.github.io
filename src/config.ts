import path from "path";
export const appRoot = path.resolve(path.join(__dirname, "../"));
/**
 * Express port
 */
export const port = process.env.PORT || 3000;
