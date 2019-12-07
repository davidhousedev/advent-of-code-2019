import test from "ava";
import { calculateFuelRequired, calculateTotalFuel } from "./index.js";

test("Calculate required fuel", t => {
  t.assert(calculateFuelRequired(12) === 2);
  t.assert(calculateFuelRequired(14) === 2);
  t.assert(calculateFuelRequired(1969) === 654);
  t.assert(calculateFuelRequired(100756) === 33583);
});

test("Ensure fuel is brought for required fuel", t => {
  t.assert(calculateTotalFuel(14) === 2);
  t.assert(calculateTotalFuel(1969) === 966);
  t.assert(calculateTotalFuel(100756) === 50346);
});
