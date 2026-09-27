import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { ProviderId } from "../types";

export interface ProviderLogoProps {
  providerId: ProviderId | "all";
  size?: number;
  sx?: SxProps<Theme>;
}

const BASE = import.meta.env.BASE_URL;

const LOGO_CONFIG: Record<
  ProviderId | "all",
  { src: string; alt: string; bg: string; paddingRatio: number }
> = {
  all: {
    src: `${BASE}logos/all.svg`,
    alt: "All Providers",
    bg: "#6366f1",
    paddingRatio: 0.12,
  },
  sp: {
    src: `${BASE}logos/sp_mark.svg`,
    alt: "S&P Dow Jones Indices",
    bg: "#ffffff",
    paddingRatio: 0.12,
  },
  ftse: {
    src: `${BASE}logos/ftse_mark.svg`,
    alt: "FTSE Russell",
    bg: "#ffffff",
    paddingRatio: 0.1,
  },
  msci: {
    src: `${BASE}logos/msci_mark.svg`,
    alt: "MSCI",
    bg: "#ffffff",
    paddingRatio: 0.1,
  },
  nasdaq: {
    src: `${BASE}logos/icons/nasdaq.png`,
    alt: "NASDAQ",
    bg: "#ffffff",
    paddingRatio: 0.08,
  },
  crsp: {
    src: `${BASE}logos/crsp.png`,
    alt: "CRSP",
    bg: "#ffffff",
    paddingRatio: 0.06,
  },
  ice: {
    src: `${BASE}logos/icons/ice.png`,
    alt: "ICE",
    bg: "#ffffff",
    paddingRatio: 0.06,
  },
  marketvector: {
    src: `${BASE}logos/icons/marketvector.png`,
    alt: "MarketVector",
    bg: "#ffffff",
    paddingRatio: 0.06,
  },
  bloomberg: {
    src: `${BASE}logos/icons/bloomberg.png`,
    alt: "Bloomberg",
    bg: "#ffffff",
    paddingRatio: 0.06,
  },
};

export const ProviderLogo: React.FC<ProviderLogoProps> = ({
  providerId,
  size = 20,
  sx,
}) => {
  const config = LOGO_CONFIG[providerId] || LOGO_CONFIG.all;
  const padding = Math.max(1.5, Math.round(size * config.paddingRatio));

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: "22%",
        backgroundColor: config.bg,
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.35)",
        overflow: "hidden",
        flexShrink: 0,
        boxSizing: "border-box",
        p: `${padding}px`,
        ...sx,
      }}
    >
      <img
        src={config.src}
        alt={config.alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </Box>
  );
};
