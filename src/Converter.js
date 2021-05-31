import * as converter from "units-converter";

const TemperatureMapping = {
  Kelvin: "K",
  Celsius: "C",
  Fahrenheit: "F",
  Rankine: "R",
};

const VolumeMapping = {
  liters: "l",
  tablespoons: "Tbs",
  "cubic-inches": "in3",
  cups: "cup",
  "cubic-feet": "ft3",
  gallons: "gal",
};

const ConvertTemperature = (fromUnit, toUnit, inputValue) => {
  return Number(
    converter
      .temperature(Number(inputValue))
      .from(TemperatureMapping[fromUnit])
      .to(TemperatureMapping[toUnit])
      .value.toFixed(1)
  );
};

const ConvertVolume = (fromUnit, toUnit, inputValue) => {
  return Number(
    converter
      .volume(Number(inputValue))
      .from(VolumeMapping[fromUnit])
      .to(VolumeMapping[toUnit])
      .value.toFixed(1)
  );
};

export { ConvertTemperature, ConvertVolume };
