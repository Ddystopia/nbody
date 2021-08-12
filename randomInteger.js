/**
 * Get random integer
 * @param {number} [min=0] lower bound
 * @param {number} [max=1] upper bound
 *
 * @returns {number}
 */
const randomInteger = (min = 0, max = 1) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
