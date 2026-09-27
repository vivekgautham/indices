import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { ProviderId } from "../types";

export interface ProviderLogoProps {
  providerId: ProviderId | "all";
  size?: number;
  sx?: SxProps<Theme>;
}

export const ProviderLogo: React.FC<ProviderLogoProps> = ({
  providerId,
  size = 20,
  sx,
}) => {
  const renderSvg = () => {
    switch (providerId) {
      case "all":
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#6366f1" />
            <circle cx="12" cy="12" r="7.5" stroke="#ffffff" strokeWidth="1.4" />
            <ellipse
              cx="12"
              cy="12"
              rx="3.2"
              ry="7.5"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <line
              x1="4.5"
              y1="12"
              x2="19.5"
              y2="12"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <path
              d="M6.2 8.5h11.6M6.2 15.5h11.6"
              stroke="#c7d2fe"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        );

      case "sp":
        // S&P Dow Jones Indices / S&P Global
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#8b5cf6" />
            {/* 'S' letterform */}
            <path
              d="M5.5 8.2C5.5 7.2 6.4 6.5 7.5 6.5H9.5C10.6 6.5 11.5 7.3 11.5 8.3C11.5 9.3 10.7 10 9.7 10.2L7.3 10.6C6.3 10.8 5.5 11.5 5.5 12.5C5.5 13.6 6.4 14.5 7.5 14.5H9.8C10.9 14.5 11.8 13.7 11.8 12.6"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Signature S&P diagonal accent slash */}
            <line
              x1="11.2"
              y1="17"
              x2="14"
              y2="5.5"
              stroke="#f43f5e"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            {/* 'P' letterform */}
            <path
              d="M14 6.5H16.8C18.2 6.5 19.3 7.5 19.3 8.9C19.3 10.3 18.2 11.3 16.8 11.3H14M14 6.5V16.5"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case "ftse":
        // FTSE Russell (LSEG)
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#1d4ed8" />
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="3.5"
              stroke="#60a5fa"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            <text
              x="12"
              y="13"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="6.8"
              letterSpacing="0.2px"
            >
              FTSE
            </text>
            <text
              x="12"
              y="18.5"
              textAnchor="middle"
              fill="#93c5fd"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="800"
              fontSize="4.2"
              letterSpacing="0.6px"
            >
              RUSSELL
            </text>
          </svg>
        );

      case "msci":
        // MSCI Inc.
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#059669" />
            <text
              x="12"
              y="15.5"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="7.5"
              letterSpacing="0.6px"
            >
              MSCI
            </text>
            {/* Subtle top indicator bar */}
            <rect x="5.5" y="4.5" width="13" height="1.2" rx="0.6" fill="#34d399" />
          </svg>
        );

      case "nasdaq":
        // Nasdaq Global Indexes (Folded Ribbon 'N')
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#0891b2" />
            {/* Left pillar */}
            <path
              d="M5.5 17.5V6.5L11 12V17.5L5.5 17.5Z"
              fill="#ffffff"
            />
            {/* Right pillar with facet fold */}
            <path
              d="M11 6.5L17.5 12.5V17.5L11 11.5V6.5Z"
              fill="#cffafe"
            />
            {/* Top folded triangle facet */}
            <path
              d="M11 6.5H17.5V12.5L11 6.5Z"
              fill="#22d3ee"
            />
          </svg>
        );

      case "crsp":
        // Center for Research in Security Prices / Morningstar
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#d97706" />
            {/* Financial decile return curve */}
            <path
              d="M4.5 12.5C7.5 12.5 8.5 7 12 7C15.5 7 16.5 5 19.5 5"
              stroke="#fef3c7"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <text
              x="12"
              y="18.5"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="6.8"
              letterSpacing="0.4px"
            >
              CRSP
            </text>
          </svg>
        );

      case "ice":
        // Intercontinental Exchange / NYSE
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#0284c7" />
            {/* Globe latitude curves */}
            <path
              d="M4 12C4 7.5 7.5 4 12 4M20 12C20 16.5 16.5 20 12 20"
              stroke="#7dd3fc"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <text
              x="12"
              y="15.8"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="8"
              letterSpacing="-0.3px"
            >
              ice
            </text>
          </svg>
        );

      case "marketvector":
        // MarketVector Indexes / VanEck
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#ea580c" />
            {/* Stylized M with forward directional vector arrows */}
            <path
              d="M4.5 16V8L8.8 12.8L13 8V16"
              stroke="#ffffff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 9.5L18.5 12L15 14.5"
              stroke="#fed7aa"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case "bloomberg":
        // Bloomberg Index Services (Classic Terminal B)
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="5" fill="#f97316" />
            {/* Bloomberg terminal 'B' */}
            <path
              d="M7 5.5H12.8C14.8 5.5 16.3 6.8 16.3 8.6C16.3 9.9 15.5 11 14.4 11.4C15.8 11.8 16.8 13.1 16.8 14.6C16.8 16.6 15.1 18.2 12.9 18.2H7V5.5Z"
              fill="#ffffff"
            />
            <circle cx="10.8" cy="9" r="1.3" fill="#f97316" />
            <circle cx="11.2" cy="14.6" r="1.4" fill="#f97316" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        flexShrink: 0,
        borderRadius: "5px",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        ...sx,
      }}
    >
      {renderSvg()}
    </Box>
  );
};
