import React from "react";

interface TestIntroductionProps {
  onStart: () => void;
}

function TestIntroduction({ onStart }: TestIntroductionProps) {
  return (
    <div className="Introduction">
      <h1>Inspection Time</h1>
      <div>
        The Inspection Time test measures a patient's visual processing speed -
        a foundational component of cognition.
      </div>
      <div>
        You will be presented with two T shapes, one of which will be longer for
        a very short amount of time. After the short time has passed - they will
        be masked with bold rectangles and you need to click on the side that
        had the longer T shape.
      </div>
      <div>
        Make sure to rotate your phone to Landscape mode and max brightness
        before starting
      </div>
      <button onClick={onStart}>Start Test</button>
    </div>
  );
}

export default TestIntroduction;
