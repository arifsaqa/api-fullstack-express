const d = (numbers) => {
  // console.log(numbers);
  // console.log(numbers.toString());
  return numbers
    .toString()
    .split('')
    .map((number, i) => i  == 3? "." + number : number)
    .join('')
};

console.log(d(1000000));