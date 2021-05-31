import React, { useState } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import "./App.css";

import { AllUnits, TemperatureUnits, VolumeUnits } from "./Constants";
import { ConvertTemperature, ConvertVolume } from "./Converter";

const App = () => {
  const [inputValue, setInputValue] = useState(0.0);
  const [inputUnit, setInputUnit] = useState(null);
  const [targetUnit, setTargetUnit] = useState(null);
  const [studentResponse, setStudentResponse] = useState(0.0);

  const [output, setOutput] = useState(null);

  const handleSubmit = () => {
    if (inputUnit == null || targetUnit == null) {
      setOutput("Input Unit, Target Unit fields are mandatory.");
      return;
    }

    // Invalid unit of measure
    if (!AllUnits.includes(inputUnit) || !AllUnits.includes(targetUnit)) {
      setOutput("invalid");
      return;
    }

    // Input, target units not belonging to same category is Invalid case.
    if (
      (TemperatureUnits.includes(inputUnit) &&
        VolumeUnits.includes(targetUnit)) ||
      (VolumeUnits.includes(inputUnit) && TemperatureUnits.includes(targetUnit))
    ) {
      setOutput("invalid");
      return;
    }

    // Invalid input or target values
    if (isNaN(Number(inputValue)) || isNaN(Number(studentResponse))) {
      setOutput("invalid");
      return;
    }

    let expectedTarget = null;
    if (TemperatureUnits.includes(inputUnit)) {
      expectedTarget = ConvertTemperature(inputUnit, targetUnit, inputValue);
    } else if (VolumeUnits.includes(inputUnit)) {
      expectedTarget = ConvertVolume(inputUnit, targetUnit, inputValue);
    }

    console.log("Comparing", expectedTarget, studentResponse);

    if (Number(studentResponse) === expectedTarget) {
      setOutput("correct");
    } else {
      setOutput("incorrect");
    }
  };

  return (
    <Container className="App">
      <h2 className="text-center">Unit Conversion Application</h2>
      <Form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <Col className="mt-4">
          <FormGroup>
            <Label>Input Numerical Value:</Label>
            <Input
              type="text"
              name="inputValue"
              placeholder="0.0"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col className="mt-4">
          <FormGroup>
            <Label>Input Unit of Measure:</Label>
            <Input
              type="text"
              name="inputUnit"
              value={inputUnit}
              onChange={(e) => {
                setInputUnit(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col className="mt-4">
          <FormGroup>
            <Label>Target Unit of Measure:</Label>
            <Input
              type="text"
              name="targetUnit"
              value={targetUnit}
              onChange={(e) => {
                setTargetUnit(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col className="mt-4">
          <FormGroup>
            <Label>Student Response Value:</Label>
            <Input
              type="text"
              name="studentResponse"
              placeholder="0.0"
              value={studentResponse}
              onChange={(e) => {
                setStudentResponse(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Button color="primary" style={{ marginTop: "25px" }}>
          Submit
        </Button>
        {output != null && (
          <Col className="mt-4">
            <p>Output: {output} </p>
          </Col>
        )}
      </Form>
    </Container>
  );
};

export default App;
