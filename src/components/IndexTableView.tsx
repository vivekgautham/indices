import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { MarketIndex } from "../types";
import { ProviderLogo } from "./ProviderLogo";

export interface IndexTableViewProps {
  indices: MarketIndex[];
}

export const IndexTableView: React.FC<IndexTableViewProps> = ({ indices }) => {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        borderRadius: 3,
        backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.4))",
        backdropFilter: "blur(12px)",
        borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
        "& .MuiTableCell-root": {
          borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="indices table">
        <TableHead
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Index Name
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Provider
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Category
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 700, color: "text.secondary" }}
            >
              Constituents
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Top ETFs
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {indices.map((idx) => (
            <TableRow
              key={idx.id}
              hover
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.08)",
                },
              }}
            >
              <TableCell component="th" scope="row">
                <Box
                  component={RouterLink}
                  to={`/index/${idx.id}`}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "primary.light",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {idx.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      mt: 0.5,
                    }}
                  >
                    <Chip
                      label={idx.symbol}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        borderRadius: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "text.secondary",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontSize: "0.7rem" }}
                    >
                      {idx.region}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ProviderLogo providerId={idx.providerId} size={16} />
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "uppercase",
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    {idx.providerId}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={idx.category}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    borderRadius: 1,
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    color: "primary.light",
                    borderColor: "rgba(99, 102, 241, 0.2)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {typeof idx.constituentsCount === "number"
                    ? idx.constituentsCount.toLocaleString()
                    : idx.constituentsCount}
                </Typography>
              </TableCell>
              <TableCell>
                {idx.trackingEtfs && idx.trackingEtfs.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      flexWrap: "wrap",
                    }}
                  >
                    {idx.trackingEtfs.slice(0, 3).map((etf) => (
                      <Chip
                        key={etf.ticker}
                        label={etf.ticker}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          backgroundColor: "rgba(34, 197, 94, 0.15)",
                          color: "#4ade80",
                          borderRadius: 1,
                        }}
                      />
                    ))}
                    {idx.trackingEtfs.length > 3 && (
                      <Chip
                        label={`+${idx.trackingEtfs.length - 3}`}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          backgroundColor: "transparent",
                          color: "text.secondary",
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    -
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
