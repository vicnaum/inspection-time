import React from "react";

interface TShapesProps {
  display: "short" | "long" | "masked";
}

const TShapes: React.FC<TShapesProps> = ({ display }) => {
  const shortTLength = 50;
  const longTLength = 90;
  const strokeWidth = 2;
  const maskColor = "#000000"; // Light blue color for the mask

  return (
    <svg width="200px" height="200px" viewBox="0 0 100 100">
      <g>
        <line
          x1="25"
          y1="10"
          x2="75"
          y2="10"
          stroke="black"
          strokeWidth={strokeWidth}
        />
        <line
          x1="50"
          y1="10"
          x2="50"
          y2={display === "short" ? 10 + shortTLength : 10 + longTLength}
          stroke="black"
          strokeWidth={strokeWidth}
        />
        {display === "masked" && (
          <rect
            x="45"
            y={10 + shortTLength}
            width="10"
            height={longTLength - shortTLength}
            fill={maskColor}
          />
        )}
      </g>
    </svg>
  );
};

export default TShapes;
