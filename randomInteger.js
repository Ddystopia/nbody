const randomInteger = (min = 0, max = 1) => {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
