import { deserialize, serialize } from '../node/serializer';

const nodes = [
  { self: null as any, siblings: [] as any[] },
  {
    self: null as any,
    siblings: [] as any[],
  },
];
nodes[0].self = nodes[0];
nodes[0].siblings = nodes;
nodes[1].self = nodes[1];
nodes[1].siblings = nodes;

const serialized = serialize(nodes);

console.log(serialized);
// [$1,$2];{"self":$1,"siblings":$0};{"self":$2,"siblings":$0}

const deserialized = deserialize(serialized) as typeof nodes;

console.log(deserialized === deserialized[0].siblings); // true
console.log(deserialized[0] === deserialized[0].self); // true
console.log(deserialized === deserialized[1].siblings); // true
console.log(deserialized[1] === deserialized[1].self); // true
