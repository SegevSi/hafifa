// 1
function doubleNumericAtributes(obj) {
  const doubledObj = {};
  Object.keys(obj).forEach(key => {
    if (isNaN(obj[key])) {
        doubledObj[key] = obj[key];
    } else {
        doubledObj[key] = obj[key] * 2;
    }
  });
  
  return doubledObj;
}

// 2
function flipObject(obj) {
  const flipedObj = {};
  Object.keys(obj).forEach(key => {
    flipedObj[obj[key]] = key;
  });
  
  return flipedObj;
}

const obj = {1: 2, "cA": 4, 7:"sqw"};

console.log(flipObject(obj))
console.log(doubleNumericAtributes(obj))

