import { Serializer } from '../../packages/superserial/serializer';
import { deserialize as decode } from '../../packages/superserial/deserialize';
const serializer = new Serializer({});
export const serialize = serializer.serialize;
export const deserialize = decode;
export default serializer;
