const testData = require("./test_input.js");

const problemOne = () => {
  const fuelRequired = testData.map(mass => calculateFuelRequired(mass));
  return fuelRequired.reduce((prev, cur) => prev + cur);
};

const problemTwo = () => {
  const fuelRequired = testData.map(mass => calculateTotalFuel(mass));
  return fuelRequired.reduce((prev, cur) => prev + cur);
};

const calculateTotalFuel = mass => {
  const fuelRequired = calculateFuelRequired(mass);
  if (fuelRequired <= 0) {
    return 0;
  }

  return fuelRequired + calculateTotalFuel(fuelRequired);
};

const calculateFuelRequired = mass => Math.floor(mass / 3) - 2;

if (require.main === module) {
  console.log("Day One - Problem One: ", problemOne());
  console.log("Day One - Problem Two: ", problemTwo());
}

module.exports = {
  calculateFuelRequired,
  calculateTotalFuel
};
