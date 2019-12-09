import test from "ava";
import {
  distanceToNearestIntersection,
  drawLine,
  drawLineFromDirectives,
  buildNextMovement
} from ".";

test("Directive can be represented as an array of [x, y] points", t => {
  t.assert(arraysEqual(drawLine([0, 0], "U1"), [[0, 1]]));
  t.assert(arraysEqual(drawLine([0, 0], "D1"), [[0, -1]]));
  t.assert(arraysEqual(drawLine([0, 0], "R1"), [[1, 0]]));
  t.assert(arraysEqual(drawLine([0, 0], "L1"), [[-1, 0]]));

  t.assert(arraysEqual(drawLine([1, 1], "U1"), [[1, 2]]));
  t.assert(arraysEqual(drawLine([1, 1], "D1"), [[1, 0]]));
  t.assert(arraysEqual(drawLine([1, 1], "R1"), [[2, 1]]));
  t.assert(arraysEqual(drawLine([1, 1], "L1"), [[0, 1]]));

  t.assert(
    arraysEqual(drawLine([0, 0], "U2"), [
      [0, 1],
      [0, 2]
    ])
  );
  t.assert(
    arraysEqual(drawLine([0, 0], "D2"), [
      [0, -1],
      [0, -2]
    ])
  );
  t.assert(
    arraysEqual(drawLine([0, 0], "R2"), [
      [1, 0],
      [2, 0]
    ])
  );
  t.assert(
    arraysEqual(drawLine([0, 0], "L2"), [
      [-1, 0],
      [-2, 0]
    ])
  );
});

test("Can draw line from multiple directives", t => {
  t.assert(
    arraysEqual(drawLineFromDirectives(["U1", "R1", "D1", "L1"]), [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
      [0, 0]
    ])
  );
  t.assert(
    arraysEqual(drawLineFromDirectives(["U2", "D2"]), [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 1],
      [0, 0]
    ])
  );
  t.assert(
    arraysEqual(drawLineFromDirectives(["U4"]), [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4]
    ])
  );
});

test("Can create the right next movement given a direction", t => {
  t.assert(arraysEqual(buildNextMovement("U")([0, 0]), [0, 1]));
  t.assert(arraysEqual(buildNextMovement("D")([0, 0]), [0, -1]));
  t.assert(arraysEqual(buildNextMovement("L")([0, 0]), [-1, 0]));
  t.assert(arraysEqual(buildNextMovement("R")([0, 0]), [1, 0]));
});

test("Can find nearest intersection of two wires", t => {
  t.assert(
    distanceToNearestIntersection(
      ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
      ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
    ) === 159
  );

  t.assert(
    distanceToNearestIntersection(
      [
        "R98",
        "U47",
        "R26",
        "D63",
        "R33",
        "U87",
        "L62",
        "D20",
        "R33",
        "U53",
        "R51"
      ],
      ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
    ) === 135
  );
});

const arraysEqual = (arr1, arr2) =>
  JSON.stringify(arr1) === JSON.stringify(arr2);
