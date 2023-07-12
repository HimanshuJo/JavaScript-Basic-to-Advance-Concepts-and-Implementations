let map = new Map()

map.set("one", "first element");
map.set("two", "second element");
map.set(3, "third element");

for (let [key, value] of map) {
console.log(key + " = " + value);
}

//output
// one = first element
// two = second element
// 3 = third element