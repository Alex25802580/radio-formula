const test = require('node:test');
const assert = require('node:assert/strict');

const {
  RIM_OFFSET_DIRECTIONS,
  calculateSpokeLength,
  calculateWheelSpokes,
  normalizeDecimalInput,
  parseDecimal,
  validateErd,
  validateWheel,
} = require('../utils/spokeCalculator');

test('keeps the original 32-hole, 3-cross calculation unchanged', () => {
  const length = calculateSpokeLength({
    erd: 600,
    pcd: 58,
    flangeDistance: 35,
    crosses: 3,
    holes: 32,
  });

  assert.equal(length.toFixed(1), '292.2');
});

test('keeps asymmetric hub calculations unchanged', () => {
  const left = calculateSpokeLength({
    erd: 600,
    pcd: 58,
    flangeDistance: 35,
    crosses: 3,
    holes: 32,
  });
  const right = calculateSpokeLength({
    erd: 600,
    pcd: 58,
    flangeDistance: 20,
    crosses: 3,
    holes: 32,
  });

  assert.equal(left.toFixed(1), '292.2');
  assert.equal(right.toFixed(1), '290.8');
});

test('keeps radial calculations unchanged', () => {
  const length = calculateSpokeLength({
    erd: 600,
    pcd: 58,
    flangeDistance: 35,
    crosses: 0,
    holes: 32,
  });

  assert.equal(length.toFixed(1), '273.3');
});

test('drive-side rim offset increases left distance and decreases right distance', () => {
  const result = calculateWheelSpokes({
    holes: 32,
    erd: 600,
    rimOffset: 2.5,
    rimOffsetDirection: RIM_OFFSET_DIRECTIONS.DRIVE,
    leftPcd: 58,
    rightPcd: 58,
    leftFlangeDistance: 35,
    rightFlangeDistance: 20,
    crosses: 3,
  });

  assert.equal(result.leftRounded, 292.6);
  assert.equal(result.rightRounded, 290.7);
});

test('non-drive-side rim offset applies the offset in the opposite direction', () => {
  const drive = calculateWheelSpokes({
    holes: 32,
    erd: 600,
    rimOffset: 2.5,
    rimOffsetDirection: RIM_OFFSET_DIRECTIONS.DRIVE,
    leftPcd: 58,
    rightPcd: 58,
    leftFlangeDistance: 35,
    rightFlangeDistance: 20,
    crosses: 3,
  });
  const nonDrive = calculateWheelSpokes({
    holes: 32,
    erd: 600,
    rimOffset: 2.5,
    rimOffsetDirection: RIM_OFFSET_DIRECTIONS.NON_DRIVE,
    leftPcd: 58,
    rightPcd: 58,
    leftFlangeDistance: 35,
    rightFlangeDistance: 20,
    crosses: 3,
  });

  assert.notEqual(drive.leftRounded, nonDrive.leftRounded);
  assert.notEqual(drive.rightRounded, nonDrive.rightRounded);
});

test('accepts comma as decimal separator', () => {
  assert.equal(normalizeDecimalInput('35,5'), '35.5');
  assert.equal(parseDecimal('35,5'), 35.5);
});

test('rejects blank and physically implausible ERD values', () => {
  assert.equal(validateErd('   ').valid, false);
  assert.equal(validateErd('-600').valid, false);
  assert.equal(validateErd('50').valid, false);
});

test('rejects impossible PCD relative to ERD', () => {
  const validation = validateWheel({
    holes: 32,
    erd: 600,
    rimOffset: 0,
    rimOffsetDirection: RIM_OFFSET_DIRECTIONS.DRIVE,
    leftPcd: 650,
    rightPcd: 58,
    leftFlangeDistance: 35,
    rightFlangeDistance: 20,
    crosses: 3,
  });

  assert.equal(validation.valid, false);
});
