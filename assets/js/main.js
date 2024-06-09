const a = [1, 2, 5]
const b = [3, 2, 1]

const c = a.concat(b)

console.log(c) // [1, 2, 5, 3, 4, 6]

const d = [...a, ...b]

console.log(d) // [1, 2, 5, 3, 4, 6]
/**
 * Finds the intersection of two arrays.
 *
 * @param {Array} a - The first array.
 * @param {Array} b - The second array.
 * @return {Array} The intersection of the two arrays.
 */
function findIntersection(a, b) {
  return a.filter(x => b.includes(x));
}

const intersection = findIntersection(a, b);
console.log(intersection); 