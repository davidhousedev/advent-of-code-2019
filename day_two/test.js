import test from "ava";
import { executeIntcode } from ".";

test("Computer can execute basic Optcode", t => {
  t.assert(arraysEqual(executeIntcode([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]));
  t.assert(arraysEqual(executeIntcode([2, 3, 0, 3, 99]), [2, 3, 0, 6, 99]));
  t.assert(
    arraysEqual(executeIntcode([2, 4, 4, 5, 99, 0]), [2, 4, 4, 5, 99, 9801])
  );
  t.assert(
    arraysEqual(executeIntcode([1, 1, 1, 4, 99, 5, 6, 0, 99]), [
      30,
      1,
      1,
      4,
      2,
      5,
      6,
      0,
      99
    ])
  );
});

const arraysEqual = (arr1, arr2) =>
  JSON.stringify(arr1) === JSON.stringify(arr2);
