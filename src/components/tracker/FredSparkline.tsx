import { Box } from "@mui/material";
import React, { useMemo } from "react";

export interface FredSparklineProps {
  data: [string, number][];
  width?: number | string;
  height?: number;
  strokeColor?: string;
}

export const FredSparkline: React.FC<FredSparklineProps> = ({
  data,
  width = 110,
  height = 36,
  strokeColor,
}) => {
  const { pathD, areaD, finalStrokeColor } =
    useMemo(() => {
      if (!data || data.length < 2) {
        return {
          pathD: "",
          areaD: "",
          finalStrokeColor: "#10b981",
        };
      }

      // Sample last 60 points for responsive sparkline
      const pts = data.slice(-60);
      const values = pts.map((p) => p[1]);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1;

      const w = 100;
      const h = 32;
      const padding = 2;

      const points = values.map((val, idx) => {
        const x = (idx / (values.length - 1)) * (w - padding * 2) + padding;
        const y = h - ((val - min) / range) * (h - padding * 2) - padding;
        return [Number(x.toFixed(1)), Number(y.toFixed(1))];
      });

      const firstVal = values[0];
      const lastVal = values[values.length - 1];
      const positive = lastVal >= firstVal;

      const defaultStroke = positive ? "#10b981" : "#ef4444";

      const lineD = points.reduce(
        (acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0]} ${curr[1]}`,
        "",
      );

      const areaPath = `${lineD} L ${points[points.length - 1][0]} ${h} L ${points[0][0]} ${h} Z`;

      return {
        pathD: lineD,
        areaD: areaPath,
        finalStrokeColor: strokeColor || defaultStroke,
      };
    }, [data, strokeColor]);

  if (!pathD) {
    return <Box sx={{ width, height }} />;
  }

  const gradId = `spark-grad-${Math.random().toString(36).substring(2, 8)}`;

  return (
    <Box
      sx={{
        width,
        height,
        display: "inline-block",
        verticalAlign: "middle",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={finalStrokeColor} stopOpacity={0.35} />
            <stop offset="100%" stopColor={finalStrokeColor} stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#${gradId})`} />
        <path
          d={pathD}
          fill="none"
          stroke={finalStrokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};
