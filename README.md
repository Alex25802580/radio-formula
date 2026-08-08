# Spoke Calculator

Spoke Calculator is a React Native / Expo app for calculating bicycle spoke length from real wheel, rim and hub measurements.

The app was created from a real need while building bicycle wheels and is published on Google Play with more than 1,000 downloads.

[View Spoke Calculator on Google Play](https://play.google.com/store/apps/details?id=com.alejandrocifuentes.calculadoraderadios)

## What it calculates

The calculator uses:

- number of spoke holes
- ERD (Effective Rim Diameter)
- rim offset and its direction
- left and right hub PCD (Pitch Circle Diameter)
- left and right flange distance from the hub center
- number of spoke crosses

It returns the required spoke length for the non-drive and drive sides independently.

## Calculation

The core calculation is isolated from the user interface in `utils/spokeCalculator.js`.

For each side of the wheel:

```text
L = sqrt(
  R² + r²
  - 2 × R × r × cos(alpha)
  + d²
)
```

where:

- `R` is half the ERD
- `r` is half the flange PCD
- `d` is the flange-to-rim-plane distance
- `alpha` is derived from the spoke count and crossing pattern

Asymmetric rims are handled by adjusting the effective left and right flange distances according to the selected rim-offset direction.

## Reliability

The calculation logic is separated from React Native so it can be tested independently.

Regression tests cover:

- a standard 32-hole / 3-cross wheel
- asymmetric hub dimensions
- radial lacing
- drive-side and non-drive-side rim offsets
- decimal values written with a comma or dot
- invalid and physically implausible measurements

Run the tests with:

```bash
npm test
```

## Saved wheels

Calculated wheels can be saved locally on the device with AsyncStorage.

New saved entries include the full set of wheel measurements as well as the result. The app remains compatible with wheels saved by previous versions.

## Tech stack

- React Native
- Expo
- React Navigation
- AsyncStorage
- Node.js built-in test runner

## Run locally

Requirements:

- Node.js 18 or newer
- npm
- Expo / Android development environment for device or emulator builds

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

## Project structure

```text
components/             Reusable input and choice screens
screens/                App navigation screens
utils/spokeCalculator.js  Calculation and validation logic
tests/                  Automated calculation tests
```

## Author

Developed by Alejandro Cifuentes.
