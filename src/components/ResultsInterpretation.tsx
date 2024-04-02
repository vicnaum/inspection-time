import React from "react";
import RenderDebugTable from "./RenderDebugTable";

interface ResultsInterpretationProps {
  responseHistory: { exposureTime: number; correct: boolean }[];
  exposureTimes: number[];
  onReset: () => void;
}

const ResultsInterpretation: React.FC<ResultsInterpretationProps> = ({
  responseHistory,
  exposureTimes,
  onReset,
}) => {
  const calculateSmallestExposureTimeWithHighAccuracy = (): number | null => {
    const accuracyMap = responseHistory.reduce(
      (
        acc: Record<string, { total: number; correct: number }>,
        { exposureTime, correct }
      ) => {
        acc[exposureTime] = acc[exposureTime] || { total: 0, correct: 0 };
        acc[exposureTime].total++;
        if (correct) acc[exposureTime].correct++;
        return acc;
      },
      {}
    );

    const exposureTimeWithHighAccuracy = Object.entries(accuracyMap)
      .filter(([_, { total, correct }]) => correct / total > 0.85)
      .map(([exposureTime, _]) => parseFloat(exposureTime))
      .sort((a, b) => a - b)[0];

    return exposureTimeWithHighAccuracy || null;
  };

  const smallestExposureTimeWithHighAccuracy =
    calculateSmallestExposureTimeWithHighAccuracy();

  return (
    <div className="ResultsInterpretation">
      <h2>Your Inspection Time is:</h2>
      <div></div>
      {smallestExposureTimeWithHighAccuracy ? (
        <h2>{(smallestExposureTimeWithHighAccuracy * 1000).toFixed()} ms</h2>
      ) : (
        <h2>No exposure time with high accuracy</h2>
      )}
      {/* <RenderDebugTable
        responseHistory={responseHistory}
        exposureTimes={exposureTimes}
      /> */}
      <button onClick={onReset}>Start Over</button>
    </div>
  );
};
export default ResultsInterpretation;
