// 1
const printFibonachi = (index) => {
    let currNum = 0;
    let nextNum = 1;

    for (let i = 0; i < index; i++) {
        console.log(currNum);

        const temp = nextNum + currNum;
        currNum = nextNum;
        nextNum = temp;
    }
};

const printFibonachiConstantly = (index=10) => {
    const TIMEOUT = 100;
    setInterval(() => printFibonachi(index), TIMEOUT)
};

// 2
const filterEvenNumbers = (data) => data.map(
    (arr) => arr.filter((num) => num % 2 == 0)
);

console.log(filterEvenNumbers([[1,2,3], [4,5,6]]));
printFibonachiConstantly();

