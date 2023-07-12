let someMap = new Map();
someMap.set("key1", "value1");
someMap.set("key2", "value2");
someMap.set("key3", "value3");

const getLastItemInMap = (map) => Array.from(map)[map.size - 1];
const getLastKeyInMap = (map) => Array.from(map)[map.size - 1][0];
const getLastValueInMap = (map) => Array.from(map)[map.size - 1][1];

console.log(getLastItemInMap(someMap));
console.log(getLastKeyInMap(someMap));
console.log(getLastValueInMap(someMap));