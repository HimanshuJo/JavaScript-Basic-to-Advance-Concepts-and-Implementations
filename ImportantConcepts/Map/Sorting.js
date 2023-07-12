const map = new Map([
  ['2,1', 'this is overwritten'],
  ['2,1', '0,1'],
  ['0,1', '2,1'],
  ['2,2', '3,5'],
  ['3,5', '2,1'],
  ['2', ',9,9']
])

const sortStringKeys = ([a], [b]) => String(a).localeCompare(b)
const sortStringValues = ([,a], [,b]) => String(a).localeCompare(b)

console.log('By keys:', new Map([...map].sort(sortStringKeys)))
console.log('By values:', new Map([...map].sort(sortStringValues)))

/*
By keys: Map(5)
{'0,1' => '2,1', '2' => ',9,9', '2,1' => '0,1', '2,2' => '3,5', '3,5' => '2,1'}

By values: Map(5)
{'2' => ',9,9', '2,1' => '0,1', '0,1' => '2,1', '3,5' => '2,1', '2,2' => '3,5'}
*/