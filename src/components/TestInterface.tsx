import React, { useState, useEffect } from "react";
import TShapes from "./TShapes";
import RenderDebugTable from "./RenderDebugTable";

interface TestInterfaceProps {
  onEnd: () => void;
  setGlobalResponseHistory: React.Dispatch<
    React.SetStateAction<{ exposureTime: number; correct: boolean }[]>
  >;
  exposureTimes: number[];
}

const TestInterface: React.FC<TestInterfaceProps> = ({
  onEnd,
  setGlobalResponseHistory,
  exposureTimes,
}) => {
  const [currentExposureIndex, setCurrentExposureIndex] = useState(0);
  const [longerLineSide, setLongerLineSide] = useState<"left" | "right">(
    Math.random() > 0.5 ? "left" : "right"
  );
  const [displayType, setDisplayType] = useState<"normal" | "masked">("normal");
  const [exposureStart, setExposureStart] = useState<number | null>(null);
  const [responseHistory, setResponseHistory] = useState<
    { exposureTime: number; correct: boolean }[]
  >([]);
  const [isVisible, setIsVisible] = useState(false); // New state variable for controlling visibility

  // Inside your component, add a new function to calculate and render the debug information

  useEffect(() => {
    // Clear screen at the beginning of the test
    setIsVisible(false);
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      setDisplayType("normal");
      const timer = setTimeout(() => {
        setDisplayType("masked");
        setExposureStart(performance.now());
      }, exposureTimes[currentExposureIndex] * 1000);
      return () => clearTimeout(timer);
    }, 500); // Clear screen for 1 second

    return () => clearTimeout(initialTimer);
  }, [longerLineSide, currentExposureIndex, responseHistory.length]);

  function recordResponse(correct: boolean) {
    if (exposureStart === null) return;

    setResponseHistory((prevHistory) => [
      ...prevHistory,
      { exposureTime: exposureTimes[currentExposureIndex], correct },
    ]);
    prepareNextTrial(correct);
  }

  function isStatisticallySignificant(
    ratio: number,
    numberOfTries: number,
    totalTies: number
  ): boolean {
    if (totalTies > 69) {
      return true;
    }
    let baseThreshold = 0.95;

    if (numberOfTries < 10) {
      return false;
    }

    return ratio >= baseThreshold;
  }

  async function prepareNextTrial(correct: boolean) {
    console.log("Correct:", correct);
    setIsVisible(false); // Immediately clear screen

    setLongerLineSide(Math.random() > 0.5 ? "left" : "right");
    setExposureStart(null);

    // Adjust currentExposureIndex based on the correctness of the response
    setCurrentExposureIndex((prevIndex) =>
      correct
        ? Math.min(prevIndex + 1, exposureTimes.length - 1)
        : Math.max(prevIndex - 1, 0)
    );

    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 1 second
    setIsVisible(true); // Then show the T's

    // Calculate the consistency ratio for the new currentExposureIndex
    const newExposureTime = exposureTimes[currentExposureIndex];
    const responsesForNewExposureTime = responseHistory.filter(
      (r) => r.exposureTime === newExposureTime
    );
    const correctResponses = responsesForNewExposureTime.filter(
      (r) => r.correct
    ).length;
    const consistencyRatio =
      correctResponses / responsesForNewExposureTime.length;

    // End the test if the consistency ratio for the new exposure time is statistically significant
    if (
      isStatisticallySignificant(
        consistencyRatio,
        responsesForNewExposureTime.length,
        responseHistory.length
      )
    ) {
      console.log("Consistency ratio is statistically significant!");
      setGlobalResponseHistory(responseHistory);
      onEnd();
    }
  }
  const handleLineClick = (side: "left" | "right") => {
    const correct = side === longerLineSide;
    recordResponse(correct);
  };

  return (
    <div className="TestInterface">
      <div
        className="lineContainer"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        <div onClick={() => handleLineClick("left")}>
          <TShapes
            display={
              displayType === "normal"
                ? longerLineSide === "left"
                  ? "long"
                  : "short"
                : "masked"
            }
          />
        </div>
        <div onClick={() => handleLineClick("right")}>
          <TShapes
            display={
              displayType === "normal"
                ? longerLineSide === "right"
                  ? "long"
                  : "short"
                : "masked"
            }
          />
        </div>
      </div>
      <p>Which T was longer?</p>
      <p>
        Current Exposure Time: {exposureTimes[currentExposureIndex].toFixed(4)}{" "}
        seconds
      </p>
      {/* <RenderDebugTable
        responseHistory={responseHistory}
        exposureTimes={exposureTimes}
      /> */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          margin: "10px 0",
        }}
      >
        <div
          style={{
            height: "10px",
            borderRadius: "5px",
            backgroundColor: "#4caf50",
            width: `${Math.min((responseHistory.length / 70) * 100, 100)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TestInterface;
