import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { SectorAllocationItem } from "../../types/institutional13F";

interface InstitutionalSectorViewProps {
  sectors: SectorAllocationItem[];
}

export const InstitutionalSectorView: React.FC<InstitutionalSectorViewProps> = ({
  sectors,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Intro Header */}
      <Paper
        variant="outlined"
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          backgroundColor: "rgba(11, 26, 20, 0.7)",
          borderColor: "rgba(0, 221, 148, 0.25)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <PieChartOutlineIcon sx={{ color: "#00DD94", fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
            Institutional Sector Allocation vs. S&P 500
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 900, lineHeight: 1.5 }}>
          Comparison of capital allocation across all 11 GICS sectors between the Top 100 institutional managers and the S&P 500 capitalization-weighted benchmark.
        </Typography>
      </Paper>

      {/* 11 Sector Grid Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        {sectors.map((sec) => {
          const isOverweight = sec.difference > 0;
          const isNeutral = sec.difference === 0;

          return (
            <Card
              key={sec.sector}
              variant="outlined"
              sx={{
                borderRadius: 3,
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                {/* Sector Title & Delta Pill */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary", fontSize: "0.96rem" }}>
                    {sec.sector}
                  </Typography>

                  <Chip
                    icon={
                      isOverweight ? (
                        <TrendingUpIcon sx={{ fontSize: "14px !important" }} />
                      ) : (
                        <TrendingDownIcon sx={{ fontSize: "14px !important" }} />
                      )
                    }
                    label={`${isOverweight ? "+" : ""}${sec.difference}% ${
                      isOverweight ? "Overweight" : isNeutral ? "Neutral" : "Underweight"
                    }`}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      backgroundColor: isOverweight
                        ? "rgba(0, 221, 148, 0.15)"
                        : "rgba(239, 68, 68, 0.15)",
                      color: isOverweight ? "#00DD94" : "#f87171",
                      border: `1px solid ${isOverweight ? "rgba(0, 221, 148, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                    }}
                  />
                </Stack>

                {/* Capital Pill */}
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem", mb: 2 }}>
                  Institutional Capital Deployed:{" "}
                  <span style={{ fontWeight: 800, color: "text.primary" }}>
                    ${sec.totalValue.toLocaleString()} Billion
                  </span>
                </Typography>

                {/* Institutional Allocation Bar */}
                <Box sx={{ mb: 1.5 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: "#00DD94", fontWeight: 700 }}>
                      Institutional Weight: {sec.institutionalWeight}%
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Target: {sec.institutionalWeight}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(100, sec.institutionalWeight * 2.5)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#00DD94",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                {/* S&P 500 Benchmark Allocation Bar */}
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: "#38bdf8", fontWeight: 700 }}>
                      S&P 500 Benchmark Weight: {sec.sp500Weight}%
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Index: {sec.sp500Weight}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(100, sec.sp500Weight * 2.5)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#38bdf8",
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
