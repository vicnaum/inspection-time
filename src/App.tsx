import React, { useState } from "react";
import TestIntroduction from "./components/TestIntroduction";
import TestInterface from "./components/TestInterface";
import ResultsInterpretation from "./components/ResultsInterpretation";
import "./App.css";

function App() {
  const [currentStep, setCurrentStep] = useState("introduction");
  const [responseHistory, setResponseHistory] = useState<
    { exposureTime: number; correct: boolean }[]
  >([]);
  const exposureTimes = Array.from({ length: 30 }, (_, i) => (30 - i) / 120);

  // Function to start the test
  const startTest = () => {
    setCurrentStep("test");
  };

  // Function to end the test and calculate results
  const endTest = () => {
    setCurrentStep("results");
    // Calculate average time here
  };

  const resetTest = () => {
    setCurrentStep("introduction");
    setResponseHistory([]);
  };

  return (
    <div className="App">
      {currentStep === "introduction" && (
        <TestIntroduction onStart={startTest} />
      )}
      {currentStep === "test" && (
        <TestInterface
          onEnd={endTest}
          setGlobalResponseHistory={setResponseHistory}
          exposureTimes={exposureTimes}
        />
      )}
      {currentStep === "results" && (
        <ResultsInterpretation
          responseHistory={responseHistory}
          exposureTimes={exposureTimes}
          onReset={resetTest}
        />
      )}
    </div>
  );
}

export default App;
