import testData from "./test_data";

const problemOne = () => {
  const { wire1, wire2 } = testData;
  return distanceToNearestIntersection(wire1, wire2);
};

const distanceToNearestIntersection = (wire1, wire2) => {
  // Create x,y point representations of wire paths, and convert
  // those point values to strings so that a union can be derived
  // from the points in each of the paths
  const wirePath1 = hashify(drawLineFromDirectives(wire1));
  const wirePath2 = hashify(drawLineFromDirectives(wire2));

  // Determine the union of the points in both paths
  const pathPointIntersection = wirePath2.filter(point =>
    wirePath1.includes(point)
  );

  // Determine the smallest manhattan distance, derived from the
  // grid movements away from the origin point of 0,0
  const manhattanDistances = pathPointIntersection.map(tokenizedPoint => {
    const [x, y] = JSON.parse(tokenizedPoint);
    return Math.abs(x) + Math.abs(y);
  });
  const shortestDistance = manhattanDistances.sort();

  // We can ignore the 0th element, since 0,0 will be included
  // in both lines, which will result in the shortest distance
  // always being 0.
  return shortestDistance[1];
};

const drawLineFromDirectives = directives =>
  directives.reduce(
    (prev, cur) => [...prev, ...drawLine(prev[prev.length - 1], cur)],
    [[0, 0]]
  );

const drawLine = (prevPoint, directive) => {
  const direction = directive[0];
  const spaces = parseInt(directive.slice(1));

  // Build an array of functions to apply, in order, starting
  // at the previous point in the line
  const instructions = [];
  for (let i = 0; i < spaces; i++) {
    instructions.push(buildNextMovement(direction));
  }

  // Create the array of points comprising the new line
  if (!instructions.length) {
    return [];
  }
  const newLine = [instructions[0](prevPoint)];
  for (instruction of instructions.slice(1)) {
    newLine.push(instruction(newLine[newLine.length - 1]));
  }

  return newLine;
};

const buildNextMovement = direction => {
  switch (direction) {
    case "U":
      return ([x, y]) => [x, y + 1];
    case "D":
      return ([x, y]) => [x, y - 1];
    case "L":
      return ([x, y]) => [x - 1, y];
    case "R":
      return ([x, y]) => [x + 1, y];
    default:
      // If not given a valid direction, return a function that simply
      // returns the provided point
      console.error(`Provided an unknown direction: "${direction}"`);
      return point => point;
  }
};

const hashify = array => array.map(item => JSON.stringify(item));

if (require.main === module) {
  console.log("Day Three - Problem One: ", problemOne());
}

module.exports = {
  buildNextMovement,
  distanceToNearestIntersection,
  drawLine,
  drawLineFromDirectives
};
