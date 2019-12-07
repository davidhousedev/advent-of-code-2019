const testData = require("./test_input");

const problemOne = (noun = 12, verb = 2) => {
  const fixedOpCode = [testData[0], noun, verb, ...testData.slice(3)];
  const opCodeResult = executeIntcode(fixedOpCode);
  return opCodeResult[0];
};

const problemTwo = () => {
  let noun = getRandomInt(99);
  let verb = getRandomInt(99);
  while (problemOne(noun, verb) !== 19690720) {
    noun = getRandomInt(99);
    verb = getRandomInt(99);
  }

  return `${noun}${
    verb.toString().length === 2 ? verb : verb.toString().padStart(2, "0")
  }`;
};

const executeIntcode = code => {
  let newCode = code.slice();
  for (let i = 0; i < code.length; i++) {
    switch (newCode[i]) {
      case 99:
        // Stop processing commands
        i = code.length;
        break;
      case 1:
      case 2:
        newCode = createIntcodeExecution(...newCode.slice(i, i + 4))(newCode);
        // Found valid instruction, skip ahead to next instruction
        i += 3;
        break;
      default:
        continue;
    }
  }

  return newCode;
};

const createIntcodeExecution = (
  instruction,
  firstPos,
  secondPos,
  storagePos
) => {
  const execFunc = instruction === 1 ? sum : multiply;
  return code => {
    const newCode = code.slice();
    const newVal = execFunc(code[firstPos], code[secondPos]);
    newCode[storagePos] = newVal;
    return newCode;
  };
};

const sum = (...args) => args.reduce((a, b) => a + b);
const multiply = (...args) => args.reduce((a, b) => a * b);
// cf: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = maxVal => Math.floor(Math.random() * Math.floor(maxVal));

if (require.main === module) {
  console.log("Day Two - Problem One: ", problemOne());
  console.log("Day Two - Problem One: ", problemTwo());
}

module.exports = {
  executeIntcode
};
