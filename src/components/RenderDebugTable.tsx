import React from "react";

const RenderDebugTable: React.FC<{
  responseHistory: {
    exposureTime: number;
    correct: boolean;
  }[];
  exposureTimes: number[];
}> = ({ responseHistory, exposureTimes }) => {
  // Calculate statistics for each exposure time
  const stats = exposureTimes.map((exposureTime) => {
    const responsesForExposure = responseHistory.filter(
      (r) => r.exposureTime === exposureTime
    );
    const correctResponses = responsesForExposure.filter(
      (r) => r.correct
    ).length;
    const totalResponses = responsesForExposure.length;
    const ratio = totalResponses > 0 ? correctResponses / totalResponses : 0;

    return {
      exposureTime,
      correctResponses,
      totalResponses,
      ratio: ratio.toFixed(2), // Keeping two decimal places for readability
    };
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Exposure Time</th>
          <th>Correct Responses</th>
          <th>Total Responses</th>
          <th>Ratio</th>
        </tr>
      </thead>
      <tbody>
        {stats.map(
          ({ exposureTime, correctResponses, totalResponses, ratio }) => (
            <tr key={exposureTime}>
              <td>{exposureTime}</td>
              <td>{correctResponses}</td>
              <td>{totalResponses}</td>
              <td>{ratio}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default RenderDebugTable;
