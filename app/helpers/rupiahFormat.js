function rupiahFormat(param) {
  let string = String(param);
  let res = [];
  let reverveIndex = 1;
  for (let i = string.length - 1; i >= 0; i--) {
    if (i != 0 && reverveIndex % 3 == 0) {
      res.push(`.${string[i]}`)
    } else {
      res.push(`${string[i]}`)
    }
    reverveIndex++;
  }
  return res.reverse().join("");
}

module.exports = rupiahFormat;