import React from "react";
import { Box, BoxProps } from "@mui/material";

export interface AppLogoProps extends BoxProps {
  size?: number;
  showGlow?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 32,
  showGlow = true,
  sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        borderRadius: `${Math.round(size * 0.23)}px`,
        boxShadow: showGlow
          ? "0 0 16px rgba(0, 221, 148, 0.28), 0 2px 8px rgba(0, 0, 0, 0.5)"
          : "none",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "scale(1.06)",
          boxShadow: showGlow
            ? "0 0 24px rgba(0, 221, 148, 0.5), 0 4px 12px rgba(0, 0, 0, 0.6)"
            : "none",
        },
        ...sx,
      }}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={size}
        height={size}
        style={{ display: "block", borderRadius: "inherit" }}
      >
        <defs>
          <linearGradient id="navBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#071018" />
            <stop offset="50%" stopColor="#0a1926" />
            <stop offset="100%" stopColor="#062319" />
          </linearGradient>
          <linearGradient id="navBrandGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00B87A" />
            <stop offset="50%" stopColor="#00DD94" />
            <stop offset="100%" stopColor="#00F5FF" />
          </linearGradient>
          <linearGradient id="navBar1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 221, 148, 0.15)" />
            <stop offset="100%" stopColor="rgba(0, 221, 148, 0.55)" />
          </linearGradient>
          <linearGradient id="navBar2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 221, 148, 0.25)" />
            <stop offset="100%" stopColor="rgba(0, 245, 255, 0.75)" />
          </linearGradient>
          <linearGradient id="navBar3" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 221, 148, 0.35)" />
            <stop offset="100%" stopColor="rgba(0, 245, 255, 0.95)" />
          </linearGradient>
        </defs>

        {/* Base Squircle */}
        <rect width="48" height="48" rx="11" fill="url(#navBgGrad)" />
        <rect
          x="0.75"
          y="0.75"
          width="46.5"
          height="46.5"
          rx="10.25"
          fill="none"
          stroke="rgba(0, 221, 148, 0.38)"
          strokeWidth="1.2"
        />

        {/* Benchmark Pillars (3 Ascending Tiers) */}
        <rect x="9.5" y="25" width="6" height="14" rx="2" fill="url(#navBar1)" />
        <rect x="18.5" y="18" width="6" height="21" rx="2" fill="url(#navBar2)" />
        <rect x="27.5" y="11" width="6" height="28" rx="2" fill="url(#navBar3)" />

        {/* Baseline Grid Axis */}
        <line
          x1="8"
          y1="39"
          x2="40"
          y2="39"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Outperforming Index Laser Curve */}
        <polyline
          points="8,27 17.5,21 25.5,23.5 37.5,9.5"
          fill="none"
          stroke="rgba(0, 221, 148, 0.45)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="8,27 17.5,21 25.5,23.5 37.5,9.5"
          fill="none"
          stroke="url(#navBrandGrad)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Apex Beacon (Breakthrough Node) */}
        <circle cx="37.5" cy="9.5" r="4.5" fill="rgba(0, 245, 255, 0.4)" />
        <circle cx="37.5" cy="9.5" r="2.8" fill="#FFFFFF" />
        <circle cx="37.5" cy="9.5" r="1.4" fill="#00F5FF" />
      </svg>
    </Box>
  );
};
